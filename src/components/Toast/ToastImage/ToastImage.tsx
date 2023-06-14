import Bill from "@/components/Bill/Bill";

const ToastImage = (props: any) => {
    const hideBill = (event: any) => {
        if (event.target === document.getElementById("toastimage")) {
            props.SetShowBill(false);
        }
    }
    return (
        <>
            <div id="toastimage" onClick={(event: any) => hideBill(event)}>
                <Bill room={props.room} />
            </div>
        </>
    );
}

export default ToastImage;