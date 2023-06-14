import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './style.module.sass';
import { useEffect } from "react";

interface ISidebarLink {
    label: string;
    href: string;
    onClick?: () => void;
}

const SideBarLink = ({ label, href, onClick }: ISidebarLink) => {
    const router = useRouter();

    useEffect(() => {
        console.log(window.location.href);
    })

    const activeOption = (event: any) => {
        document.querySelector('.sidebar-option_active')?.classList.remove('sidebar-option_active');

        event.target.classList.add("sidebar-option_active");
    }

    return (
        <Link
            className={"sidebar-option"}
            href={href}
            id={href.replaceAll('/', '')}
            onClick={(event) => activeOption(event)}>
            {label.toLocaleUpperCase()}
        </Link>
    );
}

export default SideBarLink;