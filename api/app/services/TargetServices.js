import TargetRepository from "../repository/TargetRepository";
// import { rolesDTO } from "../DTO/rbacDTO";

class TargetServices {
  constructor(db) {
    this.database = db;
    this.targetRepository = new TargetRepository(db.targets);
  }

  async deleteTarget(targetId) {
    return await this.targetRepository.deleteTarget(targetId);
  }

  async getAllTarget(year) {
    return await this.targetRepository.getAllTarget(year);
  }

  async getTarget(customerId) {
    return await this.targetRepository.getTarget(customerId);
  }

  async createTarget(data) {
    return await this.targetRepository.createTarget(data);
  }

  async createBulkTarget(data) {
    return await this.targetRepository.createBulkTarget(data);
  }
}

export default TargetServices;
