"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t bg-secondary">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand & About */}
                    <div className="space-y-4">
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

                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Discover delicious recipes, explore new flavors, and find
                            inspiration for your next meal.
                        </p>
                    </div>

                    {/* Explore */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-foreground">Explore</h3>

                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/recipes"
                                    className="transition-colors hover:text-foreground"
                                >
                                    All Recipes
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/favorites"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Favorites
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="transition-colors hover:text-foreground"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-foreground">Support</h3>

                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/recipes"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Browse Recipes
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/favorites"
                                    className="transition-colors hover:text-foreground"
                                >
                                    My Favorites
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-foreground">
                            Stay Updated
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Subscribe to our newsletter for new recipes, cooking inspiration,
                            and updates.
                        </p>

                        <form
                            className="flex flex-col gap-2"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="relative">
                                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="
                    h-10 w-full rounded-md
                    border border-border
                    bg-background
                    pl-9 pr-3
                    text-sm text-foreground
                    outline-none
                    placeholder:text-muted-foreground
                    focus:border-[#7C3AED]
                    dark:focus:border-[#A78BFA]
                  "
                                />
                            </div>

                            <button
                                type="submit"
                                className="
                  h-10 w-full rounded-md
                  bg-[#7C3AED]
                  text-sm font-medium text-white
                  transition-colors
                  hover:bg-[#6D28D9]
                  dark:bg-[#A78BFA]
                  dark:text-black
                  dark:hover:bg-[#C4B5FD]
                "
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Separator */}
                <div className="my-8 h-px bg-border" />

                {/* Bottom Section */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} LUNELLE. All rights reserved.
                    </p>

                    {/* Socials */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            aria-label="Facebook"
                            className="
                flex h-9 w-9 items-center justify-center
                rounded-md
                text-muted-foreground
                transition-colors
                hover:bg-accent
                hover:text-[#7C3AED]
                dark:hover:text-[#A78BFA]
              "
                        >
                            <span className="font-bold">f</span>
                        </button>

                        <button
                            type="button"
                            aria-label="Twitter"
                            className="
                flex h-9 w-9 items-center justify-center
                rounded-md
                text-muted-foreground
                transition-colors
                hover:bg-accent
                hover:text-[#7C3AED]
                dark:hover:text-[#A78BFA]
              "
                        >
                            <span className="font-bold">𝕏</span>
                        </button>

                        <button
                            type="button"
                            aria-label="Instagram"
                            className="
                flex h-9 w-9 items-center justify-center
                rounded-md
                text-muted-foreground
                transition-colors
                hover:bg-accent
                hover:text-[#7C3AED]
                dark:hover:text-[#A78BFA]
              "
                        >
                            <span className="font-bold">◎</span>
                        </button>

                        <button
                            type="button"
                            aria-label="YouTube"
                            className="
                flex h-9 w-9 items-center justify-center
                rounded-md
                text-muted-foreground
                transition-colors
                hover:bg-accent
                hover:text-[#7C3AED]
                dark:hover:text-[#A78BFA]
              "
                        >
                            <span className="font-bold">▶</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
