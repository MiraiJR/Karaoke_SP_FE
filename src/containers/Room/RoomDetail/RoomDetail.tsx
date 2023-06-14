import CardOrderedFood from "@/components/Card/CardOrderedFood/CardOrderedFood";
import ToastImage from "@/components/Toast/ToastImage/ToastImage";
import ToastModifyPayment from "@/components/Toast/ToastModifyPayment/ToastModifyPayment";
import ToastModifyRoom from "@/components/Toast/ToastModifyRoom/ToastModifyRoom";
import { ToastContext } from "@/contexts/ToastContext";
import { changeFlagCancelRoom, changeShowOrderFood } from "@/redux/Common/Common.reducer";
import { changeRoomOpen } from "@/redux/Room/RoomOpen.reducer";
import { cancelRoom, paymentRoom, updatePayment } from "@/services/backend/API";
import { Payment } from "@/types/model/Payment";
import { ResponseBE } from "@/types/model/Response";
import { faBan, faNoteSticky, faPrint, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Image from "next/image";
import { Toast } from "primereact/toast";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

const RoomDetail = () => {
    const room = useSelector((state: any) => state.room_open.room);
    const foods = useSWR<ResponseBE>(`api/orderedfood/room/${room?.id}`).data?.result;
    const payment: Payment = useSWR<ResponseBE>(`api/payment/get/${room?.id}`).data?.result;
    const [time, SetTime] = useState<number>(0);
    const [show_bill, SetShowBill] = useState<boolean>(false);
    const { toastRef } = useContext(ToastContext);
    const dispatch = useDispatch();

    const final_money = [
        {
            label: 'Tiền món',
            value: payment ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.food_money) : 0,
        },
        {
            label: 'Phụ thu',
            value: payment ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.surcharge) : 0,
        },
        {
            label: 'Giảm giá',
            value: payment ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.discount) : 0,
        },
        {
            label: 'Thành tiền',
            value: payment ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.total_money) : 0,
        },
    ]

    const list_infor_header = room ? [{
        label: 'Giờ đến',
        value: moment(room.started_at).format("HH:mm"),
        unit: '',
    },
    {
        label: 'Thời lượng',
        value: time,
        unit: 'phút'
    }] : [];

    useEffect(() => {
        if (room) {
            const cur_date = new Date();
            var date1 = moment(room.started_at);
            var date2 = moment(cur_date);
            const diffInMinutes = date2.diff(date1, 'minutes');

            SetTime(diffInMinutes);

            setInterval(() => {
                const cur_date = new Date();
                var date1 = moment(room.started_at);
                var date2 = moment(cur_date);
                const diffInMinutes = date2.diff(date1, 'minutes');

                SetTime(diffInMinutes);

                updatePayment(room.id);
            }, 1000 * 60);
        }
    }, [room, room?.started_at, time])

    const changePayment = () => {
        alert("zop");
    }

    const actionPayment = async () => {
        const { data } = await paymentRoom(room.id);

        if (data.success) {
            dispatch(changeRoomOpen(undefined));
            dispatch(changeFlagCancelRoom(true));
            dispatch(changeShowOrderFood(false));
            toastRef?.current?.show({ severity: 'success', summary: 'Thành công', detail: data.message, life: 1000 });
        } else {
            toastRef?.current?.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 1000 });
        }
    }

    const actionPrintBill = () => {
        SetShowBill(true);
    }

    const actionProvisionCalculation = () => {
        dispatch(changeShowOrderFood(false));
    }

    const actionCancelRoom = async () => {
        const { data } = await cancelRoom(room.id);

        if (data.success) {
            dispatch(changeRoomOpen(undefined));
            dispatch(changeFlagCancelRoom(true));
            dispatch(changeShowOrderFood(false));
            toastRef?.current?.show({ severity: 'success', summary: 'Thành công', detail: data.message, life: 1000 });
        } else {
            toastRef?.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Message Content', life: 1000 });
        }
    }


    return (
        <>
            <div id="roomdetail">
                {
                    room ?
                        <><div className="roomdetail-header">
                            <div className="card-room card-room_active">
                                <Image src={'/assets/room/table.png'} alt={""} width={100} height={100} />
                                <span>{room.room}</span>
                            </div>
                            <div className="roomdetail-header_infor grid grid-rows-2 grid-flow-col grid-cols-12">
                                {list_infor_header.map((ele: any, index: number) => (
                                    <div className="col-span-10 roomdetail-footer_item" key={index}>
                                        <div className="grid grid-cols-12">
                                            <span className="col-span-7">
                                                {ele.label}:
                                            </span>
                                            <span className="col-span-5">
                                                {ele.value + ' ' + ele.unit}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div className="col-span-2 row-span-4 icon-modify">
                                    <ToastModifyRoom room={room.id} started_at={room.started_at}/>
                                </div>
                            </div>
                        </div><div className="roomdetail-order">
                                {foods?.length !== 0 ? foods?.map((ele: any, index: number) => (
                                    <CardOrderedFood {...ele} key={index} />
                                )) :
                                    <div>Chưa gọi món</div>}
                            </div><div className="roomdetail-footer">
                                <div className="grid grid-rows-4 grid-flow-col grid-cols-12">
                                    {final_money.map((ele: any, index: number) => (
                                        <div className="col-span-9 roomdetail-footer_item" key={index}>
                                            <div className="grid grid-cols-12">
                                                <span className="col-span-5">
                                                    {ele.label}:
                                                </span>
                                                <span className="col-span-7">
                                                    {ele.value}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-span-3 row-span-4 icon-modify">
                                        <ToastModifyPayment {...payment} />
                                    </div>
                                </div>
                            </div><div className="roomdetail-action grid grid-cols-4 gap-2">
                                <div onClick={() => actionPayment()}>
                                    <FontAwesomeIcon icon={faSackDollar} />
                                    <span>Thanh toán</span>
                                </div>
                                <div onClick={() => actionPrintBill()}>
                                    <FontAwesomeIcon icon={faPrint} />
                                    <span>In phiếu</span>
                                </div>
                                <div onClick={() => actionProvisionCalculation()}>
                                    <FontAwesomeIcon icon={faNoteSticky} />
                                    <span>Tạm tính</span>
                                </div>
                                <div onClick={() => actionCancelRoom()}>
                                    <FontAwesomeIcon icon={faBan} />
                                    <span>Trả phòng</span>
                                </div>
                            </div></> : <div>Chưa chọn phòng</div>
                }
            </div>
            {show_bill && <ToastImage SetShowBill={SetShowBill} room={room.id} />}
            <Toast ref={toastRef} position="bottom-right" />
        </>
    );
}

export default RoomDetail;