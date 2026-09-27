"use client";

import { createContext, useContext, useState } from "react";
import type { Recipe } from "@/app/tpeys/recipe";

type FavoritesContextType = {
    favorites: Recipe[];
    addFavorite: (recipe: Recipe) => void;
    removeFavorite: (id: number) => void;
};

const FavoritesContext = createContext<
    FavoritesContextType | undefined
>(undefined);

export function FavoritesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [favorites, setFavorites] = useState<Recipe[]>(() => {
        if (typeof window === "undefined") {
            return [];
        }

        const savedFavorites = localStorage.getItem("favorites");

        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const addFavorite = (recipe: Recipe) => {
        setFavorites((current) => {
            const updatedFavorites = [...current, recipe];

            localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            );

            return updatedFavorites;
        });
    };

    const removeFavorite = (id: number) => {
        setFavorites((current) => {
            const updatedFavorites = current.filter(
                (recipe) => recipe.id !== id
            );

            localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            );

            return updatedFavorites;
        });
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites must be used inside FavoritesProvider"
        );
    }

    return context;
}