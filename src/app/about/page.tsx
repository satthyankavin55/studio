import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">About Creamy Delights</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Our journey from a small family kitchen to your favorite neighborhood ice cream shop.
        </p>
      </header>
      
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8 md:p-12 order-2 md:order-1">
            <h2 className="text-2xl font-bold font-headline mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Creamy Delights was born from a simple passion: creating unforgettable ice cream that brings people together. It all started in Grandma Ella's kitchen, where she'd spend summer afternoons churning fresh cream, sugar, and hand-picked fruits into magical frozen treats. Her secret recipes, passed down through generations, are the heart and soul of our shop.
              </p>
              <p>
                In 2015, we decided to share Grandma Ella's legacy with the world. We opened our first little shop on a sunny corner, with a promise to use only the finest, locally-sourced ingredients. We believe in real milk, real cream, and real flavor. No shortcuts, no artificial stuff—just pure, creamy goodness in every scoop.
              </p>
              <p>
                Today, Creamy Delights is a beloved community hub, a place for first dates, family outings, and celebrating life's sweet moments. We're still inspired by Grandma Ella's love for creating joy, one scoop at a time.
              </p>
            </div>
          </div>
          <div className="h-64 md:h-full w-full order-1 md:order-2">
            <Image
              src="https://placehold.co/800x600.png"
              alt="Inside of the Creamy Delights ice cream shop"
              width={800}
              height={600}
              className="w-full h-full object-cover"
              data-ai-hint="icecream shop interior"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
