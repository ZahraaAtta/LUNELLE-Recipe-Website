"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useFavorites } from "@/components/FavoritesContext";
import {
    Heart,
    Menu,
    Sun,
    Moon,
    Search,
    X,
} from "lucide-react";

const routes = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Recipes",
        href: "/recipes",
    },
    {
        label: "About",
        href: "/about",
    },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const { theme, setTheme } = useTheme();
    const { favorites } = useFavorites();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDarkMode = mounted && theme === "dark";

    const toggleTheme = () => {
        setTheme(isDarkMode ? "light" : "dark");
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const query = search.trim();

        if (!query) return;

        router.push(`/recipes?search=${encodeURIComponent(query)}`);

        setSearch("");
        setIsSearchOpen(false);
        setIsMenuOpen(false);
    };

    const favoritesCount = favorites.length;

    return (
        <header
            className="
                sticky top-0 z-50 w-full
                border-b border-[#7C3AED]/10
                bg-white/95 backdrop-blur
                dark:border-white/10
                dark:bg-black/95
            "
        >
            <div
                className="
                    mx-auto flex h-20 max-w-7xl
                    items-center justify-between
                    gap-4 px-4 sm:px-6 lg:px-8
                "
            >

                {/* Mobile Menu + Logo */}

                <div className="flex items-center gap-3">

                    {/* Mobile Menu */}

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="
                            flex h-10 w-10 items-center justify-center
                            rounded-full
                            text-gray-700
                            transition
                            hover:bg-[#F3E8FF]
                            hover:text-[#7C3AED]
                            dark:text-gray-200
                            dark:hover:bg-[#1F1F1F]
                            dark:hover:text-[#A78BFA]
                            lg:hidden
                        "
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>

                    {/* Logo */}

                    <Link
                        href="/"
                        className="
                            font-serif text-2xl font-semibold
                            tracking-[0.18em]
                            text-[#7C3AED]
                            dark:text-[#A78BFA]
                        "
                    >
                        LUNELLE
                    </Link>
                </div>

                {/* Desktop Navigation */}

                <nav className="hidden items-center gap-1 lg:flex">
                    {routes.map((route) => {

                        const isActive =
                            pathname === route.href ||
                            (route.href !== "/" &&
                                pathname.startsWith(route.href));

                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={`
                                    rounded-full px-4 py-2
                                    text-sm font-medium
                                    transition-all

                                    ${isActive
                                        ? "bg-[#F3E8FF] text-[#7C3AED] dark:bg-[#7C3AED]/20 dark:text-[#A78BFA]"
                                        : "text-gray-600 hover:bg-[#F3E8FF] hover:text-[#7C3AED] dark:text-gray-300 dark:hover:bg-[#1F1F1F] dark:hover:text-[#A78BFA]"
                                    }
                                `}
                            >
                                {route.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}

                <div className="flex items-center gap-2 sm:gap-3">

                    {/* Search */}

                    <div className="relative">

                        {isSearchOpen && (
                            <form
                                onSubmit={handleSearch}
                                className="
                                    absolute right-0 top-12 z-50
                                    flex w-64 items-center
                                    rounded-xl
                                    border border-gray-200
                                    bg-white p-2
                                    shadow-lg
                                    dark:border-white/10
                                    dark:bg-[#111111]
                                "
                            >
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search recipes..."
                                    autoFocus
                                    className="
                                        w-full bg-transparent
                                        px-2 py-1
                                        text-sm
                                        text-gray-800
                                        outline-none
                                        placeholder:text-gray-400
                                        dark:text-gray-100
                                        dark:placeholder:text-gray-500
                                    "
                                />

                                <button
                                    type="submit"
                                    className="
                                        flex h-8 w-8
                                        items-center justify-center
                                        rounded-full
                                        text-[#7C3AED]
                                        hover:bg-[#F3E8FF]
                                        dark:text-[#A78BFA]
                                        dark:hover:bg-[#1F1F1F]
                                    "
                                    aria-label="Submit search"
                                >
                                    <Search className="h-4 w-4" />
                                </button>
                            </form>
                        )}

                        <button
                            type="button"
                            onClick={() =>
                                setIsSearchOpen(!isSearchOpen)
                            }
                            className="
                                flex h-10 w-10
                                items-center justify-center
                                rounded-full
                                text-gray-600
                                transition
                                hover:bg-[#F3E8FF]
                                hover:text-[#7C3AED]
                                dark:text-gray-300
                                dark:hover:bg-[#1F1F1F]
                                dark:hover:text-[#A78BFA]
                            "
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Favorites */}

                    <Link
                        href="/favorites"
                        className="
                            relative flex h-10 w-10
                            items-center justify-center
                            rounded-full
                            text-gray-600
                            transition
                            hover:bg-[#F3E8FF]
                            hover:text-[#7C3AED]
                            dark:text-gray-300
                            dark:hover:bg-[#1F1F1F]
                            dark:hover:text-[#A78BFA]
                        "
                        aria-label="Favorites"
                    >
                        <Heart className="h-5 w-5" />

                        {mounted && favoritesCount > 0 && (
                            <span
                                className="
                                    absolute -right-1 -top-1
                                    flex h-5 min-w-5
                                    items-center justify-center
                                    rounded-full
                                    bg-[#7C3AED]
                                    px-1
                                    text-[10px]
                                    font-semibold
                                    text-white
                                    dark:bg-[#A78BFA]
                                    dark:text-black
                                "
                            >
                                {favoritesCount}
                            </span>
                        )}
                    </Link>

                    {/* Theme Toggle */}

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="
                            flex h-10 w-10
                            items-center justify-center
                            rounded-full
                            text-gray-600
                            transition
                            hover:bg-[#F3E8FF]
                            hover:text-[#7C3AED]
                            dark:text-gray-300
                            dark:hover:bg-[#1F1F1F]
                            dark:hover:text-[#A78BFA]
                        "
                        aria-label="Toggle theme"
                    >
                        {mounted ? (
                            isDarkMode ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}

            {isMenuOpen && (
                <div
                    className="
                        border-t border-[#7C3AED]/10
                        bg-white
                        px-6 py-5
                        dark:border-white/10
                        dark:bg-black
                        lg:hidden
                    "
                >
                    <nav className="flex flex-col gap-1">

                        {routes.map((route) => {

                            const isActive =
                                pathname === route.href ||
                                (route.href !== "/" &&
                                    pathname.startsWith(route.href));

                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    onClick={() =>
                                        setIsMenuOpen(false)
                                    }
                                    className={`
                                        rounded-xl
                                        px-4 py-3
                                        text-sm font-medium
                                        transition

                                        ${isActive
                                            ? "bg-[#7C3AED] text-white dark:bg-[#A78BFA] dark:text-black"
                                            : "text-gray-700 hover:bg-[#F3E8FF] hover:text-[#7C3AED] dark:text-gray-200 dark:hover:bg-[#1F1F1F] dark:hover:text-[#A78BFA]"
                                        }
                                    `}
                                >
                                    {route.label}
                                </Link>
                            );
                        })}

                        {/* Mobile Favorites */}

                        <Link
                            href="/favorites"
                            onClick={() =>
                                setIsMenuOpen(false)
                            }
                            className="
                                flex items-center justify-between
                                rounded-xl
                                px-4 py-3
                                text-sm font-medium
                                text-gray-700
                                hover:bg-[#F3E8FF]
                                hover:text-[#7C3AED]
                                dark:text-gray-200
                                dark:hover:bg-[#1F1F1F]
                                dark:hover:text-[#A78BFA]
                            "
                        >
                            <div className="flex items-center gap-3">
                                <Heart className="h-5 w-5" />
                                <span>Favorites</span>
                            </div>

                            {favoritesCount > 0 && (
                                <span
                                    className="
                                        flex h-5 min-w-5
                                        items-center justify-center
                                        rounded-full
                                        bg-[#7C3AED]
                                        px-1
                                        text-[10px]
                                        text-white
                                    "
                                >
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Search */}

                        <form
                            onSubmit={handleSearch}
                            className="
                                mt-3
                                flex items-center
                                rounded-xl
                                border border-gray-200
                                px-3 py-2
                                dark:border-white/10
                            "
                        >
                            <Search
                                className="
                                    h-4 w-4
                                    text-gray-400
                                    dark:text-gray-500
                                "
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search recipes..."
                                className="
                                    ml-2 w-full
                                    bg-transparent
                                    text-sm
                                    text-gray-800
                                    outline-none
                                    placeholder:text-gray-400
                                    dark:text-gray-100
                                    dark:placeholder:text-gray-500
                                "
                            />
                        </form>
                    </nav>
                </div>
            )}
        </header>
    );
}