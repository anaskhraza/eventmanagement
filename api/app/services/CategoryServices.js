import CategoryRepository from "../repository/CategoryRepository";
// import { rolesDTO } from "../DTO/rbacDTO";

class CategoryServices {
  constructor(db) {
    this.database = db;
    this.categoryRepository = new CategoryRepository(db.categories);
  }

  async deleteCategory(categoryId) {
    return await this.categoryRepository.deleteCategory(categoryId);
  }

  async getAllCategory() {
    return await this.categoryRepository.getAllCategory();
  }

  async getCategory(customerId) {
    return await this.categoryRepository.getCategory(customerId);
  }

  async createCategory(data) {
    return await this.categoryRepository.createCategory(data);
  }

  async createBulkCategory(data) {
    return await this.categoryRepository.createBulkCategory(data);
  }
}

export default CategoryServices;
