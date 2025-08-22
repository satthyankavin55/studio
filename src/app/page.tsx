'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const iceCreams = [
  {
    name: 'Classic Vanilla Bean',
    description: 'Rich and creamy, made with real vanilla beans from Madagascar.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'vanilla icecream',
  },
  {
    name: 'Decadent Chocolate Fudge',
    description: 'A deep, dark chocolate experience with swirls of fudge.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'chocolate icecream',
  },
  {
    name: 'Strawberry Bliss',
    description: 'Sweet and refreshing, packed with chunks of real strawberries.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'strawberry icecream',
  },
  {
    name: 'Mint Chocolate Chip',
    description: 'Cool mint ice cream loaded with delicious chocolate chips.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'mint icecream',
  },
  {
    name: 'Cookie Dough Delight',
    description: 'Our classic vanilla with generous chunks of chocolate chip cookie dough.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cookie dough',
  },
  {
    name: 'Pistachio Perfection',
    description: 'A nutty and savory flavor with real roasted pistachios.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'pistachio icecream',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <section className="relative text-center rounded-xl bg-card overflow-hidden h-64 md:h-80 flex items-center justify-center">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="A delicious-looking ice cream"
          width={1200}
          height={400}
          className="w-full h-full object-cover"
          data-ai-hint="ice cream"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">Scoops of Happiness Await</h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Experience the creamiest, most delightful ice cream made with love and the finest ingredients.
            </p>
            <Button size="lg" className="font-bold text-lg py-6 px-8">Explore Flavors</Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">Our Famous Flavors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {iceCreams.map((flavor) => (
            <Card key={flavor.name} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                 <Image
                  src={flavor.image}
                  alt={flavor.name}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={flavor.aiHint}
                />
              </CardHeader>
              <CardContent className="p-6">
                 <CardTitle className="font-headline mb-2">{flavor.name}</CardTitle>
                 <CardDescription>{flavor.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
