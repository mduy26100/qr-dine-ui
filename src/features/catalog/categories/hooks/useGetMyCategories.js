import { QUERY_KEYS } from "../../../../shared/constants";
import { useQuery } from "../../../../infrastructure";
import { getMyCategories } from "../../api";

export const useGetMyCategories = (options = {}) => {
    return useQuery(
        QUERY_KEYS.CATALOG.CATEGORIES,
        async ({ signal }) => {
            const response = await getMyCategories({ signal });
            return response;
        },
        {
            ttl: 5 * 60 * 1000,
            ...options,
        }
    );
};