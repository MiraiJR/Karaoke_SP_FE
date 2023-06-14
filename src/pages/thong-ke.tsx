import CalendarPicker from "@/components/Calendar/CalendarPicker";
import DataViewPayment from "@/containers/DataView/DataViewPayment";
import moment from "moment";
import Head from "next/head";
import { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import MonthPicker from "@/components/Calendar/MonthPick";
import DataViewPaymentMonth from "@/containers/DataView/DataViewPaymentMonth";

const ThongKePage = () => {
    const [view_date, SetViewDate] = useState<Date>(new Date());
    const [show_date, SetShowDate] = useState<boolean>(true);
    const options = ['Xem theo ngày', 'Xem theo tháng'];
    const [view_follow, SetViewFollow] = useState(options[0]);
    const [view_month, SetViewMonth] = useState<Date>(new Date());

    return (
        <>
            <Head>
                <title>Thống kế</title>
            </Head>
            <div id="analysis">
                <div className="card flex justify-content-center">
                    <SelectButton value={view_follow} onChange={(e) => {
                        if (e.value) {
                            SetViewFollow(e.value);
                            if (e.value === options[0]) {
                                SetShowDate(true);
                            } else {
                                SetShowDate(false);
                            }
                        }
                    }} options={options} />
                </div>
                {
                    show_date ?
                        <div>
                            <div className="analysis-title">
                                Thống kê ngày {moment(view_date).format('DD/MM/YYYY')}
                            </div>
                            <CalendarPicker SetViewDate={SetViewDate} />
                            <DataViewPayment date={view_date} />
                        </div>
                        : <div>
                            <div className="analysis-title">
                                Thống kê tháng {moment(view_month).format('MM')}
                            </div>
                            <MonthPicker SetViewMonth={SetViewMonth}/>
                            <DataViewPaymentMonth date={view_month}/>
                        </div>
                }
            </div>
        </>
    );
}

export default ThongKePage