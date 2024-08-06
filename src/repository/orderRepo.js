class OrderRepo {
   orders;
   constructor() {
      this.orders = new Map();
   }

   save(order) {
      this.orders.set(order.id, order);
   }

   getById(id) {
      return this.orders.get(id);
   }

   getAll() {
      return Array.from(this.orders.values());
   }
}

export const orderRepo = new OrderRepo();
