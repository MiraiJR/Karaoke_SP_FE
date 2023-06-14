import { Toast } from "primereact/toast";
import { RefObject, createContext } from "react";

export const ToastContext = createContext<{
  toastRef: RefObject<Toast> | null;
}>({
  toastRef: null,
});