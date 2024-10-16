import { cache } from "react";

/**
 * Fetch products with advanced filtering, sorting, and pagination
 * @param {Object} options - The options for fetching products
 * @param {number} [options.page=1] - The page number to fetch
 * @param {number} [options.limit=20] - The number of products per page
 * @param {string} [options.sortBy='id'] - The field to sort by
 * @param {string} [options.order='asc'] - The sort order ('asc' or 'desc')
 * @param {string} [options.category] - The category to filter by
 * @param {string} [options.search] - The search term to filter by product title
 * @returns {Promise<Array>} A promise that resolves to the array of products
 */
export const getProducts = cache(
  async ({ page = 1, limit = 20, category, search, sortBy, order }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (category) {
      params.append("category", category);
    }
    if (search) {
      params.append("search", search);
    }
    if (sortBy) {
      params.append("sortBy", sortBy);
    }
    if (order) {
      params.append("order", order);
    }

    const response = await fetch(`/api/products?${params.toString()}`, {
      next: { revalidate: 60 }, // Revalidating every 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.products;
  }
);

/**
 * Fetch a single product by its ID
 * This function is wrapped with React's cache function for automatic memoization
 * @param {string|number} id - The ID of the product to fetch
 * @returns {Promise<Object>} A promise that resolves to the product data
 * @throws {Error} If the API request fails
 */
export const getProduct = cache(async (id) => {
  try {
    const response = await fetch(`https://fluxmarket.vercel.app/api/products/${id}`, {
      next: { revalidate: 300 }, // Revalidating every 5 minutes
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("failed to Fetch Product", error);
  }
});

/**
 * Fetch all available categories
 * @returns {Promise<string[]>} A promise that resolves to an array of category names
 */
export const getCategories = cache(async () => {
  const response = await fetch("https://fluxmarket.vercel.app/api/categories", {
    next: { revalidate: 60 }, 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
});
