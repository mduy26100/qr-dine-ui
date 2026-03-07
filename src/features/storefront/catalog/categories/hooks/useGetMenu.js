import { useQuery } from "../../../../../infrastructure/query";
import { QUERY_KEYS } from "../../../../../shared/constants/queryKeys.constants";
import { getMenu } from "../../api";

export const useGetMenu = (merchantId, options = {}) => {
  return useQuery(
    QUERY_KEYS.CATALOG.MENU(merchantId),
    async ({ signal }) => {
      const response = await getMenu(merchantId, { signal });
      return response;
    },
    {
      ttl: 5 * 60 * 1000,
      ...options,
    },
  );
};
