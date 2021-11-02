import { Repository } from "./repository";
import Sequelize from "sequelize";

class DraftProductRepository extends Repository {
  constructor(bookingProducts) {
    super(bookingProducts);
  }

  async getOrdererdDateProducts() {
    try {
      return await this.findAllRecords();
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async deleteOrderedProducts(draftId) {
    try {
      //console.log("deleteOrderedProducts ID -> ", draftId);
      return await this.deleteRecord({
        draft_id: {
          [Sequelize.Op.eq]: draftId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getOrderedProductsByDraftId(draftId) {
    try {
      return await this.findAllRecords({
        draft_id: {
          [Sequelize.Op.eq]: draftId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getDraftProducts(productIds, startDate, endDate) {
    try {
      return await this.findAllRecords(
        {
          product_id: {
            [Sequelize.Op.in]: productIds
          },
          [Sequelize.Op.or]: [
            {
              event_booking_start: {
                [Sequelize.Op.between]: [startDate, endDate]
              }
            },
            {
              event_booking_end: {
                [Sequelize.Op.between]: [startDate, endDate]
              }
            }
          ]
        },
        [
          "product_id",
          [
            Sequelize.fn("SUM", Sequelize.col("order_quantity")),
            "order_quantity"
          ]
        ],
        null,
        { group: ["product_id"] }
      );
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createBulkProducts(params) {
    try {
      //console.log("createBulkProducts ", params);
      return await this.createBulkRecords(params, {
        updateOnDuplicate: ["id"]
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default DraftProductRepository;
