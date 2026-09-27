"use client";

import Link from "next/link";
import { useFavorites } from "@/components/FavoritesContext";
import type { Recipe } from "@/app/tpeys/recipe";

type RecipeCardProps = {
    recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const isFavorite = favorites.some(
        (favorite) => favorite.id === recipe.id
    );

    const handleFavorite = () => {
        if (isFavorite) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe);
        }
    };

    return (
        <div className="group overflow-hidden rounded-3xl border border-border/50 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Link href={`/recipes/${recipe.id}`} className="block h-full">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Favorite */}
                <button
                    type="button"
                    aria-label={
                        isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                    onClick={handleFavorite}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 dark:bg-black/80"
                >
                    <span
                        className={
                            isFavorite
                                ? "text-[#7C3AED]"
                                : "text-gray-700 dark:text-gray-200"
                        }
                    >
                        {isFavorite ? "♥" : "♡"}
                    </span>
                </button>
            </div>

            {/* Content */}
            <Link href={`/recipes/${recipe.id}`} className="block">
                <div className="space-y-3 p-5">
                    {/* Category / Difficulty */}
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#7C3AED] dark:text-[#A78BFA]">
                        <span>{recipe.cuisine}</span>
                        <span className="text-muted-foreground">·</span>
                        <span>{recipe.difficulty}</span>
                    </div>

                    {/* Recipe name */}
                    <h2 className="line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA]">
                        {recipe.name}
                    </h2>

                    {/* Recipe info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                            {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                        </span>

                        <span className="h-1 w-1 rounded-full bg-muted-foreground" />

                        <span>{recipe.servings} servings</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}