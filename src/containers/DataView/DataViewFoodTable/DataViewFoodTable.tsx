import { Food } from "@/types/model/Food";
import { ResponseBE } from "@/types/model/Response";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState, useContext } from "react";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import useSWR from "swr";
import ToastModifyFood from "@/components/Toast/ToastModifyFood/ToastModifyFood";
import { deleteFoodAPI } from "@/services/backend/API";
import { ToastContext } from "@/contexts/ToastContext";
import ToastCreateFood from "@/components/Toast/ToastCreateFood/ToastCreateFood";

const DataViewFoodTable = () => {
    const groups = useSWR<ResponseBE>('api/food/category').data?.result.map((ele: any) => {
        return {
            name: ele.group,
        };
    });
    const [group, SetGroup] = useState<any | null>(null);
    const foods: Food[] = useSWR<ResponseBE>(`api/food/get?group=${group?.name}`)?.data?.result;
    const { toastRef } = useContext(ToastContext);

    const imageBodyTemplate = (food: Food) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={food.image} alt={food.image} className="w-6rem shadow-2 border-round food-image" />;
    };

    const priceBodyTemplate = (food: Food) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(food.price);
    };

    const deleteFood = async (food: Food) => {
        const { data } = await deleteFoodAPI(food.id);
        toastRef?.current?.show({ severity: data.success ? 'success' : 'error', summary: data.success ? 'success' : 'error', detail: data.message, life: 1000 });
    }

    const actionTemplate = (food: Food) => {
        return <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ToastModifyFood food={{ ...food }} groups={groups.map((ele: any) => ele.name)} />
                <Button icon='pi pi-trash' style={{ marginLeft: '10px' }} severity="danger" onClick={() => deleteFood(food)} />
            </div>
        </>;
    }

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="card flex justify-content-center">
                <Dropdown value={group} onChange={(e: DropdownChangeEvent) => SetGroup(e.value)} options={groups} optionLabel="name"
                    placeholder="Chọn nhóm sản phấm" className="w-full md:w-14rem" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ToastCreateFood groups={groups?.map((ele: any) => ele.name)} />
            </div>
        </div>
    );

    const footer = `Tổng cộng có ${foods ? foods.length : 0} sản phẩm.`;

    return (
        <div className="card">
            <DataTable value={foods} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Tên"></Column>
                <Column header="Minh họa" body={imageBodyTemplate}></Column>
                <Column field="price" header="Giá" body={priceBodyTemplate}></Column>
                <Column field="group" header="Nhóm"></Column>
                <Column field="ordered" header="Đã bán"></Column>
                <Column field="unit" header="Đơn vị"></Column>
                <Column header="Thao tác" body={actionTemplate}></Column>
            </DataTable>
        </div>
    );
}

export default DataViewFoodTable;