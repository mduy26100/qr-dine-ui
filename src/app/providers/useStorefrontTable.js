import { useContext } from "react";
import { StorefrontTableContext } from "./StorefrontTableProvider";

export const useStorefrontTable = () => useContext(StorefrontTableContext);
