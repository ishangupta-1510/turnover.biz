import { faker } from "@faker-js/faker";
import { db } from "./db";

// Generate random category names using faker.js
const generateCategories = (numCategories: any) => {
  console.log(faker.commerce.department());
  const categories = [];
  for (let i = 0; i < numCategories; i++) {
    categories.push({ name: faker.commerce.department() });
  }
  return categories;
};

export const createCategories = async (numCategories: any) => {
  try {
    const categories = generateCategories(numCategories);

    // Use Prisma Client to insert categories into the database
    await db.category.createMany({
      data: categories,
    });

    console.log(`${numCategories} categories have been added to the database.`);
  } catch (error) {
    console.error("Error adding categories:", error);
  }
};

// Usage example: create 100 categories
createCategories(100);
