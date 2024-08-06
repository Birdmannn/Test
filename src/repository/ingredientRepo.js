// An in-memory repositoory for styoring ingredients

export class IngredientRepo {
   ingredients;

   constructor() {
      this.ingredients = new Map();
   }

   save(ingredient) {
      this.ingredients.set(ingredient.id, ingredient);
   }

   getById(id) {
      return this.ingredients.get(id);
   }

   // might not be used
   getAll() {
      return Array.from(this.ingredients.values());
   }
}

// export const ingredientRepo = new IngredientRepo();