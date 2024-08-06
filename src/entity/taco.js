import uuidGenerator from 'node:crypto';

export class Taco {
   id;
   name;
   ingredients;
   returnedIngredients;

   constructor({name}) {
      this.id = uuidGenerator.randomUUID();
      this.name = name;
      this.ingredients = new Map() // check this for debugging.
   }

   addIngredient(ingredient) {
      this.ingredients.set(ingredient.id, ingredient);
   }

   // Might not be needed at all.
   getTacoData() {
      return {
         id: this.id,
         name: this.name,
         ingredients: this.ingredients
      }
   }

   getIngredients() {
      return Array.from(this.ingredients.values());
   }
}