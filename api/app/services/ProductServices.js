import ProductRepository from "../repository/ProductRepository";
import BookingProductRepository from "../repository/BookingProductRepository";
import DraftProductRepository from "../repository/DraftProductRepository";
// import { rolesDTO } from "../DTO/rbacDTO";

class ProductServices {
  constructor(db) {
    this.database = db;
    this.productRepository = new ProductRepository(db.items);
    this.bookingProductRepository = new BookingProductRepository(
      db.bookingItems
    );
    this.draftProductRepository = new DraftProductRepository(db.draftItems);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getOrdererdDateProducts = this.getOrdererdDateProducts.bind(this);
    this.deleteDraftOrderedProducts = this.deleteDraftOrderedProducts.bind(
      this
    );
  }

  async getAllProducts() {
    return await this.productRepository.getAllProducts(
      this.database.categories
    );
  }

  async getProductQuantity(productIds) {
    return await this.productRepository.getProductQuantity(productIds);
  }

  async getProduct(productId) {
    return await this.productRepository.getProducts(productId);
  }

  async createProduct(name) {
    return await this.productRepository.createProduct(name);
  }

  async createBulkProducts(names) {
    return await this.productRepository.createBulkProducts(names);
  }

  async deleteProduct(productId) {
    return await this.productRepository.deleteProduct(productId);
  }

  ///////////////////////////////////////////////////////////
  ////////////// Ordered Products Section ///////////////////
  ///////////////////////////////////////////////////////////

  async deleteOrderedProducts(orderId) {
    return await this.bookingProductRepository.deleteOrderedProducts(orderId);
  }

  async getAllOrderedProducts() {
    return await this.bookingProductRepository.getAllOrdererdProducts(
      this.database.categories,
      this.database.items
    );
  }

  async getOrderedProductsByOrderId(orderId) {
    return await this.bookingProductRepository.getOrderedProductsByOrderId(
      orderId,
      this.database.items
    );
  }

  async getOrdererdDateProducts(productIds, startDate, endDate) {
    return await this.bookingProductRepository.getBookingProducts(
      productIds,
      startDate,
      endDate
    );
  }

  async createOrdererdDateBulkProducts(params) {
    return await this.bookingProductRepository.createBulkProducts(params);
  }

  ///////////////////////////////////////////////////////////
  ////////////// Draft Products Section ///////////////////
  ///////////////////////////////////////////////////////////

  async createOrdererdDateBulkDraftProducts(params) {
    return await this.draftProductRepository.createBulkProducts(params);
  }

  async deleteDraftOrderedProducts(draftId) {
    return await this.draftProductRepository.deleteOrderedProducts(draftId);
  }

  async getOrderedProductsByDraftId(draftId) {
    return await this.draftProductRepository.getOrderedProductsByDraftId(
      draftId
    );
  }
}

export default ProductServices;
