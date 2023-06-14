import ToastModifyOrderedFood from "@/components/Toast/ToastModifyOrderedFood/ToastModifyOrderedFood";
import { ToastContext } from "@/contexts/ToastContext";
import { removeOrderedFood, updatePayment } from "@/services/backend/API";
import axiosClient from "@/services/backend/AxiosClient";
import { faFilePen, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useSelector } from "react-redux";

interface IOrderedFood {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    note: string;
}

const CardOrderedFood = ({ id, name, quantity, unit, price, note }: IOrderedFood) => {
    const room = useSelector((state: any) => state.room_open.room);
    const { toastRef } = useContext(ToastContext);

    const removeFood = async () => {
        const { data } = await removeOrderedFood(room.id, id);
        toastRef?.current?.show({ severity: data.success ? 'success' : 'error', summary: 'Thành công', detail: data.message, life: 1000 });
        updatePayment(room.id);
    }

    return (
        <>
            <div className="grid grid-rows-2 cardorderedfood">
                <div className="grid grid-cols-12 cardorderedfood-item" >
                    <div className="col-span-6">
                        {name}
                    </div>
                    <div className="col-span-4">
                        {quantity + ' ' + unit}
                    </div>
                    <div className="col-span-2">
                        <ToastModifyOrderedFood room={room.id} id={id} name={name} quantity={quantity} />
                    </div>
                </div>
                <div className="grid grid-cols-12 cardorderedfood-item" >
                    <div className="col-span-6">
                        {note}
                    </div>
                    <div className="col-span-4">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                    </div>
                    <div className="col-span-2">
                        <FontAwesomeIcon className="cardorderedfood-icon-modify" style={{ color: 'red' }} icon={faSquareMinus} onClick={() => removeFood()} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardOrderedFood;