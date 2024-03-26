import { createCategories } from "@/lib/categoryData";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  // createCategories;
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { category } = await req.json();

    const user = await db.user.update({
      where: { id: currentUser.id },
      data: {
        interestedIn: {
          set: category,
        },
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("User category update error", { status: 500 });
  }
}
