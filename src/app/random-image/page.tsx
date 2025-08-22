'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

export default function RandomImagePage() {
  const [seed, setSeed] = useState('');

  // Set initial seed on client-side to avoid hydration mismatch
  useEffect(() => {
    setSeed(Math.random().toString());
  }, []);

  const refreshImage = () => {
    setSeed(Math.random().toString());
  };

  const imageUrl = `https://placehold.co/600x400.png?seed=${seed}`;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Random Image Generator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Click the button to generate a new random image.
        </p>
      </div>

      <Card className="w-full max-w-2xl overflow-hidden">
        <CardContent className="p-4 bg-muted/20">
          {seed ? (
            <Image
              key={seed} // Use key to force re-render of Image component
              src={imageUrl}
              alt="A random placeholder image"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-md"
              data-ai-hint="random placeholder"
              priority
            />
          ) : (
            <div className="w-full aspect-[3/2] bg-muted animate-pulse rounded-md" />
          )}
        </CardContent>
      </Card>

      <Button size="lg" onClick={refreshImage}>
        <RefreshCw className="mr-2 h-5 w-5" />
        New Image
      </Button>
    </div>
  );
}
