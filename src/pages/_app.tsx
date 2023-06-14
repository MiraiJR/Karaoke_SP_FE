// style
import '@/styles/globals.css';
import '@/styles/Global.sass';
import '@/styles/SideBar.sass';
import '@/styles/MainLayout.sass';
import '@/styles/CarouselCategory.sass';
import '@/styles/DataViewFood.sass';
import '@/styles/Room.sass';
import '@/styles/Bill.sass';
import '@/styles/Modal.sass';
import '@/styles/AnalysisPage.sass';

//primereact import
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/primeReactTheme.scss";


import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import { store } from '@/redux';
import { SWRConfig } from 'swr';
import { fetcher } from '@/services/backend/AxiosClient';

const AppRouter = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
}

export default function App({
  Component,
  pageProps
}: AppProps) {
  return (
    <>
      <div id='app'>
        <Head>
          <title>Karaoke Song Phung</title>
        </Head>
        <SWRConfig value={{
          refreshInterval: 1000,
          fetcher: fetcher,
        }}>
          <Provider store={store}>
            <AppRouter>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </AppRouter>
          </Provider>
        </SWRConfig>
      </div>
    </>
  );
}