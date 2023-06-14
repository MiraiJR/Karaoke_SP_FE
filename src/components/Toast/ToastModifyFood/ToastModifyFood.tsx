import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '@/contexts/ToastContext';
import { Food } from '@/types/model/Food';
import { InputText } from 'primereact/inputtext';
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import slugify from 'slugify';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import Image from 'next/image';
import { updatedFoodAPI } from '@/services/backend/API';

interface IToastModifyFood {
    food: Food,
    groups: any,
}

const ToastModifyFood = ({ food, groups }: IToastModifyFood) => {
    const [visible, setVisible] = useState(false);
    const { toastRef } = useContext(ToastContext);
    const [group, SetGroup] = useState<any>(food.group);
    const [autocompleteGroups, SetAutocompleteGroups] = useState<string[]>(groups);
    const [imagePreview, SetImagePreview] = useState<string>(food.image);
    const [foodName, SetFoodName] = useState<string>(food.name);
    const [foodPrice, SetFoodPrice] = useState<number>(food.price);
    const [foodUnit, SetFoodUnit] = useState<string>(food.unit);
    const [foodFile, SetFoodFile] = useState<any>(null);

    const updatedFood = async () => {
       const form_data = new FormData();

       form_data.append('file', foodFile);
       form_data.append('name', foodName);
       form_data.append('price', foodPrice.toString());
       form_data.append('unit', foodUnit);
       form_data.append('group', group);
       const {data} = await updatedFoodAPI(food.id, form_data);
       toastRef?.current?.show({ severity: data.success ? 'success' : 'error', summary: data.success ? 'success' : 'error', detail: data.message, life: 1000 });
    }

    const searchGroup = (event: AutoCompleteCompleteEvent) => {
        const temp = groups.filter((ele: any) => {
            if (slugify(ele, {
                trim: true,
                replacement: '-',
            }).includes(slugify(event.query.toLocaleUpperCase(), {
                trim: true,
                replacement: '-',
            }))) {
                return ele;
            }
        });

        SetAutocompleteGroups(temp);
    }

    const uploadImage = async (event: any) => {
        const file = event.files[0];
        SetFoodFile(file);
        SetImagePreview(URL.createObjectURL(file));
    };

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { setVisible(false); updatedFood() }} autoFocus />
        </div>
    );

    return (
        <>
            <div className="card flex justify-content-center">
                <Button icon='pi pi-file-edit' severity='info' onClick={() => setVisible(true)} />
                <Dialog header={`Sửa sản phẩm ${food.name}`} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                    <div className='modal-food'>
                        <div className="card flex justify-content-center grid">
                            <div className="flex flex-column gap-2 grid grid-cols-12">
                                <label htmlFor="food-name" className='col-span-4'>Tên sản phẩm</label>
                                <InputText id="food-name" value={foodName} onChange={(e: any) => SetFoodName(e.target.value)} className='col-span-8' aria-describedby="" />
                            </div>
                        </div>
                        <div className="card flex justify-content-center grid">
                            <div className="flex flex-column gap-2 grid grid-cols-12">
                                <label htmlFor="food-price" className='col-span-4'>Giá sản phẩm</label>
                                <InputNumber id="food-price" value={foodPrice} onChange={(e: any) => SetFoodPrice(e.value)} className='col-span-8' aria-describedby="" />
                            </div>
                        </div>
                        <div className="card flex justify-content-center grid">
                            <div className="flex flex-column gap-2 grid grid-cols-12">
                                <label htmlFor="food-group" className='col-span-4'>Nhóm sản phẩm</label>
                                <AutoComplete id='food-group' className='col-span-8 modal-food-dropdown' value={group} suggestions={autocompleteGroups} completeMethod={searchGroup} onChange={(e: AutoCompleteChangeEvent) => SetGroup(e.value)} dropdown />
                            </div>
                        </div>
                        <div className="card flex justify-content-center grid">
                            <div className="flex flex-column gap-2 grid grid-cols-12">
                                <label htmlFor="food-unit" className='col-span-4'>Đơn vị tính</label>
                                <InputText id="food-unit" value={foodUnit} onChange={(e: any) => SetFoodUnit(e.target.value)} className='col-span-8' aria-describedby="" />
                            </div>
                        </div>
                        <div className="card flex justify-content-center grid">
                            <div className="flex flex-column gap-2 grid grid-cols-12">
                                <div className="card col-span-4">
                                    <FileUpload id='food-image' mode="basic" name="food-image" accept="image/*" onSelect={uploadImage} />
                                </div>
                                <div className='col-span-8' >
                                    <Image src={imagePreview} alt='' width={200} height={200} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    );
}

export default ToastModifyFood;