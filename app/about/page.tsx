
import Link from "next/link";
import { Heart, Search, Sparkles, Utensils } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C3AED]/10 dark:bg-[#A78BFA]/10">
              <Sparkles className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7C3AED] dark:text-[#A78BFA]">
              About LUNELLE
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Discover recipes.
              <br />
              <span className="text-[#7C3AED] dark:text-[#A78BFA]">
                Create something delicious.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              LUNELLE is a recipe discovery platform designed to make finding
              delicious meals simple, enjoyable, and inspiring.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7C3AED] dark:text-[#A78BFA]">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              A simple place for recipe inspiration.
            </h2>

            <p className="mt-6 leading-7 text-muted-foreground">
              LUNELLE brings recipes together in one clean and easy-to-use
              experience. Whether you are looking for a quick meal, exploring
              a new cuisine, or simply searching for inspiration, you can
              discover recipes that match what you are craving.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Browse recipes, search for something specific, explore
              categories, and save your favorite recipes so you can come back
              to them whenever you want.
            </p>

            <Link
              href="/recipes"
              className="mt-8 inline-flex rounded-xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9] dark:bg-[#A78BFA] dark:text-black dark:hover:bg-[#C4B5FD]"
            >
              Explore Recipes
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-secondary p-8 md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-6">
                <Utensils className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Discover
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Explore recipes from different cuisines and categories.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <Search className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Search
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Quickly find recipes using our search and category filters.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <Heart className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Save
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Keep your favorite recipes in one place for later.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <Sparkles className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Explore
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Find new ideas and discover something delicious every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-secondary">
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7C3AED] dark:text-[#A78BFA]">
              Why LUNELLE
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Made for people who love discovering food.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Everything is designed to keep recipe discovery simple,
              organized, and enjoyable.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6 text-center">
              <h3 className="font-semibold text-foreground">
                Simple Experience
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Clean layouts and straightforward navigation make it easy to
                find what you need.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 text-center">
              <h3 className="font-semibold text-foreground">
                Recipe Inspiration
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Explore different recipes and cuisines whenever you need a
                little inspiration.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 text-center">
              <h3 className="font-semibold text-foreground">
                Your Favorites
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Save recipes you love and keep them available for your next
                cooking session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="rounded-3xl bg-[#7C3AED] px-6 py-12 text-center dark:bg-[#A78BFA] md:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-white dark:text-black md:text-4xl">
            Ready to discover your next recipe?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 dark:text-black/70">
            Explore delicious recipes, discover new flavors, and save the
            ones you love.
          </p>

          <Link
            href="/recipes"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#7C3AED] transition hover:bg-gray-100 dark:bg-black dark:text-[#A78BFA] dark:hover:bg-gray-900"
          >
            Browse Recipes
          </Link>
        </div>
      </section>
    </main>
  );
}

