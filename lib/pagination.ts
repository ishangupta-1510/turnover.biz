import { db } from "./db";

export async function getCategory({
  offset = 0,
  limit = 6,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
}) {
  const data = await db.category.findMany({
    skip: offset,
    take: limit,
  });

  const totalCount = await db.category.count();
  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}
