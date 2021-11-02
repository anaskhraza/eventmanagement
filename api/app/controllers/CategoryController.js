import _ from "lodash";
import db from "../models";
import CategoryServices from "../services/CategoryServices";
import moment from "moment";

export default class CategoryController {
  constructor() {
    this.db = db;
    this.categoryServices = new CategoryServices(this.db);

    this.fetchAllCategories = this.fetchAllCategories.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.createBulkCategory = this.createBulkCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async fetchAllCategories(req, res) {
    try {
      const response = await this.categoryServices.getAllCategory();

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async deleteCategory(req, res) {
    try {
      var categoryId = req.query.categoryId;

      const response = await this.categoryServices.deleteCategory(categoryId);
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

  async fetchCategory(req, res) {
    try {
      var categoryId = req.params.id;
      const response = await this.categoryServices.getCategory(categoryId);

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async createCategory(req, res) {
    try {
      const dataObj = req.body;

      const categoryResponse = await this.categoryServices.createCategory(
        dataObj
      );

      if (categoryResponse) {
        res.send(200, categoryResponse);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }

  async createBulkCategory(req, res) {
    try {
      const dataObj = req.body;

      const categoryResponse = await this.categoryServices.createBulkCategory(
        dataObj
      );

      if (categoryResponse.length > 0) {
        res.send(200, categoryResponse);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }
}
