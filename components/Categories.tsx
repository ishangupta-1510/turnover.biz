"use client";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
interface Data {
  id: string;
  name: string;
}

export default function Categories({
  data,
  interestedIn,
  totalPages,
  totalCount,
}: any) {
  const [interestedCategory, setInterestedCategory] =
    useState<string[]>(interestedIn);

  useEffect(() => {
    localStorage.setItem(
      "interestedCategories",
      JSON.stringify(interestedCategory)
    );
  }, [interestedCategory]);

  function handleChange(e: React.FormEvent<EventTarget>) {
    if ((e.target as HTMLInputElement).checked) {
      setInterestedCategory([
        ...interestedCategory,
        (e.target as HTMLInputElement).name,
      ]);
    } else {
      const filterTheCategory = interestedCategory.filter(
        (ele) => ele !== (e.target as HTMLInputElement).name
      );
      setInterestedCategory(filterTheCategory);
    }
  }

  useEffect(() => {
    async function addCategory() {
      const response = await fetch(`/api/categories`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          category: interestedCategory,
        }),
      });
    }
    addCategory();
  }, [interestedCategory]);

  return (
    <div className="w-full flex items-center justify-center p-5 mt-4 box-border">
      <form className="bg-white shadow-md p-12 mb-4 h-[658px] w-[576px] rounded-[20px] border-[1px] border-[#C1C1C1] space-y-7 flex flex-col">
        <div className=" text-[32px] font-[600] space-y-7 text-center">
          <section>Please mark your interest!</section>
          <section>
            <p className="text-[16px] font-[400]">We will keep you notified</p>
          </section>
        </div>
        <p className="text-[20px] font-[500]">My saved interests!</p>
        {/* <PaginationDemo /> */}
        {/* {console.log(data)} */}
        {data.map((category: Data) => (
          <div key={category.id} className="flex gap-2">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor="check"
            >
              <input
                type="checkbox"
                id={category.id}
                defaultChecked={interestedIn.includes(category.name)}
                name={category.name}
                onChange={handleChange}
                className="peer relative h-[24px] w-[24px] cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all bg-[#CCCCCC] checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 "
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label htmlFor={category.id} className="text-[16px] font-[400]">
              {category.name}
            </label>
          </div>
        ))}
        <Pagination totalPages={totalPages} />
      </form>
    </div>
  );
}
