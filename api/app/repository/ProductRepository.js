import { Repository } from "./repository";
import Sequelize from "sequelize";
class ProductRepository extends Repository {
  constructor(products) {
    super(products);
  }

  async getAllProducts(categories) {
    try {
      const include = [{ model: categories, as: "Category" }];
      return await this.findAllRecords(
        {
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

  async deleteProduct(productId) {
    try {
      //console.log("deleteOrderedProducts ID -> ", productId);
      return await this.updateRecord(
        {
          id: {
            [Sequelize.Op.eq]: productId
          }
        },
        { is_void: true }
      );
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getProductQuantity(productIds) {
    try {
      return await this.findAllRecords(
        {
          id: {
            [Sequelize.Op.in]: productIds
          },
          is_void: {
            [Sequelize.Op.not]: true
          }
        },
        ["id", "quantity"]
      );
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getProducts(productIds) {
    try {
      return await this.findAllRecords({
        id: {
          [Sequelize.Op.eq]: productIds
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

  async createProduct(data) {
    try {
      return await this.createOrUpdate(data, { returning: true });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createBulkProducts(data) {
    try {
      return await this.createBulkRecords(data);
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default ProductRepository;
