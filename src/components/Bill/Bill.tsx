import { Payment } from "@/types/model/Payment";
import { ResponseBE } from "@/types/model/Response";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import moment from "moment";
import { Button } from 'primereact/button';
import html2canvas from "html2canvas";
import { useState } from "react";
import { calTime } from "@/utils/Helper";
import Image from "next/image";

interface IBill {
    room: string;
}

const Bill = ({ room }: IBill) => {
    const bill = useSWR<ResponseBE>(`api/payment/bill/${room}`).data?.result;
    console.log(bill);
    const [order, SetOrder] = useState([]);

    const printBill = () => {
        const input = document.getElementById('bill');
        if (input) {
            html2canvas(input)
                .then(async (canvas) => {
                    const imgData = canvas.toDataURL('image/png', 1.0);
                    let printer = window.open('', 'to_print', 'width=1080,height=720');
                    await printer?.document.write("<img src='" + imgData + "'/>");
                    printer?.focus();
                    printer?.print();
                    printer?.close();
                });
        }
    }

    useState(() => {
        const temp_order = bill?.order.map((ele: any) => {
            return {
                ...ele,
                total_money: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill?.payment.food_money),
            }
        });

        SetOrder(temp_order);
    })

    return (
        <>
            <div id="bill">
                <div className="bill-header">
                    <div className="bold-text" style={{ fontSize: '20px' }}>{bill?.store.name}</div>
                    <div>
                        <span className="bold-text">Địa chỉ: </span>
                        {bill?.store.address}</div>
                    <div><span className="bold-text">Số điện thoại: </span> {bill?.store.phone}</div>
                    <div className="bold-text">HÓA ĐƠN TÍNH TIỀN PHÒNG {bill?.room.room}</div>
                    <div className="grid grid-rows-3 grid-cols-12">
                        <div className="col-span-5 bold-text">
                            Giờ đến:
                        </div>
                        <div className="col-span-7">
                            {moment(bill?.room.started_at).format('DD/MM/YYYY HH:mm')}
                        </div>
                        <div className="col-span-5 bold-text">
                            Giờ nghỉ:
                        </div>
                        <div className="col-span-7">
                            {bill?.payment.state ? moment(bill?.room.ended_at).format('DD/MM/YYYY HH:mm') : moment(new Date()).format('DD/MM/YYYY HH:mm')}
                        </div>
                        <div className="col-span-5 bold-text">
                            Hát:
                        </div>
                        <div className="col-span-7">
                            {calTime(bill?.room.started_at, bill?.payment.state ? bill?.room.ended_at : new Date())}
                        </div>
                    </div>
                </div>
                {
                    bill?.order.length !== 0 &&
                    <div className="bill-order">
                        <div className="line-slight"></div>
                        <DataTable value={bill?.order} size="small">
                            <Column field="name" header="Tên món"></Column>
                            <Column field="quantity" header="SL"></Column>
                            <Column field="price" header="Giá"></Column>
                            <Column field="total_money" header="T.Tiền"></Column>
                        </DataTable>
                    </div>
                }
                <div className="line-slight"></div>
                <div className="bill-payment">
                    <div className="grid grid-rows-5 grid-cols-12">
                        <div className="col-span-5 align-left-text bold-text">
                            Tổng tiền món:
                        </div>
                        <div className="col-span-7">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill?.payment.food_money)}
                        </div>
                        <div className="col-span-5 align-left-text bold-text">
                            Tiền giờ:
                        </div>
                        <div className="col-span-7">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill?.payment.hourly_money)}
                        </div>
                        <div className="col-span-5 align-left-text bold-text">
                            Phụ thu:
                        </div>
                        <div className="col-span-7">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill?.payment.surcharge)}
                        </div>
                        <div className="col-span-5 align-left-text bold-text">
                            Giảm giá:
                        </div>
                        <div className="col-span-7">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill?.payment.discount)}
                        </div>
                        <div className="col-span-5 align-left-text bold-text">
                            Tổng tiền:
                        </div>
                        <div className="col-span-7">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill?.payment.total_money)}
                        </div>
                    </div>
                </div>
                <div className="line-slight"></div>
                <div className="bill-cash">
                    <div>THANH TOÁN</div>
                    <div>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bill?.payment.total_money)}
                    </div>
                </div>
                <div className="line-slight"></div>
                <div className="bill-bank">
                    <div>
                        Thanh toán qua tài khoản ngân hàng:
                    </div>
                    {/* <div className="bill-bank_qrcode">
                        <Image src={'/assets/qrcode/qrcode-scb.png'} alt="" width={100} height={100} />
                    </div> */}
                    <div>
                        <div>{bill?.bank.name}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '20px' }}>{bill?.bank.stk}</div>
                    </div>
                    <div>
                        <div>{bill?.bank.owner}</div>
                    </div>

                </div>
                <div className="line-slight"></div>
                <div className="bill-footer">
                    <span>Cảm ơn quý khách đã ghé ủng hộ quán!</span>
                </div>
            </div>
            <Button label="In phiếu" className="button-print" severity="success" onClick={() => printBill()} />
        </>
    );
}

export default Bill;