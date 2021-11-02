import { Repository } from "./repository";
import Sequelize from "sequelize";
import moment from "moment";

class TargetRepository extends Repository {
  constructor(target) {
    super(target);
  }

  async deleteTarget(targetId) {
    try {
      return await this.deleteRecord({
        id: {
          [Sequelize.Op.eq]: targetId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getAllTarget(year) {
    try {
      
      return await this.findAllRecords({
        year: {
          [Sequelize.Op.eq]: year
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getTarget(targetId) {
    try {
      return await this.findAllRecords({
        id: {
          [Sequelize.Op.eq]: targetId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createTarget(data) {
    try {
      //console.log("createTarget -> ", data);

      return await this.createOrUpdate(data, { returning: true });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createBulkTarget(data) {
    try {
      return await this.createBulkRecords(data);
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default TargetRepository;
