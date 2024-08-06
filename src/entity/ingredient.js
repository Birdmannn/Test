import uuidGenerator from 'node:crypto';

export const IngredientType = {
   WRAP: 'wrap',
   PROTEIN: 'protein',
   VEGGIES: 'veggies',
   CHEESE: 'cheese',
   SAUCE: 'sauce'
};

// This ingredient will be used together with the Taco class.
export class Ingredient {
   id;
   name;
   type;
   creator;

   // Takes in the creator's address
   // ...
   // Use a try-catch to create this ingredient, and log the error.
   constructor({ name, type }) {
      this.id = uuidGenerator.randomUUID();
      this.name = name;
      if (!(type in IngredientType))
         throw new Error(`invalid ingredient type ${type}`);
      else
         this.type = type;
   }

   // TODO: may request for some data in the future

}
