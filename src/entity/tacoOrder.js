import uuidGenerator from 'node:crypto';

export class TacoOrder {
   id;
   owner;
   createdAt;
   tacos;
   updatedAt;

   // something
   constructor(owner) {
      this.id = uuidGenerator.randomUUID();
      this.owner = owner;
      this.createdAt = Date.now();
      this.tacos = new Map();
      this.updatedAt = Date.now();
   }

   addTaco(taco) {
      this.tacos.set(taco.id, taco);
      this.updatedAt = Date.now();
   }

   getTacos() {
      return Array.from(this.tacos.values());
   }

   getTacoById(id) {
      return this.tacos.get(id);
   }

   getOrder() {
      return {
         id: this.id,
         owner: this.owner,
         createdAt: this.createdAt,
         updatedAt: this.updatedAt,
         tacos: this.tacos
      }
   }
}