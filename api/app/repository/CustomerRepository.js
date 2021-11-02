import { Repository } from "./repository";
import Sequelize from "sequelize";
import moment from "moment";
import { sequelize } from "../models";

class CustomerRepository extends Repository {
  constructor(customers) {
    super(customers);
  }

  async getAllCustomers(OrderBookings) {
    try {
      const include = [
        {
          model: OrderBookings,
          as: "order_customer_id",
          attributes: [
            [
              sequelize.fn(
                "COUNT",
                sequelize.col("order_customer_id.customer_id")
              ),
              "countTask"
            ]
          ]
        }
      ];

      const attributes = [
        "customers.customer_name",
        "customers.customer_number",
        "customers.alternate_number",
        "customers.id",
        "customers.customer_address"
      ];

      const group = [
        "order_customer_id.customer_id",
        "customer_name",
        "customer_number",
        "alternate_number",
        "customers.id",
        "customers.customer_address"
      ];

      return await this.findAllRecords(null, attributes, include, { group });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async getCustomer(CustomerId) {
    try {
      return await this.findAllRecords({
        id: {
          [Sequelize.Op.eq]: CustomerId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createCustomer(data) {
    try {
      return await this.createOrUpdate(data, { returning: true });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default CustomerRepository;
