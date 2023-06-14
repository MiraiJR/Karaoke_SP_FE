import { Carousel } from 'primereact/carousel';
import CardCategory from '@/components/Card/CardCategory/CardCategory';
import useSWR from 'swr';
import { ResponseBE } from '@/types/model/Response';
import slugify from 'slugify';

const CarouselCategory = () => {
    const { data } = useSWR<ResponseBE>('api/food/category');
    const category_list = data ? data?.result.map((ele: any) => {
        return {
            label: ele.group,
            icon: slugify(ele.group, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: false,
                locale: 'vi',
                trim: true,
            }),
        };
    }) : [];

    return (
        <>
            <div className='carousel-category'>
                <Carousel value={category_list} numVisible={10} numScroll={1} itemTemplate={CardCategory} />
            </div>
        </>
    );
}

export default CarouselCategory;