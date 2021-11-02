import { Repository } from "./repository";
import Sequelize from "sequelize";
import moment from "moment";
var bcrypt = require("bcrypt-nodejs");
import jwt from "jsonwebtoken";
class UserRepository extends Repository {
  constructor(users) {
    super(users);
  }

  async getAllUsers() {
    try {
      return await this.findAllRecords();
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  

  async getUser(username) {
    try {
      return await this.findAllRecords({
        username: {
          [Sequelize.Op.eq]: username
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createUser(data) {
    try {
      //console.log("createUser -> ", data);
      data.password = bcrypt.hashSync(
        data.password,
        bcrypt.genSaltSync(10),
        null
      );
      return await this.createOrUpdate(data, { returning: true });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default UserRepository;
