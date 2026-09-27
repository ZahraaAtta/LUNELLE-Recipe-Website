import axios from "axios";
import type { RecipesResponse } from "@/app/tpeys/response";
import type { Recipe } from "@/app/tpeys/recipe";

const API_URL = "https://dummyjson.com";

type GetRecipesParams = {
    limit: number;
    skip: number;
};

export const getRecipes = async ({
    limit,
    skip,
}: GetRecipesParams) => {
    const response = await axios.get<RecipesResponse>(
        API_URL + "/recipes",
        {
            params: {
                limit,
                skip,
            },
        }
    );

    return response.data;
};

type SearchRecipesParams = {
    query: string;
    limit: number;
    skip: number;
};

export const searchRecipes = async ({
    query,
    limit,
    skip,
}: SearchRecipesParams) => {
    const response = await axios.get<RecipesResponse>(
        API_URL + "/recipes/search?q=" + query,
        {
            params: {
                limit,
                skip,
            },
        }
    );

    return response.data;
};

type GetCategoriesParams = {};

export const getRecipeCategories = async () => {
    const response = await axios.get<string[]>(
        API_URL + "/recipes/tags"
    );

    return response.data;
};
type GetRecipesByCategoryParams = {
    category: string;
    limit: number;
    skip: number;
};

export const getRecipesByCategory = async ({
    category,
    limit,
    skip,
}: GetRecipesByCategoryParams) => {
    const response = await axios.get<RecipesResponse>(
        API_URL + "/recipes/tag/" + category,
        {
            params: {
                limit,
                skip,
            },
        }
    );

    return response.data;
};
type GetRecipeByIdParams = {
    id: number;
};

export const getRecipeById = async ({
    id,
}: GetRecipeByIdParams) => {
    const response = await axios.get<Recipe>(
        API_URL + "/recipes/" + id
    );

    return response.data;
};