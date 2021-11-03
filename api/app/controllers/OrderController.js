import _ from "lodash";
import db from "../models";
import OrderServices from "../services/OrderServices";
import moment from "moment";
export default class OrderController {
  constructor() {
    this.db = db;
    this.orderServices = new OrderServices(this.db);

    this.fetchAllOrders = this.fetchAllOrders.bind(this);
    this.fetchVoidOrders = this.fetchVoidOrders.bind(this);
    this.fetchCompletedOrders = this.fetchCompletedOrders.bind(this);
    this.fetchNonCompletedOrders = this.fetchNonCompletedOrders.bind(this);
    this.fetchNonClosedOrders = this.fetchNonClosedOrders.bind(this);
    this.fetchYearClosedOrders = this.fetchYearClosedOrders.bind(this);
    this.fetchClosedOrders = this.fetchClosedOrders.bind(this);
    this.fetchOverdueOrders = this.fetchOverdueOrders.bind(this);
    this.fetchIncomingOrders = this.fetchIncomingOrders.bind(this);
    this.fetchOneOrder = this.fetchOneOrder.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.createBulkOrders = this.createBulkOrders.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }

  async fetchAllOrders(req, res) {
    try {
      var thisMonth = req.query ? req.query.currentMonth : false;
      const response = await this.orderServices.getAllOrders(thisMonth);

      if (response) {
        const response1 = _.sortBy(response, [
          function(o) {
            return o.id;
          }
        ]);
        const responseArray = _.map(response1, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });

        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchOneOrder(req, res) {
    try {
      var orderId = req.params.id;
      //console.log("fetchOneOrder -> ", orderId);
      const response = await this.orderServices.getOrders(orderId);

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchCompletedOrders(req, res) {
    try {
      var thisMonth = req.query ? req.query.currentMonth : false;
      console.log("req. query ", req.query);
      var closedCompletedOrd = req.query ? req.query.closeComOrd : false;
      const response = await this.orderServices.getCompletedOrders(
        thisMonth,
        closedCompletedOrd
      );

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchClosedOrders(req, res) {
    try {
      var thisMonth = req.query ? req.query.currentMonth : false;
      const response = await this.orderServices.getClosedOrders(thisMonth);

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchYearClosedOrders(req, res) {
    try {
      var year = req.params.year;
      const response = await this.orderServices.getYearClosedOrders(year);

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchNonClosedOrders(req, res) {
    try {
      var thisMonth = req.query ? req.query.currentMonth : false;
      const response = await this.orderServices.getCompletedOrders(thisMonth);

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchNonCompletedOrders(req, res) {
    try {
      var thisMonth = req.query ? req.query.currentMonth : false;
      const response = await this.orderServices.getNonCompletedOrders(
        thisMonth
      );

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchOverdueOrders(req, res) {
    try {
      var thisMonth = req.query ? req.query.currentMonth : false;
      //console.log("fetchOverdueOrders -> ");
      const response = await this.orderServices.getOverDueOrders(thisMonth);

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchVoidOrders(req, res) {
    try {
      var thisMonth = req.query ? req.query.currentMonth : false;
      //console.log("fetchOverdueOrders -> ");
      const response = await this.orderServices.getVoidOrders(thisMonth);

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async fetchIncomingOrders(req, res) {
    try {
      const response = await this.orderServices.getIncomingOrders();

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            order_no: "ORD-1000" + obj.id
          };
        });
        res.send(200, responseArray);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async createOrder(req, res) {
    try {
      const dataObj = req.body;

      const orderResp = await this.orderServices.createOrder(dataObj);

      if (orderResp) {
        res.send(200, orderResp);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }

  async deleteOrder(req, res) {
    try {
      var orderId = req.query.orderId;
      //console.log("order ID -> ", orderId);

      const response = await this.orderServices.deleteOrder(orderId);
      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex -> ", ex);
      res.send(400, "some error occured");
    }
  }

  async updateOrder(req, res) {
    try {
      const dataObj = req.body;
      var orderId = req.params.id;
      const response = await this.orderServices.updateOrder(orderId, dataObj);

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }

  async createBulkOrders(req, res) {
    try {
      const dataObj = req.body;

      const bulkProducts = await this.orderServices.createBulkOrders(dataObj);

      if (bulkProducts.length > 0) {
        res.send(200, bulkProducts);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }
}
