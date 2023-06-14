import { OrderedFood } from "@/types/model/OrderedFood";
import { RoomOpen } from "@/types/model/RoomOpen";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initalState = {
    show_order_food: false,
    category: 'BIA',
    flag_cancel_room: false,
    rooms: [],
};

export const changeShowOrderFood = createAction<boolean>('common/changeShowOrderFood');
export const changeCategory = createAction<String>('common/changeCategory');
export const changeFlagCancelRoom = createAction<boolean>('common/changeFlagCancelRoom');
export const changeRooms = createAction<any>('common/changeRooms');

const commonReducer = createReducer(initalState, (builder) => {
    builder.addCase(changeShowOrderFood, (state: any, action) => {
        state.show_order_food = action.payload;
    })

    builder.addCase(changeCategory, (state: any, action) => {
        state.category = action.payload;
    })

    builder.addCase(changeFlagCancelRoom, (state: any, action) => {
        state.flag_cancel_room = action.payload;
    })

    builder.addCase(changeRooms, (state: any, action) => {
        state.rooms = action.payload;
    })
});

export default commonReducer;