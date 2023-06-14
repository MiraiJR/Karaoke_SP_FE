import Image from 'next/image';
import Logo from '../../../public/assets/Logo.png';
import SideBarLink from '@/components/SideBar/SideBarLink/SideBarLink';


const sidebar_list = [
    {
        label: 'Phòng',
        href: '/phong',
    },
    {
        label: 'Thực đơn',
        href: '/thuc-don',
    },
    {
        label: 'Thống kê',
        href: '/thong-ke',
    }
]

const SideBar = () => {
    return (
        <>
            <div className="sidebar">
                <div>
                    <Image className="image-logo" src={Logo} alt='' />
                </div>
                <ul className="sidebar-options">
                    {
                        sidebar_list.map((ele, index) => (
                            <SideBarLink {...ele} key={index} />
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default SideBar;