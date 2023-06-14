import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { updateOrderFood, updatePayment } from '@/services/backend/API';
import { ToastContext } from '@/contexts/ToastContext';

interface IOrderedFood {
    room: string;
    id: number;
    name: string;
    quantity: number;
}

const ToastModifyOrderedFood = ({ room, id, name, quantity }: IOrderedFood) => {
    const [visible, setVisible] = useState(false);
    const { toastRef } = useContext(ToastContext);

    const changeQuantity = async () => {
        const new_quanttity = document.querySelector(`#orderedfood-${id} > input`)?.ariaValueNow;
        if (new_quanttity) {
            const { data } = await updateOrderFood(room, id, parseInt(new_quanttity));
            toastRef?.current?.show({ severity: data.success ? 'success' : 'error', summary: 'Thành công', detail: data.message, life: 1000 });

            if (data.success) {
                await updatePayment(room);
            }
        }
    }

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { setVisible(false); changeQuantity() }} autoFocus />
        </div>
    );

    return (
        <>
            <div className="card flex justify-content-center">
                <FontAwesomeIcon className="cardorderedfood-icon-modify" icon={faFilePen} onClick={() => setVisible(true)} />
                <Dialog header={`Sửa số lượng cho ${name}`} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                    <div className='modal-orderedfood'>
                        <InputNumber id={`orderedfood-${id}`} value={quantity} min={0} />
                    </div>
                </Dialog>
            </div>
        </>
    );
}

export default ToastModifyOrderedFood;