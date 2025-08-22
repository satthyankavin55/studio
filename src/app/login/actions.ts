'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const loginSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid mobile number.' }),
});

export async function loginOrSignUp(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    name: formData.get('name'),
    mobile: formData.get('mobile'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
      success: false,
    };
  }

  const { name, mobile } = validatedFields.data;

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('mobile', '==', mobile));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // User does not exist, create new user
      await addDoc(usersRef, {
        name,
        mobile,
        createdAt: new Date(),
      });
       return {
        success: true,
        message: `Welcome, ${name}! Your account has been created.`,
        errors: null,
      };
    } else {
      // User exists, log them in
       return {
        success: true,
        message: `Welcome back, ${name}! You are now logged in.`,
        errors: null,
      };
    }
  } catch (error) {
    console.error('Firebase error:', error);
    return {
        success: false,
        message: 'An error occurred. Please try again.',
        errors: null,
    };
  }
}
