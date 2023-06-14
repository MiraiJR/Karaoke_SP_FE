import CardRoom from "@/components/Card/CardRoom/CardRoom";
import { Room } from "@/types/model/Room";

interface IDataViewRoom {
    floor: number;
    rooms: Array<Room>;
}

const DataViewRoom = ({ floor, rooms }: IDataViewRoom) => {
    return (
        <>
            <div className="dataviewroom">
                <div className="dataviewroom-title">
                    {"Tầng" + " " + floor}
                </div>
                <hr className="line"/>
                <div className="dataviewroom-room">
                    {
                        rooms.map((ele: any, index: number) => (
                            <CardRoom {...ele} key={index} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default DataViewRoom;