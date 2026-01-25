import axios from "axios";

export function ConvertStringToDate(dateStr: string) {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  // If invalid date, return the raw cleaned string
  if (isNaN(date.getTime())) {
    const cleanStr = dateStr.split("T")[0] || dateStr.split(" ")[0];
    return cleanStr === "0001-01-01" ? "-" : cleanStr || "-";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
export const fetchCategoryData = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/active`
  );
  if (!response?.data) throw new Error("failed to fetch category data");
  return response?.data;
};
export const fetchCartItems = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/items`
  );
  if (!response?.data) throw new Error("failed to fetch cart data");
  return response?.data;
};
export const fetchMenuData = async (limit: number, page: number) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus`, {
    params,
  });
  if (!response?.data) throw new Error("Failed to fetch menu data");
  return response?.data;
};
export const fetchProductsByCategory = async (
  id: string,
  limit: number,
  page: number
) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/menus/${id}`,
    {
      params,
    }
  );
  if (!response?.data) throw new Error("Failed to fetch menu data");
  return response?.data;
};
export const fetchProductById = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/menus/menu/${id}`
  );
  if (!response?.data) throw new Error("Failed to fetch menu data");
  return response?.data;
};
export const fetchProductReviews = async (
  id: string,
  limit: number,
  page: number
) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews/menu/${id}`,
    { params }
  );
  if (!response?.data) throw new Error("Failed to fetch menu data");
  return response?.data;
};
