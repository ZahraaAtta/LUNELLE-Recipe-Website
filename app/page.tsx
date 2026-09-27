

import Link from "next/link";
import { ArrowRight, Heart, Search, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
    

      {/* Section 1: Hero */}
      <section className="border-b px-4 py-20 md:py-32">
        <div className="container mx-auto max-w-4xl space-y-8 text-center">
          <h1 className="text-5xl font-black leading-tight tracking-tighter text-foreground md:text-7xl">
            Discover Delicious{" "}
            <span className="text-[#7C3AED] dark:text-[#A78BFA]">
              Recipes.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-muted-foreground md:text-2xl">
            Explore a curated collection of delicious recipes, discover new
            flavors, and find inspiration for your next meal.
          </p>

          <div className="pt-4">
            <Link
              href="/recipes"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-[#7C3AED] px-10 text-lg font-bold text-white shadow-xl shadow-purple-500/20 transition-all hover:scale-105 dark:bg-[#A78BFA] dark:text-black"
            >
              Browse Recipes
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="bg-secondary/20 px-4 py-24">
        <div className="container mx-auto grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          
          {/* Feature 1 */}
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7C3AED]/10 dark:bg-[#A78BFA]/10">
              <Search className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
            </div>

            <h3 className="text-2xl font-black text-foreground">
              Discover Recipes
            </h3>

            <p className="font-medium leading-relaxed text-muted-foreground">
              Search through a variety of delicious recipes and find the
              perfect dish for your next meal.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7C3AED]/10 dark:bg-[#A78BFA]/10">
              <Heart className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
            </div>

            <h3 className="text-2xl font-black text-foreground">
              Save Your Favorites
            </h3>

            <p className="font-medium leading-relaxed text-muted-foreground">
              Save the recipes you love and keep all your favorite dishes in
              one place.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7C3AED]/10 dark:bg-[#A78BFA]/10">
              <Sparkles className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
            </div>

            <h3 className="text-2xl font-black text-foreground">
              Explore New Flavors
            </h3>

            <p className="font-medium leading-relaxed text-muted-foreground">
              Discover different cuisines, ingredients, and recipes from
              around the world.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/recipes"
            className="inline-flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest text-[#7C3AED] hover:underline dark:text-[#A78BFA]"
          >
            Explore all recipes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}

