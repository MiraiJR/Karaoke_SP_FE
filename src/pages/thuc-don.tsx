import Head from "next/head";
import DataViewFoodTable from "@/containers/DataView/DataViewFoodTable";

const ThucDonPage = () => {
    return (
        <>
            <Head>
                <title>Thực đơn</title>
            </Head>
            <div id="thuc-don-page">
                <div>
                    <DataViewFoodTable />
                </div>
            </div>
        </>
    );
}

export default ThucDonPage