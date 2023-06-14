import { Payment } from "@/types/model/Payment";
import axiosClient from "./AxiosClient"

export const updateOrderFood = async (room: string, food: number, quantity: number) => {
   return await axiosClient.put(`api/orderedfood/update?room=${room}&food=${food}&quantity=${quantity}`);
}

export const updatePayment = async (room: string) => {
   const { data } = await getPaymentOfRoom(room);

   if (!data?.result.state) {
      return await axiosClient.put(`api/payment/update/${room}`);
   }
}

export const getPaymentOfRoom = async (room: string) => {
   return await axiosClient.get(`api/payment/get/${room}`);
}

export const removeOrderedFood = async (room: string, food: number) => {
   return await axiosClient.delete(`api/orderedfood/delete?room=${room}&food=${food}`);
}

export const paymentRoom = async (room: string) => {
   return await axiosClient.put(`api/roomopen/close/${room}`);
}

export const cancelRoom = async (room: string) => {
   return await axiosClient.delete(`api/roomopen/cancel/${room}`);
}

export const orderFoodRoom = async (room: string, food: number, quantity: number) => {
   return await axiosClient.post('api/orderedfood/order', {
      room: room,
      food: food,
      quantity: quantity,
   });
}

export const getRoom = async (id: number) => {
   return await axiosClient.get(`api/roomopen/get/${id}`);
}

export const createNewRoomOpen = async (id_room: number) => {
   return await axiosClient.post('api/roomopen/create', {
      id_room: id_room,
   });
}

export const analysisDate = async (date: string) => {
   return await axiosClient.get(`api/payment/analysis/day?date=${date}`);
}

export const updatePaymentField = async (payment: Payment) => {
   return await axiosClient.put(`api/payment/update`, {
      ...payment
   });
}

export const updatedStartedAtRoomOpen = async (room: string, date: any) => {
   return await axiosClient.put(`api/roomopen/updated/${room}`, {
      started_at: date,
   });
}

export const deleteFoodAPI = async (id_food: number) => {
   return await axiosClient.delete(`api/food/delete/${id_food}`);
}

export const updatedFoodAPI = async (id_food: number, form_data: FormData) => {
   return await axiosClient.putForm(`api/food/updated/${id_food}`, form_data);
}

export const createFoodAPI = async (form_data: FormData) => {
   return await axiosClient.postForm(`api/food/create`, form_data);
}