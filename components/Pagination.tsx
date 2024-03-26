"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useRef} from "react";

interface IPagination {
  totalPages: number;
}

export default function Pagination({totalPages}: IPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentPage = Number(searchParams.get("page")) || 0;
  const router = useRouter();

  useEffect(() => {
    if (Number(searchParams.get("page")) > totalPages - 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "0");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, totalPages, pathname, router]);

  const createPageURL = useCallback(
    (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams]
  );

  return (
    <>
      <div className="flex items-center mx-auto space-x-3 w-[293px] h-[26px] ">
        <button className="hover:bg-gray-300/30 p-1 rounded-md">
          <Link
            href={createPageURL(currentPage - 2)}
            className={
              currentPage - 2 < 0
                ? `pointer-events-none opacity-50 flex`
                : "flex"
            }
          >
            <ChevronsLeft />
          </Link>
        </button>
        <button className="hover:bg-gray-300/30 p-1 rounded-md">
          <Link
            href={createPageURL(currentPage - 1)}
            className={
              currentPage - 1 < 0
                ? `pointer-events-none opacity-50 flex`
                : "flex"
            }
          >
            <ChevronLeft />
          </Link>
        </button>
        {currentPage >= 0 && (
          <Link
            className="cursor-pointer font-bold scale-110"
            href={createPageURL(currentPage)}
          >
            {currentPage + 1}
          </Link>
        )}
        {currentPage <= totalPages - 2 && (
          <Link
            className="cursor-pointer text-gray-600"
            href={createPageURL(currentPage + 1)}
          >
            {currentPage + 2}
          </Link>
        )}
        {currentPage < totalPages - 2 && (
          <Link
            className="cursor-pointer text-gray-600"
            href={createPageURL(currentPage + 2)}
          >
            {currentPage + 3}
          </Link>
        )}
        <button className="hover:bg-gray-300/30 p-1 rounded-md">
          <Link
            href={createPageURL(currentPage + 1)}
            className={
              currentPage >= totalPages - 1
                ? `pointer-events-none opacity-50 flex cursor-not-allowed`
                : "flex"
            }
          >
            <ChevronRight />
          </Link>
        </button>
        <button className="hover:bg-gray-300/30 p-1 rounded-md">
          <Link
            href={createPageURL(currentPage + 2)}
            className={
              currentPage >= totalPages - 2
                ? `pointer-events-none opacity-50 flex cursor-not-allowed`
                : "flex"
            }
          >
            <ChevronsRight />
          </Link>
        </button>
      </div>
    </>
  );
}
