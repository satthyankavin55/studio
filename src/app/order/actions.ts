'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const orderSchema = z.object({
  flavor: z.string({ required_error: 'Please select a flavor.' }),
  quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1.'),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid mobile number.' }),
});

export async function submitOrder(prevState: any, formData: FormData) {
  const validatedFields = orderSchema.safeParse({
    flavor: formData.get('flavor'),
    quantity: formData.get('quantity'),
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

  const { flavor, quantity, name, mobile } = validatedFields.data;

  try {
    await addDoc(collection(db, 'orders'), {
      name,
      mobile,
      flavor,
      quantity,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: `Your order for ${quantity} scoop(s) of ${flavor} has been placed!`,
      errors: null,
    };
  } catch (error) {
    console.error('Firebase error:', error);
    return {
      success: false,
      message: 'An error occurred while placing your order. Please try again.',
      errors: null,
    };
  }
}
