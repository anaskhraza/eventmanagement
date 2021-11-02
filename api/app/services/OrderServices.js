import OrderRepository from "../repository/OrderRepository";
// import { rolesDTO } from "../DTO/rbacDTO";

class OrderServices {
  constructor(db) {
    this.database = db;
    this.orderRepository = new OrderRepository(db.OrderBookings);
  }

  async getAllOrders(thisMonth) {
    return await this.orderRepository.getAllOrders(this.database.customers, thisMonth);
  }

  async getCompletedOrders(thisMonth, closedCompletedOrd) {
    return await this.orderRepository.getCompletedOrders(thisMonth, closedCompletedOrd);
  }

  async getClosedOrders(thisMonth) {
    return await this.orderRepository.getClosedOrders(thisMonth);
  }

  async getYearClosedOrders(year) {
    return await this.orderRepository.getYearClosedOrders(year);
  }

  async getNonClosedOrders() {
    return await this.orderRepository.getNonClosedOrders();
  }

  async getOverDueOrders(thisMonth) {
    return await this.orderRepository.getOverDueOrders(thisMonth);
  }

  async getVoidOrders(thisMonth) {
    return await this.orderRepository.getVoidOrders(thisMonth);
  }

  async getNonCompletedOrders(thisMonth) {
    return await this.orderRepository.getNonCompletedOrders(thisMonth);
  }

  async getIncomingOrders() {
    return await this.orderRepository.getIncomingOrders();
  }

  async getOrders(orderIds) {
    return await this.orderRepository.getOrders(orderIds);
  }

  async createOrder(name) {
    return await this.orderRepository.createOrder(name);
  }

  async updateOrder(orderId, data) {
    return await this.orderRepository.updateOrder(orderId, data);
  }

  async deleteOrder(orderId) {
    return await this.orderRepository.deleteOrder(orderId);
  }

  async createBulkOrders(names) {
    return await this.orderRepository.createBulkOrders(names);
  }
}

export default OrderServices;
