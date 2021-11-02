import { Repository } from "./repository";
import Sequelize from "sequelize";
import moment from "moment";

class DraftRepository extends Repository {
  constructor(drafts) {
    super(drafts);
  }

  async getAllDrafts(customers) {
    try {
      const include = [{ model: customers, as: "draft_customer" }];
      return await this.findAllRecords(null, null, include);
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async getDrafts(draftId) {
    try {
      return await this.findAllRecords({
        id: {
          [Sequelize.Op.eq]: draftId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async updateDraft(draftId, data) {
    try {
      console.log("deleteDraftedProducts ID DATA -> ", data);
      return await this.updateRecord(
        {
          id: {
            [Sequelize.Op.eq]: draftId
          }
        },
        data
      );
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async deleteDraft(draftId) {
    try {
      //console.log("deleteDraftedProducts ID -> ", draftId);
      return await this.deleteRecord({
        id: {
          [Sequelize.Op.eq]: draftId
        }
      });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }

  async createDraft(data) {
    try {
      return await this.createOrUpdate(data, { returning: true });
    } catch (error) {
      //console.log("catch ex", error);
      throw error;
    }
  }
}

export default DraftRepository;
