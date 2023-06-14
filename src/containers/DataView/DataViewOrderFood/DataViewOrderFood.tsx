import CardOrderFood from "@/components/Card/CardOrderFood/CardOrderFood";
import { ResponseBE } from "@/types/model/Response";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import useSWR from "swr";

const DataViewOrderFood = () => {
    const category = useSelector((state: any) => state.common.category);
    const { data } = useSWR<ResponseBE>(`api/food/get?group=${category}`);

    return (
        <>
            <Grid container spacing={0.5}>
                {
                    data?.result.map((ele: any, index: number) => (
                        <Grid item xs={3} key={index} >
                            <CardOrderFood {...ele} />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}

export default DataViewOrderFood;