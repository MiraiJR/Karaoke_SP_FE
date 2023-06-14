import { changeShowOrderFood } from "@/redux/Common/Common.reducer";
import { changeRoomOpen } from "@/redux/Room/RoomOpen.reducer";
import { createNewRoomOpen, getRoom, updatePayment } from "@/services/backend/API";
import Image from "next/image";
import { useDispatch } from "react-redux";

interface ICardRoom {
    id: number;
    name: string;
    floor: number;
    is_active: boolean;
    price: number;
}

const CardRoom = ({ name, is_active, id, floor, price }: ICardRoom) => {
    const dispatch = useDispatch();

    const openRoom = async (event: any) => {
        const { data } = is_active ? await getRoom(id) : await createNewRoomOpen(id);

        // tiến hành mở phòng 
        const room_open = data.result;

        dispatch(changeRoomOpen(room_open));
        dispatch(changeShowOrderFood(true));
        
        updatePayment(room_open.id);
    }

    return (
        <>
            <div className={is_active ? "card-room card-room_active" : "card-room"} onClick={(event: any) => openRoom(event)}>
                <Image src={'/assets/room/table.png'} alt={""} width={100} height={100} />
                <span>{name}</span>
            </div>
        </>
    );
}

export default CardRoom;
