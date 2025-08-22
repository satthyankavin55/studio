'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/contact/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const initialState = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Message Sent!',
        description: state.message,
      });
    } else if (state.message && state.errors && Object.keys(state.errors).length > 0) {
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Get in Touch</CardTitle>
        <CardDescription>
          Have a question or a sweet idea? We'd love to hear from you!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your Name" required aria-describedby="name-error" />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="your@email.com" required aria-describedby="email-error" />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Your message..." required minLength={10} aria-describedby="message-error" />
            <div id="message-error" aria-live="polite" aria-atomic="true">
              {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
            </div>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
