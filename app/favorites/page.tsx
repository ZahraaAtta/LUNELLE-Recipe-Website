"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import RecipeCard from "@/components/RecipeCard";
import { useFavorites } from "@/components/FavoritesContext";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <main className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10 dark:bg-[#A78BFA]/10">
                        <Heart className="h-5 w-5 text-[#7C3AED] dark:text-[#A78BFA]" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            My Favorites
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Recipes you saved for later.
                        </p>
                    </div>
                </div>
            </div>

            {/* Favorites */}
            {favorites.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-secondary px-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7C3AED]/10 dark:bg-[#A78BFA]/10">
                        <Heart className="h-6 w-6 text-[#7C3AED] dark:text-[#A78BFA]" />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-foreground">
                        No favorite recipes yet
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        Start exploring recipes and save your favorites here
                        to find them easily later.
                    </p>

                    <Link
                        href="/recipes"
                        className="mt-6 rounded-xl bg-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6D28D9] dark:bg-[#A78BFA] dark:text-black dark:hover:bg-[#C4B5FD]"
                    >
                        Explore Recipes
                    </Link>
                </div>
            ) : (
                <>
                    {/* Result count */}
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {favorites.length}{" "}
                            {favorites.length === 1 ? "recipe" : "recipes"} saved
                        </p>
                    </div>

                    {/* Recipe Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {favorites.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                            />
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}