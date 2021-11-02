import DraftRepository from "../repository/DraftRepository";
// import { rolesDTO } from "../DTO/rbacDTO";

class DraftServices {
  constructor(db) {
    this.database = db;
    this.draftRepository = new DraftRepository(db.DraftBookings);
  }

  async getAllDrafts() {
    return await this.draftRepository.getAllDrafts(this.database.customers);
  }

  async getDrafts(orderIds) {
    return await this.draftRepository.getDrafts(orderIds);
  }

  async createDraft(name) {
    return await this.draftRepository.createDraft(name);
  }

  async deleteDraft(orderId) {
    return await this.draftRepository.deleteDraft(orderId);
  }
  
}

export default DraftServices;
