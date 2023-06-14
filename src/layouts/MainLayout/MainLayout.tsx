import SideBar from "@/containers/SideBar";
import { ToastContext } from "@/contexts/ToastContext";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useRef } from "react";

interface IProps {
  children: any;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);

  return (
    <>
      <ToastContext.Provider value={{ toastRef: toastRef }}>
        <div id="mainlayout">
          <SideBar />
          <main style={{ marginLeft: '250px' }}>
            {children}
          </main>
        </div>
      </ToastContext.Provider>
    </>
  );
}

export default MainLayout