import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { updatePayment, updatePaymentField } from '@/services/backend/API';
import { ToastContext } from '@/contexts/ToastContext';
import { Payment } from '@/types/model/Payment';


const ToastModifyPayment = (payment: Payment) => {
    const [visible, setVisible] = useState(false);
    const { toastRef } = useContext(ToastContext);
    const [surcharge, SetSurcharge] = useState<number>(payment.surcharge);
    const [discount, SetDiscount] = useState<number>(payment.discount);

    const changePayment = async () => {
        const { data } = await updatePaymentField({
            ...payment,
            surcharge: surcharge,
            discount: discount,
        });
        toastRef?.current?.show({ severity: data.success ? 'success' : 'error', summary: 'Thành công', detail: data.message, life: 1000 });

        if (data.success) {
            await updatePayment(payment.room);
        }
    }

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { setVisible(false); changePayment() }} autoFocus />
        </div>
    );

    return (
        <>
            <div className="card flex justify-content-center">
                <FontAwesomeIcon className="cardorderedfood-icon-modify" icon={faFilePen} onClick={() => setVisible(true)} />
                <Dialog header={`Sửa hóa đơn cho phòng ${payment.room}`} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                    <div className='modal-payment'>
                        <label htmlFor='payment-surcharge'>Sửa phụ thu:</label>
                        <InputNumber inputId='payment-surcharge' value={surcharge} onValueChange={(e: InputNumberValueChangeEvent) => SetSurcharge(e.value ? e.value : 0)} min={0} />
                        <label htmlFor='payment-discount'>Sửa giảm giá:</label>
                        <InputNumber inputId='payment-discount' value={discount} onValueChange={(e: InputNumberValueChangeEvent) => SetDiscount(e.value ? e.value : 0)} min={0} />
                    </div>
                </Dialog>
            </div>
        </>
    );
}

export default ToastModifyPayment;