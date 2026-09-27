"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

import { getRecipeById } from "@/app/lab/api";
import type { Recipe } from "@/app/tpeys/recipe";
import { useFavorites } from "@/components/FavoritesContext";

export default function RecipeDetailsPage() {
  const params = useParams<{ id: string }>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const id = Number(params.id);

    if (!id) return;

    getRecipeById({ id })
      .then((data) => {
        setRecipe(data);
      })
      .catch(() => {
        setError("Failed to load recipe.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#7C3AED] border-t-transparent" />
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <p className="text-lg font-medium text-foreground">
          {error || "Recipe not found."}
        </p>

        <Link
          href="/recipes"
          className="mt-5 rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6D28D9]"
        >
          Back to Recipes
        </Link>
      </main>
    );
  }

  const isFavorite = favorites.some(
    (favorite) => favorite.id === recipe.id
  );

  const totalTime =
    recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">

      {/* Back */}
      <Link
        href="/recipes"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#7C3AED] dark:hover:text-[#A78BFA]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Recipes
      </Link>

      {/* Main Recipe */}
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-14">

        {/* Image */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-secondary">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="aspect-[4/3] h-full w-full object-cover"
          />

          {/* Favorite Icon */}
          <button
            type="button"
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 dark:bg-black"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite
                  ? "fill-[#7C3AED] text-[#7C3AED]"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            />
          </button>
        </div>

        {/* Information */}
        <div className="flex flex-col justify-center">

          {/* Cuisine + Difficulty */}
          <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#7C3AED] dark:text-[#A78BFA]">
            <span>{recipe.cuisine}</span>
            <span className="text-muted-foreground">·</span>
            <span>{recipe.difficulty}</span>
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {recipe.name}
          </h1>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-border/50 bg-secondary p-4">
              <p className="text-xs text-muted-foreground">
                Prep Time
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {recipe.prepTimeMinutes} min
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary p-4">
              <p className="text-xs text-muted-foreground">
                Cook Time
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {recipe.cookTimeMinutes} min
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary p-4">
              <p className="text-xs text-muted-foreground">
                Servings
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {recipe.servings}
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary p-4">
              <p className="text-xs text-muted-foreground">
                Calories
              </p>

              <p className="mt-1 font-semibold text-foreground">
                {recipe.caloriesPerServing}
              </p>
            </div>
          </div>

          {/* Total Time */}
          <div className="mt-5 rounded-2xl border border-border/50 bg-secondary px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total Time
              </span>

              <span className="font-semibold text-foreground">
                {totalTime} min
              </span>
            </div>
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={handleFavorite}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#6D28D9] dark:bg-[#A78BFA] dark:text-black dark:hover:bg-[#C4B5FD]"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-current" : ""
              }`}
            />

            {isFavorite
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </button>
        </div>
      </section>

      {/* Ingredients + Instructions */}
      <section className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

        {/* Ingredients */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Ingredients
          </h2>

          <div className="mt-6 rounded-3xl border border-border/50 bg-secondary p-6">
            <ul className="space-y-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 border-b border-border/50 pb-4 last:border-0 last:pb-0"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#7C3AED] dark:bg-[#A78BFA]" />

                  <span className="text-sm leading-6 text-foreground">
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Instructions
          </h2>

          <div className="mt-6 space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-3xl border border-border/50 bg-secondary p-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-sm font-semibold text-white dark:bg-[#A78BFA] dark:text-black">
                  {index + 1}
                </div>

                <p className="pt-1 text-sm leading-7 text-foreground">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground">
            Tags
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}