import { changeCategory } from "@/redux/Common/Common.reducer";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";

interface ICardCategory {
    label: string;
    icon: string;
}


const CardCategory = ({ label, icon }: ICardCategory) => {
    const choosen_category = useSelector((state: any) => state.common.category);
    const dispatch = useDispatch();

    useEffect(() => {
        document.querySelector('.card-category_active')?.classList.remove('card-category_active');
        document.getElementById(slugify(choosen_category, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: false,
            locale: 'vi',
            trim: true,
        }))?.classList.add('card-category_active');
    })

    const showFood = (event: any, label: string) => {
        document.querySelector('.card-category_active')?.classList.remove('card-category_active');
        event.target.classList.add('card-category_active');

        dispatch(changeCategory(label));
    }

    return (
        <>
            <div id={icon} className="card-category" onClick={(event: any) => showFood(event, label)}>
                <div>
                    <Image src={`/assets/category/${icon}-icon.png`} alt="" width={50} height={50}></Image>
                </div>
                <span>
                    {label}
                </span>
            </div>
        </>
    );
}

export default CardCategory;