import { useQuery } from "../../../../../infrastructure/query";
import { QUERY_KEYS } from "../../../../../shared/constants/queryKeys.constants";
import { getTableInfo } from "../../api";

export const useGetTableInfo = (merchantId, qrCodeToken, options = {}) => {
  return useQuery(
    QUERY_KEYS.CATALOG.TABLE_INFO(merchantId, qrCodeToken),
    async ({ signal }) => {
      const response = await getTableInfo(merchantId, qrCodeToken, { signal });
      return response;
    },
    {
      ttl: 5 * 60 * 1000,
      ...options,
    },
  );
};
