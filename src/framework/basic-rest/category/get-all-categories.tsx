import { CategoriesQueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";
import { dummyCategoryData } from "../../../data/dummy-category-data";

export const fetchCategories = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORIES);
  return {
    categories: {
      data: data as Category[],
    },
  };
};

const fetchAncientCategories = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORIES_ANCIENT);
  return {
    categories: {
      data: data as Category[],
    },
  };
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: { data: Category[] } }, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn:
      options.demoVariant === "ancient"
        ? fetchAncientCategories
        : fetchCategories,
    retry: false,
    refetchOnWindowFocus: false,
    // For demonstration purposes, always return dummy data
    initialData: dummyCategoryData,
    placeholderData: dummyCategoryData,
  });
};
