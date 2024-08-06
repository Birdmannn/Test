import { IngredientController } from '../controller/ingredientController';
import { OrderController } from '../controller/orderController';
import { TacoController } from '../controller/tacoController';
import { ethers } from 'ethers';

const ingredientController = new IngredientController();
const orderController = new OrderController();
const tacoController = new TacoController();

// -----------------------------------------------------------------------------------------------------------------------

export const ROLLUP_SERVER = process.env.ROLLUP_HTTP_SERVER_URL;

export const getPathController = {
   orders: orderController.resolveOrder,                       // inspect
   createOrder: orderController.createOrder,                   // advance
   addTaco: tacoController.addTaco,                            // advance
   addIngredient: tacoController.addIngredientToTaco,          // advance
}

// export const postPathController = {
//    p: orderController.createOrder // One POST
// }

// ----------------------------------------------------------------------------------------------------------------------

export class ApiHandler {
   
   static async handlePost(listener) {
      try {
         const result = await listener();
         const payload = result ?? undefined; // if result is undefined.
         const notice_res = await fetch(ROLLUP_SERVER + "/notice", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ payload: strToHex(JSON.stringify(payload)) })
         });

         const notice_res_text = await notice_res.text();
         if (notice_res.status >= 400) {
            throw {
               error: notice_res_text,
               status: notice_res.status,
            };
         }

         console.log("Notice response status: " + notice_res.status);
         console.log(notice_res_text + "\n" + JSON.stringify(payload));

         return "accept";
      } catch (e) {
         return this.handleReport(e.error ? e : { error: e }, "reject");  // or just e
      }
   }

   static async handleGet(listener) {
      try {
         const result = await listener();
         const payload = result ?? undefined;

         return this.handleReport(payload, "accept");
      } catch (e) {
         return this.handleReport(e, "reject");
      }
   }

   static async handleReport(payload, status) {
      const report_req = await fetch(ROLLUP_HTTP_SERVER_URL + "/report", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ payload: strToHex(JSON.stringify(payload)) }),
      });

      const message = await report_req.text();
      console.info("Report status: " + report_req.status);
      console.info("Report message:" + message);
      console.info("Report payload:" + JSON.stringify(payload));

      return report_req.status >= 400 ? "reject" : status;
   }

   strToHex(payload) {
      return ethers.hexlify(ethers.toUtf8Bytes(payload));
   }
}