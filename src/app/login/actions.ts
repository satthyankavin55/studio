'use server';

import { z } from 'zod';

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

  // In a real app, you would:
  // 1. Check if a user with this mobile number exists.
  // 2. If yes, log them in (e.g., send OTP, create session).
  // 3. If no, create a new user account.
  console.log('Login/Signup attempt:', validatedFields.data);

  return {
    success: true,
    message: `Welcome, ${validatedFields.data.name}! You are now logged in.`,
    errors: null,
  };
}
