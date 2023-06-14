import CarouselCategory from "@/containers/Carousel/CarouselCategory";
import DataViewOrderFood from "@/containers/DataView/DataViewOrderFood";
import DataViewRoom from "@/containers/DataView/DateViewRoom";
import RoomDetail from "@/containers/Room/RoomDetail";
import { changeFlagCancelRoom, changeRooms } from "@/redux/Common/Common.reducer";
import axiosClient from "@/services/backend/AxiosClient";
import { ResponseBE } from "@/types/model/Response";
import Head from "next/head"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

const PhongPage = () => {
    let show_order_food = useSelector((state: any) => state.common.show_order_food);
    const updated = useSelector((state: any) => state.common.flag_cancel_room);
    const data = useSelector((state: any) => state.common.rooms);
    const dispatch = useDispatch();
    dispatch(changeRooms(useSWR<ResponseBE>('/api/room').data?.result));

    useEffect(() => {
        if(updated) {
            axiosClient('/api/room').then((res: any) => {
                dispatch(changeRooms(res.data.result));
            })
        }
    }, [data, dispatch, updated])

    return (
        <>
            <Head>
                <title>Phòng</title>
            </Head>
            <div style={{ 'minHeight': '100vh', backgroundColor: '#efefef', marginRight: '400px' }}>
                {
                    show_order_food ? <div id="thuc-don-page">
                        <header>
                            <CarouselCategory />
                        </header>
                        <div>
                            <DataViewOrderFood />
                        </div>
                    </div>
                        : data?.map((ele: any, index: number) => (
                            <DataViewRoom {...ele} key={index} />
                        ))
                }
            </div>
            <RoomDetail />
        </>
    );
}

export default PhongPage