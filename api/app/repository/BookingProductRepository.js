import { Repository } from './repository';
import Sequelize from 'sequelize';

class BookingProductRepository extends Repository {
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

  async deleteOrderedProducts(orderId) {
    try {
      //console.log("deleteOrderedProducts ID -> ", orderId);
      return await this.deleteRecord({
        order_id: {
          [Sequelize.Op.eq]: orderId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getOrderedProductsByOrderId(orderId, items) {
    try {
      const include = [{ model: items, as: 'Product_Booking_Key' }];

      return await this.findAllRecords(
        {
          order_id: {
            [Sequelize.Op.eq]: orderId
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

  async getBookingProducts(productIds, startDate, endDate) {
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
          'product_id',
          [
            Sequelize.fn('SUM', Sequelize.col('order_quantity')),
            'order_quantity'
          ]
        ],
        null,
        { group: ['product_id'] }
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
        updateOnDuplicate: ['id']
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default BookingProductRepository;
