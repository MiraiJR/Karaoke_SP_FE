import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from 'moment';
import useSWR from 'swr';
import { ResponseBE } from '@/types/model/Response';
import CardStatistic from '@/components/Card/CardStatistic/CardStatistic';
import { Payment } from '@/types/model/Payment';
import MenuModifyBill from '@/components/Menu/MenuModifyBill/MenuModifyBill';

const DataViewPayment = (props: any) => {
    const bills = useSWR<ResponseBE>(`api/payment/analysis/day?date=${moment(props.date).format('YYYY-MM-DD')}`).data?.result;
    const [payments, SetPayments] = useState([]);
    const [selectedPayment, SetSelectedPayment] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [showMenuBill, SetShowMenuBill] = useState<boolean>(false);

    const selectedRow = async (e: any) => {
        await SetSelectedPayment(e.value);
        await SetShowMenuBill(true);
        const menu = document.getElementById('menu-modifybill');
        if(menu) {
            menu.style.top = (e.originalEvent.pageY) + 'px';
            menu.style.left = (e.originalEvent.pageX) + 'px';
        }
    }

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
            <div className="card dataviewpayment" style={{ margin: '20px 0' }}>
                <DataTable value={payments} selectionMode="single" selection={selectedPayment} onSelectionChange={(e) => selectedRow(e)} dataKey="room" metaKeySelection={metaKey} removableSort tableStyle={{ minWidth: '50rem' }}>
                    <Column field="room" header="Phòng" sortable ></Column>
                    <Column field="food_money" header="Tiền món" sortable ></Column>
                    <Column field="hourly_money" header="Tiền giờ" sortable ></Column>
                    <Column field="discount" header="Giảm giá" sortable ></Column>
                    <Column field="surcharge" header="Phụ thu" sortable ></Column>
                    <Column field="total_money" header="Tổng tiền" sortable ></Column>
                    <Column field="payed_at" header="Thời gian thanh toán" sortable ></Column>
                </DataTable>
                {showMenuBill && <div><MenuModifyBill {...selectedPayment}/></div>}
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

export default DataViewPayment;