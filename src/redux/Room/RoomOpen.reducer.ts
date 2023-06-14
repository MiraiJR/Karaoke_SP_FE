import { OrderedFood } from "@/types/model/OrderedFood";
import { RoomOpen } from "@/types/model/RoomOpen";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initalState = {
    room: undefined,
    foods: [],
    payment: {
        room: '',
        hourly_money: 0,
        food_money: 0,
        discount: 0,
        surcharge: 0,
        total_money: 0,
    },
};

export const changeRoomOpen = createAction<any>('room_open/changeRoomOpen');
export const orderFood = createAction<OrderedFood>('room_open/orderFood');
// export const changePayment = createAction<Payment>('room')

const roomOpenReducer = createReducer(initalState, (builder) => {
    builder.addCase(changeRoomOpen, (state: any, action) => {
        const roomopen = action.payload;
        state.room = roomopen;
        return state;
    });

    builder.addCase(orderFood, (state: any, action) => {
        const food = action.payload;

        state.foods.push(food);
    })
});

export default roomOpenReducer;