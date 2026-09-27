"use client";

import { Suspense, useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

import RecipePagination from "@/components/RecipePagination";
import RecipeCard from "@/components/RecipeCard";

import {
    getRecipes,
    searchRecipes,
    getRecipeCategories,
    getRecipesByCategory,
} from "@/app/lab/api";

import type { Recipe } from "@/app/tpeys/recipe";

function RecipesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const navbarSearch = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchInput, setSearchInput] = useState(navbarSearch);
    const [showFilters, setShowFilters] = useState(false);

    const totalPages = Math.ceil(total / 10);

    useEffect(() => {
        getRecipeCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch(() => {
                toast.error("Failed to load categories.");
            });
    }, []);

    useEffect(() => {
        setSearchInput(navbarSearch);
    }, [navbarSearch]);

    useEffect(() => {
        setLoading(true);

        if (selectedCategory) {
            getRecipesByCategory({
                category: selectedCategory,
                limit: 10,
                skip: (page - 1) * 10,
            })
                .then((data) => {
                    setRecipes(data.recipes);
                    setTotal(data.total);
                })
                .catch(() => {
                    toast.error("Failed to load category recipes.");
                })
                .finally(() => {
                    setLoading(false);
                });

            return;
        }

        if (navbarSearch) {
            searchRecipes({
                query: navbarSearch,
                limit: 10,
                skip: (page - 1) * 10,
            })
                .then((data) => {
                    setRecipes(data.recipes);
                    setTotal(data.total);
                })
                .catch(() => {
                    toast.error("Failed to search recipes.");
                })
                .finally(() => {
                    setLoading(false);
                });

            return;
        }

        getRecipes({
            limit: 10,
            skip: (page - 1) * 10,
        })
            .then((data) => {
                setRecipes(data.recipes);
                setTotal(data.total);
            })
            .catch(() => {
                toast.error("Failed to load recipes.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navbarSearch, page, selectedCategory]);

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const value = searchInput.trim();

        if (value) {
            router.push(
                `/recipes?search=${encodeURIComponent(value)}&page=1`
            );
        } else {
            router.push("/recipes?page=1");
        }

        setSelectedCategory("");
    }

    function handleCategory(category: string) {
        setSelectedCategory(category);
        router.push("/recipes?page=1");
    }

    function handleReset() {
        setSelectedCategory("");
        setSearchInput("");
        router.push("/recipes?page=1");
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-[#7C3AED] dark:border-t-[#A78BFA]" />
                        <p className="text-sm font-medium text-muted-foreground">
                            Loading recipes...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                <section className="mb-10">
                    <h1 className="text-4xl font-black tracking-tight text-foreground md:text-5xl">
                        Recipes
                    </h1>

                    <p className="mt-3 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
                        Discover delicious recipes and find inspiration for your next
                        meal.
                    </p>
                </section>

                <form
                    onSubmit={handleSearch}
                    className="mb-8 flex w-full max-w-2xl items-center"
                >
                    <div className="relative w-full">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search recipes..."
                            className="h-12 w-full rounded-md border border-border bg-background pl-12 pr-4 text-sm text-foreground outline-none transition focus:border-[#7C3AED] dark:focus:border-[#A78BFA]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="ml-2 h-12 rounded-md bg-[#7C3AED] px-6 text-sm font-semibold text-white transition hover:bg-[#6D28D9] dark:bg-[#A78BFA] dark:text-black dark:hover:bg-[#C4B5FD]"
                    >
                        Search
                    </button>
                </form>

                <section className="mb-10 border-b border-border pb-8">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <button
                            type="button"
                            onClick={() => handleCategory("")}
                            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition ${selectedCategory === ""
                                    ? "bg-[#7C3AED] text-white dark:bg-[#A78BFA] dark:text-black"
                                    : "border border-border bg-background text-foreground hover:border-[#7C3AED] hover:text-[#7C3AED] dark:hover:border-[#A78BFA] dark:hover:text-[#A78BFA]"
                                }`}
                        >
                            All
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => handleCategory(category)}
                                className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition ${selectedCategory === category
                                        ? "bg-[#7C3AED] text-white dark:bg-[#A78BFA] dark:text-black"
                                        : "border border-border bg-background text-foreground hover:border-[#7C3AED] hover:text-[#7C3AED] dark:hover:border-[#A78BFA] dark:hover:text-[#A78BFA]"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-foreground">
                            {total} Recipes
                        </p>

                        {selectedCategory && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                Category: {selectedCategory}
                            </p>
                        )}

                        {navbarSearch && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                Search results for: "{navbarSearch}"
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-semibold text-foreground transition hover:border-[#7C3AED] hover:text-[#7C3AED] dark:hover:border-[#A78BFA] dark:hover:text-[#A78BFA]"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filters
                        </button>

                        {(selectedCategory || navbarSearch) && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold text-muted-foreground transition hover:text-[#7C3AED] dark:hover:text-[#A78BFA]"
                            >
                                <X className="h-4 w-4" />
                                Reset
                            </button>
                        )}
                    </div>
                </section>

                {showFilters && (
                    <section className="mb-8 border border-border bg-secondary p-6">
                        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
                            Categories
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => handleCategory("")}
                                className={`rounded-md border px-4 py-2 text-sm transition ${selectedCategory === ""
                                        ? "border-[#7C3AED] bg-[#7C3AED] text-white dark:border-[#A78BFA] dark:bg-[#A78BFA] dark:text-black"
                                        : "border-border text-foreground hover:border-[#7C3AED]"
                                    }`}
                            >
                                All Categories
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => handleCategory(category)}
                                    className={`rounded-md border px-4 py-2 text-sm transition ${selectedCategory === category
                                            ? "border-[#7C3AED] bg-[#7C3AED] text-white dark:border-[#A78BFA] dark:bg-[#A78BFA] dark:text-black"
                                            : "border-border text-foreground hover:border-[#7C3AED]"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {recipes.length > 0 ? (
                    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                            />
                        ))}
                    </section>
                ) : (
                    <section className="flex min-h-[300px] items-center justify-center border border-dashed border-border">
                        <div className="text-center">
                            <h2 className="text-lg font-bold text-foreground">
                                No recipes found
                            </h2>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Try another search or category.
                            </p>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="mt-5 rounded-md bg-[#7C3AED] px-5 py-2 text-sm font-semibold text-white hover:bg-[#6D28D9] dark:bg-[#A78BFA] dark:text-black"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </section>
                )}

                <RecipePagination totalPages={totalPages} />
            </div>
        </main>
    );
}

export default function RecipesPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-background">
                    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-[#7C3AED] dark:border-t-[#A78BFA]" />

                            <p className="text-sm font-medium text-muted-foreground">
                                Loading recipes...
                            </p>
                        </div>
                    </div>
                </main>
            }
        >
            <RecipesContent />
        </Suspense>
    );
}