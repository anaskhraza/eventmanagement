import CustomerRepository from "../repository/CustomerRepository";
// import { rolesDTO } from "../DTO/rbacDTO";

class CustomerServices {
  constructor(db) {
    this.database = db;
    this.customerRepository = new CustomerRepository(db.customers);
  }

  async getAllCustomers() {

    return await this.customerRepository.getAllCustomers(this.database.OrderBookings);
  }

  async getCustomer(customerId) {
    return await this.customerRepository.getCustomer(customerId);
  }

  async createCustomer(name) {
    return await this.customerRepository.createCustomer(name);
  }
  
}

export default CustomerServices;
