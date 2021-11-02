import _ from "lodash";
import db from "../models";
import TargetServices from "../services/TargetServices";
import moment from "moment";

export default class TargetController {
  constructor() {
    this.db = db;
    this.targetServices = new TargetServices(this.db);

    this.fetchAllTargets = this.fetchAllTargets.bind(this);
    this.fetchTarget = this.fetchTarget.bind(this);
    this.createTarget = this.createTarget.bind(this);
    this.createBulkTarget = this.createBulkTarget.bind(this);
    this.deleteTarget = this.deleteTarget.bind(this);
  }

  async fetchAllTargets(req, res) {
    try {
      var year = req.params.year;
      const response = await this.targetServices.getAllTarget(year);

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async deleteTarget(req, res) {
    try {
      var targetId = req.query.targetId;

      const response = await this.targetServices.deleteTarget(targetId);
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

  async fetchTarget(req, res) {
    try {
      var targetId = req.params.id;
      const response = await this.targetServices.getTarget(targetId);

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      res.send(400, "some error occured");
    }
  }

  async createTarget(req, res) {
    try {
      const dataObj = req.body;

      const targetResponse = await this.targetServices.createTarget(dataObj);

      if (targetResponse) {
        res.send(200, targetResponse);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }

  async createBulkTarget(req, res) {
    try {
      const dataObj = req.body;

      const targetResponse = await this.targetServices.createBulkTarget(
        dataObj
      );

      if (targetResponse.length > 0) {
        res.send(200, targetResponse);
      } else {
        res.send(204, "error in fetching data");
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, "some error occured");
    }
  }
}
