import ToastImage from '@/components/Toast/ToastImage/ToastImage';
import { Payment } from '@/types/model/Payment';
import { Menu } from 'primereact/menu';
import { useState } from 'react';

const MenuModifyBill = (payment: Payment) => {
    const [show_bill, SetShowBill] = useState<boolean>(false);
    const items = [
        {
            label: 'Sửa hóa đơn',
            icon: 'pi pi-fw pi-plus',
            command: () => {
                alert("zo");
            }
        },
        { 
            label: 'In hóa đơn', 
            icon: 'pi pi-fw pi-plus',
            command: () => {
                SetShowBill(true);
            }
        },
    ];

    const hideMenu = (event: any) => {
        console.log(event.target);
    }


    return (
        <>
            <div id='menu-modifybill' onClick={(event: any) => hideMenu(event)}>
                <Menu model={items} />
            </div>
            {show_bill && <ToastImage SetShowBill={SetShowBill} room={payment.room}/>}
        </>
    );
}

export default MenuModifyBill;