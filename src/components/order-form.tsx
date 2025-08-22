'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { submitOrder } from '@/app/order/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';

const iceCreams = [
  { name: 'Classic Vanilla Bean' },
  { name: 'Decadent Chocolate Fudge' },
  { name: 'Strawberry Bliss' },
  { name: 'Mint Chocolate Chip' },
  { name: 'Cookie Dough Delight' },
  { name: 'Pistachio Perfection' },
];

const initialState = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Placing Order...' : 'Place Order'}
    </Button>
  );
}

export function OrderForm() {
  const [state, formAction] = useActionState(submitOrder, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Order Placed!',
        description: state.message,
      });
    } else if (state.message) {
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
        <CardTitle className="font-headline text-3xl">Place Your Order</CardTitle>
        <CardDescription>
          Select your favorite flavor and we'll get it ready for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="flavor">Flavor</Label>
            <Select name="flavor" required>
              <SelectTrigger id="flavor">
                <SelectValue placeholder="Select a flavor" />
              </SelectTrigger>
              <SelectContent>
                {iceCreams.map((flavor) => (
                    <SelectItem key={flavor.name} value={flavor.name}>{flavor.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div id="flavor-error" aria-live="polite" aria-atomic="true">
              {state.errors?.flavor && <p className="text-sm text-destructive">{state.errors.flavor[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" name="quantity" type="number" placeholder="1" defaultValue="1" min="1" max="10" required aria-describedby="quantity-error" />
            <div id="quantity-error" aria-live="polite" aria-atomic="true">
              {state.errors?.quantity && <p className="text-sm text-destructive">{state.errors.quantity[0]}</p>}
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
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
