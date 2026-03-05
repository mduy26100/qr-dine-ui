import { useQuery } from "../../../../../infrastructure/query";
import { QUERY_KEYS } from "../../../../../shared/constants/queryKeys.constants";
import { getMyTables } from "../../api";

export const useGetMyTables = (options = {}) => {
  return useQuery(
    QUERY_KEYS.CATALOG.TABLES,
    async ({ signal }) => {
      const response = await getMyTables({ signal });
      return response;
    },
    {
      ttl: 5 * 60 * 1000,
      ...options,
    },
  );
};
