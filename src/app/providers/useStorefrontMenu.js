import { useContext } from "react";
import { StorefrontMenuContext } from "./StorefrontMenuProvider";

export const useStorefrontMenu = () => useContext(StorefrontMenuContext);
