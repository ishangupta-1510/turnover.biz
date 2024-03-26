import Categories from "@/components/Categories";
import {createCategory} from "@/lib/categoryData";
import {getCategory} from "@/lib/pagination";
import {getCurrentUser} from "@/lib/user";
import {redirect} from "next/navigation";

const PAGE_LIMIT = 6;
export default async function Dashboard({
  searchParams,
}: {
  searchParams: {page: string};
}) {
  const user = await getCurrentUser();
  // await createCategory();
  if (!user) {
    return redirect("/register");
  }

  const offset = parseInt(searchParams.page) * PAGE_LIMIT || 0;
  const {totalPages, totalCount, data} = await getCategory({
    offset,
    limit: PAGE_LIMIT,
  });

  return (
    <div>
      <Categories
        data={data}
        interestedIn={user?.interestedIn}
        totalPages={totalPages}
      />
    </div>
  );
}
