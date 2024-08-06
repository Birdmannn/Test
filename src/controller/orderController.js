import { TacoOrder } from "../entity/tacoOrder";
import { ApiHandler } from "../service/controllerService";
import { orderRepo } from "../repository/orderRepo";

export class OrderController {

   async createOrder(data) {
      return await ApiHandler.handlePost(() => {
         order = new TacoOrder(data.owner);
         orderRepo.save(order);
         return {
            status: 200,
            message: "Success. Your order has been created.",
            data: order.getOrder(),
         }
      })
   }

   async resolveOrder(data) {
      return data != undefined ? await this.getOrderById(data) : await getAllOrders();
   }

   async getAllOrders() {
      return await ApiHandler.handleGet(() => orderRepo.getAll());
   }

   async getOrderById(data) {
      const id = data[0];
      const order = orderRepo.getById(id);
      if (!order?.id)
         return await ApiHandler.handleReport({ error: `Order with id "${id}" not found` }, "reject");
      return await ApiHandler.handleGet(() => ({
         data: {
            details: order.getOrder(),
         }
      }));
   }
}