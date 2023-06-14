import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from 'moment';
import useSWR from 'swr';
import { ResponseBE } from '@/types/model/Response';
import CardStatistic from '@/components/Card/CardStatistic/CardStatistic';
import { ContextMenu } from 'primereact/contextmenu';
import ToastImage from '@/components/Toast/ToastImage/ToastImage';

const DataViewPaymentMonth = (props: any) => {
    const bills = useSWR<ResponseBE>(`api/payment/analysis/month?date=${moment(props.date).format('YYYY-MM')}`).data?.result;
    const [payments, SetPayments] = useState([]);
    const [selectedPayment, SetSelectedPayment] = useState<any>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [show_bill, SetShowBill] = useState<boolean>(false);
    const cm = useRef<ContextMenu>(null);

    const menuModel = [
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
                console.log(selectedPayment);
                SetShowBill(true);
            }
        },
    ];

    useEffect(() => {
        const temp_payments = bills?.payments.map((ele: any) => {
            return {
                ...ele,
                food_money: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ele.food_money),
                hourly_money: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ele.hourly_money),
                total_money: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ele.total_money),
                surcharge: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ele.surcharge),
                discount: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ele.discount),
                payed_at: moment(ele.payed_at).format('DD/MM/YYYY'),
            };
        })

        SetPayments(temp_payments);
    }, [bills?.payments])

    return (
        <>
            <div className="card" style={{ margin: '20px 0' }}>
                <ContextMenu model={menuModel} ref={cm} />
                <DataTable value={payments}
                    selectionMode="single" selection={selectedPayment} onSelectionChange={(e) => SetSelectedPayment(e.value)}
                    onContextMenu={(e) => cm?.current?.show(e.originalEvent)}
                    dataKey="room" metaKeySelection={metaKey} removableSort tableStyle={{ minWidth: '50rem' }}>
                    <Column field="room" header="Phòng" sortable ></Column>
                    <Column field="food_money" header="Tiền món" sortable ></Column>
                    <Column field="hourly_money" header="Tiền giờ" sortable ></Column>
                    <Column field="discount" header="Giảm giá" sortable ></Column>
                    <Column field="surcharge" header="Phụ thu" sortable ></Column>
                    <Column field="total_money" header="Tổng tiền" sortable ></Column>
                    <Column field="payed_at" header="Thời gian thanh toán" sortable ></Column>
                </DataTable>
                {show_bill && <ToastImage SetShowBill={SetShowBill} room={selectedPayment?.room} />}
            </div>
            <div className='grid grid-cols-12'>
                <div className='col-span-4'>
                    <CardStatistic label="Tổng tiền món" value={bills?.total.food_money} />
                </div>
                <div className='col-span-4'>
                    <CardStatistic label="Tổng tiền giờ" value={bills?.total.hourly_money} />
                </div>
                <div className='col-span-4'>
                    <CardStatistic label="Tổng doanh thu" value={bills?.total.total_money} />
                </div>
            </div>
        </>
    );
}

export default DataViewPaymentMonth;