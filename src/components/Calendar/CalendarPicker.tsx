import React, { useState } from "react";
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

const CalendarPicker = (props: any) => {
    const [date, setDate] = useState<string | Date | Date[] | null>(new Date());


    const changeDate = async (e: CalendarChangeEvent) => {
        setDate(e.value ? e.value : null)
        props.SetViewDate(e.value);
    }

    addLocale('vn', {
        dayNames: ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'],
        dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        monthNamesShort: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        today: 'Hôm nay',
        clear: 'Xóa bỏ'
    });

    return (
        <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e: CalendarChangeEvent) => changeDate(e)} locale="vn" showIcon dateFormat="dd/mm/yy" showButtonBar/>
        </div>
    )
}

export default CalendarPicker;
