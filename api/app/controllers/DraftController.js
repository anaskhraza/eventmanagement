import _ from "lodash";
import db from "../models";
import DraftServices from "../services/DraftServices";
import moment from "moment";
export default class OrderController {
  constructor() {
    this.db = db;
    this.draftServices = new DraftServices(this.db);

    this.fetchAllDrafts = this.fetchAllDrafts.bind(this);
    this.createDraft = this.createDraft.bind(this);
    this.deleteDraft = this.deleteDraft.bind(this);
  }

  async fetchAllDrafts(req, res) {
    try {
      const response = await this.draftServices.getAllDrafts();

      if (response) {
        const responseArray = _.map(response, obj => {
          return {
            ...obj,
            draft_no: "DRT-1000" + obj.id
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

  async createDraft(req, res) {
    try {
      const dataObj = req.body;
      const orderResp = await this.draftServices.createDraft(dataObj);

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

  async deleteDraft(req, res) {
    try {
      var draftId = req.query.draftId;
      //console.log("order ID -> ", draftId);

      const response = await this.draftServices.deleteDraft(draftId);
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
}
