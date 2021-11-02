import _ from "lodash";
import db from "../models";
import CustomerServices from "../services/CustomerServices";
import moment from "moment";

export default class CustomerController {
  constructor() {
    this.db = db;
    this.customerServices = new CustomerServices(this.db);
    
    this.fetchAllCustomers = this.fetchAllCustomers.bind(this);
    this.fetchCustomer = this.fetchCustomer.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
  }

  async fetchAllCustomers(req, res) {
    try {
      const response = await this.customerServices.getAllCustomers();

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchCustomer(req, res) {
    try {
      var customerId = req.params.id;
      const response = await this.customerServices.getCustomer(customerId);

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async createCustomer(req, res) {
    try {
      const dataObj = req.body;
      //console.log("createCustomer -> ", dataObj)
      const customerResponse = await this.customerServices.createCustomer(dataObj);

      if (customerResponse) {
        res.send(200, customerResponse);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex " , ex);

      res.send(400, "some error occured");
    }
  }
}
