import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from '@/contexts/ToastContext';
import { Calendar } from 'primereact/calendar';
import { updatePayment, updatedStartedAtRoomOpen } from '@/services/backend/API';
import { useDispatch } from 'react-redux';
import { changeRoomOpen } from '@/redux/Room/RoomOpen.reducer';

interface IToastModifyRoom {
    room: string;
    started_at: Date;
}

const ToastModifyRoom = ({room, started_at}: IToastModifyRoom) => {
    const [visible, setVisible] = useState(false);
    const { toastRef } = useContext(ToastContext);
    const [time, SetTime] = useState<string | Date | Date[] | null>(new Date(started_at));
    const dispatch = useDispatch();

    const changeStartedAt = async () => {
        console.log(room);
        const { data } = await updatedStartedAtRoomOpen(room, time);
        toastRef?.current?.show({ severity: data.success ? 'success' : 'error', summary: 'Thành công', detail: data.message, life: 1000 });

        if (data.success) {
            dispatch(changeRoomOpen(data.result));
            await updatePayment(room);
        }
    }

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { setVisible(false); changeStartedAt() }} autoFocus />
        </div>
    );

    return (
        <>
            <div className="card flex justify-content-center">
                <FontAwesomeIcon className="cardorderedfood-icon-modify" icon={faFilePen} onClick={() => setVisible(true)} />
                <Dialog header={`Sửa phòng ${room}`} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                    <div className='modal-payment'>
                        <div className="flex-auto">
                            <label htmlFor="calendar-timeonly" className="font-bold block mb-2">
                                Chọn thời gian đến:
                            </label>
                            <Calendar id="calendar-timeonly" value={time} onChange={(e) => SetTime(e.value ? e.value : null)} timeOnly />
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    );
}

export default ToastModifyRoom;