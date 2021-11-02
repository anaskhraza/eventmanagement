import { Repository } from "./repository";
import Sequelize from "sequelize";
import moment from "moment";

class CategoryRepository extends Repository {
  constructor(category) {
    super(category);
  }

  async deleteCategory(categoryId) {
    try {
      return await this.deleteRecord({
        id: {
          [Sequelize.Op.eq]: categoryId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  
  async getAllCategory() {
    try {
      return await this.findAllRecords();
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getCategory(categoryId) {
    try {
      return await this.findAllRecords({
        id: {
          [Sequelize.Op.eq]: categoryId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createCategory(data) {
    try {
      //console.log("createCategory -> ", data);

      return await this.createOrUpdate(data, { returning: true });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createBulkCategory(data) {
    try {
      return await this.createBulkRecords(data);
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default CategoryRepository;
