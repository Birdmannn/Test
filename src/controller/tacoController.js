import { orderRepo } from "../repository/orderRepo";
import { ApiHandler } from "../service/controllerService";
import { Taco } from "../entity/taco";
import { Ingredient } from "../entity/ingredient";

export class TacoController {

   // Provide {order: UUID} to add a taco  to an order: required.
   async addTaco(data) {
      if (!data.order) {
         return await ApiHandler.handleReport({
            error: "order id is required.",
         }, "reject");
      }

      const order = orderRepo.getById(data.order);
      if (!order.id) {
         return await ApiHandler.handleReport({
            error: `Order not found for id "${data.order}"`,
         }, "reject");
      }

      return await ApiHandler.handlePost(() => {
         const taco = new Taco(data);
         order.addTaco(taco);
         orderRepo.save(order);
         return {
            status: 200,
            message: `Taco successfully added to order '${order.id}'`,
            data: taco.getTacoData(),
         };
      });
   }

   // Provide {order: UUID, taco: UUID} to add an ingredient to the taco: required.
   // This has to be completed before adding a Taco to the order for
   // safe measures. I decided to implement it this way.
   async addIngredientToTaco(data) {
      if (!data.order || !data.taco) {
         return await ApiHandler.handleReport({
            error: "Order and Taco id are required.",
         }, "reject");
      }

      const order = orderRepo.getById(data.order);
      if (!order.id) {
         return await ApiHandler.handleReport({
            error: `Order not found for id "${data.order}"`,
         }, "reject");
      }
      const taco = order.getTacoById(id);
      if (!taco.id) {
         return await ApiHandler.handleReport({
            error: `Order not found for id "${data.taco}"`,
         }, "reject");
      }

      return await ApiHandler.handlePost(() => {
         const ingredient = new Ingredient(data);
         taco.addIngredient(ingredient);
         order.addTaco(taco);
         orderRepo.save(order);
         return {
            status: 200,
            message: `Ingredient with id '${ingredient.id}' successfully added to Taco. Order successfully resolved.`,
            data: taco.getTacoData(),
            ingredients: taco.getIngredients(),
         };
      });
   }
}