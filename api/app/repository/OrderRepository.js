import { Repository } from "./repository";
import Sequelize from "sequelize";
import moment from "moment";

class OrderRepository extends Repository {
  constructor(orders) {
    super(orders);
  }

  async getAllOrders(customers, thisMonth) {
    try {
      let objWhere = this.getTodayObject(thisMonth);
      const include = [{ model: customers, as: "order_customer" }];
      return await this.findAllRecords(
        {
          ...objWhere,
          is_void: {
            [Sequelize.Op.not]: true
          }
        },
        null,
        include
      );
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  getTodayObject = thisMonth => {
    let objWhere = {};

    if (thisMonth) {
      const startOfMonth =
        moment()
          .startOf("month")
          .format("YYYY-MM-DD") + " 00:00:01";
      const endOfMonth =
        moment()
          .endOf("month")
          .format("YYYY-MM-DD") + " 23:59:00";
      objWhere.booking_date = {
        [Sequelize.Op.between]: [startOfMonth, endOfMonth]
      };
    }

    return objWhere;
  };

  getPreviousCompletedOrd = closedCompletedOrd => {
    let objWhere = {};

    if (closedCompletedOrd) {
      const startOfMonth = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      objWhere.event_date_start = {
        [Sequelize.Op.lt]: startOfMonth
      };
    }

    return objWhere;
  };

  async getCompletedOrders(thisMonth, closedCompletedOrd) {
    try {
      let objWhere = this.getTodayObject(thisMonth);
      console.log("OBJ WHERE ", objWhere);
      let objWhere1 = this.getPreviousCompletedOrd(closedCompletedOrd);
      return await this.findAllRecords({
        ...objWhere,
        ...objWhere1,
        complete: {
          [Sequelize.Op.is]: true
        },
        is_void: {
          [Sequelize.Op.not]: true
        },
        is_closed: {
          [Sequelize.Op.not]: true
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getYearClosedOrders(year) {
    let sDate = moment(`${year}-01-01 00:00:01`).format("YYYY-MM-DD HH:MM:SS");
    let eDate = moment(`${year}-12-31 23:59:59`).format("YYYY-MM-DD HH:MM:SS");

    try {
      return await this.findAllRecords({
        is_closed: {
          [Sequelize.Op.is]: true
        },
        is_void: {
          [Sequelize.Op.not]: true
        },
        booking_date: {
          [Sequelize.Op.between]: [sDate, eDate]
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getClosedOrders(thisMonth) {
    try {
      let objWhere = this.getTodayObject(thisMonth);
      console.log("here -> ", objWhere);
      return await this.findAllRecords({
        ...objWhere,
        is_closed: {
          [Sequelize.Op.is]: true
        },
        is_void: {
          [Sequelize.Op.not]: true
        }
      });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async getVoidOrders(thisMonth) {
    try {
      let objWhere = this.getTodayObject(thisMonth);
      console.log("here -> ", objWhere);
      return await this.findAllRecords({
        ...objWhere,
        is_void: {
          [Sequelize.Op.is]: true
        }
      });
    } catch (error) {
      console.log("catch ex", error);
      throw error;
    }
  }

  async getNonClosedOrders() {
    try {
      return await this.findAllRecords({
        complete: {
          [Sequelize.Op.is]: true
        },
        is_closed: {
          [Sequelize.Op.not]: true
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getOverDueOrders(thisMonth) {
    try {
      let objWhere = this.getTodayObject(thisMonth);
      //console.log("fetchOverdueOrders -> ", "is_due_amount");
      return await this.findAllRecords({
        ...objWhere,
        is_due_amount: {
          [Sequelize.Op.ne]: "0"
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getNonCompletedOrders(thisMonth) {
    try {
      objWhere = this.getTodayObject(thisMonth);
      return await this.findAllRecords({
        ...objWhere,
        complete: {
          [Sequelize.Op.not]: true
        },
        is_void: {
          [Sequelize.Op.not]: true
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getIncomingOrders() {
    const date2 = moment()
      .add(5, "days")
      .format("YYYY-MM-DD");
    const date1 = moment().format("YYYY-MM-DD");
    try {
      return await this.findAllRecords({
        event_date_start: {
          [Sequelize.Op.between]: [date1, date2]
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getOrders(orderId) {
    try {
      return await this.findAllRecords({
        id: {
          [Sequelize.Op.eq]: orderId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async updateOrder(orderId, data) {
    try {
      //console.log("deleteOrderedProducts ID -> ", orderId);
      return await this.updateRecord(
        {
          id: {
            [Sequelize.Op.eq]: orderId
          }
        },
        data
      );
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      //console.log("deleteOrderedProducts ID -> ", orderId);
      return await this.deleteRecord({
        id: {
          [Sequelize.Op.eq]: orderId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createOrder(data) {
    try {
      return await this.createOrUpdate(data, { returning: true });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createBulkOrders(data) {
    try {
      return await this.createBulkRecords(data, {
        updateOnDuplicate: ["is_closed"]
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default OrderRepository;
