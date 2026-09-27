"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

type RecipePaginationProps = {
  totalPages: number;
};

export default function RecipePagination({
  totalPages,
}: RecipePaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    router.push(createPageURL(pageNumber));
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
      >
        Previous
      </button>

      {/* Current Page */}
      <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#7C3AED] px-3 text-sm font-medium text-white dark:bg-[#A78BFA] dark:text-black">
        {currentPage}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}