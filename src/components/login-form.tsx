'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { loginOrSignUp } from '@/app/login/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const initialState = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Processing...' : 'Login / Create Account'}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginOrSignUp, initialState);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      // Redirect to home page on successful login
      router.push('/');
    } else if (state.message && state.errors && Object.keys(state.errors).length > 0) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: state.message,
      });
    }
  }, [state, toast, router]);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Join the Club</CardTitle>
        <CardDescription>
          Login or create an account to save your favorite flavors and get exclusive offers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Your Name" required aria-describedby="name-error" />
            <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" name="mobile" type="tel" placeholder="e.g., 1234567890" required aria-describedby="mobile-error" />
            <div id="mobile-error" aria-live="polite" aria-atomic="true">
                {state.errors?.mobile && <p className="text-sm text-destructive">{state.errors.mobile[0]}</p>}
            </div>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
