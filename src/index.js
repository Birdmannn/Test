// XXX even though ethers is not used in the code below, it's very likely
// it will be used by any DApp, so we are already including it here

// Anyways, we are going to imitate the man's code in the example and print out what he calls
// An app that takes in an input and gives out an upper 

import { ethers } from "ethers";
import { getPathController, ApiHandler } from "./service/controllerService";
import { IngredientRepo } from "./repository/ingredientRepo";
import { Ingredient } from "./entity/ingredient";

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

// Here, the payload is in hex
async function handle_advance(data) {
   console.log("Received advance request data " + JSON.stringify(data))
   const payload = JSON.parse(hex2str(data.payload));
   const requestedAction = payload.action;
   const providedData = payload.data;

   const action = getPathController[requestedAction];
   if (!action)
      return await ApiHandler.handleReport({ error: `Invalid action. "${action}"` }, "reject");
   return await action(providedData);
}


async function handle_inspect(data) {
   console.log('Received inspect raw data ->', JSON.stringify(data));
   const params = hex2str(data.payload);
   const paramsArray = params.split('/');
   const requestedAction = paramsArray[0];
   const providedData = paramsArray.slice(1); // The remaining parts after the requested action to perform
   // Point a function in another class.
   const action = getPathController[requestedAction];

   // if the action does not exist
   if (!action) 
      return await ApiHandler.handleReport({ error: `Invalid action "${action}` }, "reject");
   return await action(providedData);
}

function hex2str(hex) {
   return ethers.toUtf8String(hex);
}

var handlers = {
   advance_state: handle_advance,
   inspect_state: handle_inspect,
};

var finish = { status: "accept" };

(async () => {
   while (true) {
      const finish_req = await fetch(rollup_server + "/finish", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ status: "accept" }),
      });

      console.log("Received finish status " + finish_req.status);

      if (finish_req.status == 202) {
         console.log("No pending rollup request, trying again");
      } else {
         const rollup_req = await finish_req.json();
         var handler = handlers[rollup_req["request_type"]];
         finish["status"] = await handler(rollup_req["data"]);
      }
   }
})();
