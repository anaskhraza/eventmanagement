import _ from 'lodash';
import db from '../models';
import ProductServices from '../services/ProductServices';
import moment from 'moment';
export default class ProductController {
  constructor() {
    this.db = db;
    this.productServices = new ProductServices(this.db);
    this.fetchAllProducts = this.fetchAllProducts.bind(this);
    this.fetchProduct = this.fetchProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.createBulkProducts = this.createBulkProducts.bind(this);

    ////////////// Ordered Products Section ///////////////////
    this.fetchProductsForOrders = this.fetchProductsForOrders.bind(this);
    this.createBookingProducts = this.createBookingProducts.bind(this);
    this.fetchOrderedProductByOrderId = this.fetchOrderedProductByOrderId.bind(
      this
    );
    this.deleteBookingProducts = this.deleteBookingProducts.bind(this);

    ////////////// Draft Products Section ///////////////////

    this.createDraftBookingProducts = this.createDraftBookingProducts.bind(
      this
    );
    this.fetchOrderedProductByDraftId = this.fetchOrderedProductByDraftId.bind(
      this
    );
    this.deleteDraftBookingProducts = this.deleteDraftBookingProducts.bind(
      this
    );
  }

  _dataObjectForProducts(data, dateObj) {
    let dataResp = [];
    if (!_.isEmpty(dateObj)) {
      const eDate = moment(dateObj.endDate);
      const sDate = moment(dateObj.startDate);

      var diffDays = eDate.diff(sDate, 'days');
      if (diffDays == 0) {
        diffDays = 1;
      }
      const eventDate = `${dateObj.startDate} ${dateObj.endDate}`;
      dataResp = _.map(data, obj => {
        return {
          ...obj,
          quantity_ordered: 0,
          no_of_days: diffDays,
          price: 0,
          event_booking_start: dateObj.startDate,
          event_booking_end: dateObj.endDate,
          eventDate: eventDate
        };
      });
    } else {
      dataResp = data;
    }

    return dataResp;
  }

  async fetchAllProducts(req, res) {
    try {
      const dateObj = req.body;

      //console.log("dateObj -> ", dateObj);
      const response = await this.productServices.getAllProducts();
      if (response && response.length > 0) {
        const finalResp = this._dataObjectForProducts(response, dateObj);
        res.send(200, finalResp);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      //console.log("error -> ", ex);
      res.send(400, 'some error occured');
    }
  }

  async fetchProduct(req, res) {
    try {
      var productId = req.params.id;
      const response = await this.productServices.getProduct(productId);

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      res.send(400, 'some error occured');
    }
  }

  async createProduct(req, res) {
    try {
      const dataObj = req.body;

      const productReponse = await this.productServices.createProduct(dataObj);

      if (productReponse) {
        res.send(200, productReponse);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      console.log('ex ', ex);

      res.send(400, 'some error occured');
    }
  }

  async deleteProduct(req, res) {
    try {
      var productId = req.query.productId;

      const response = await this.productServices.deleteProduct(productId);
      if (response) {
        res.send(200, response);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      //console.log("ex -> ", ex);
      res.send(400, 'some error occured');
    }
  }

  async createBulkProducts(req, res) {
    try {
      const dataObj = req.body;

      const productReponse = await this.productServices.createBulkProducts(
        dataObj
      );

      if (productReponse.length > 0) {
        res.send(200, productReponse);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, 'some error occured');
    }
  }

  ///////////////////////////////////////////////////////////
  ////////////// Ordered Products Section ///////////////////
  ///////////////////////////////////////////////////////////

  async fetchOrderedProductByOrderId(req, res) {
    try {
      var orderId = req.params.orderId;

      const response = await this.productServices.getOrderedProductsByOrderId(
        orderId
      );

      if (response) {
        const dataResp = _.map(response, obj => {
          const eDate = moment(obj.event_booking_start);
          const sDate = moment(obj.event_booking_end);

          var diffDays = eDate.diff(sDate, 'days');
          if (diffDays == 0) {
            diffDays = 1;
          }
          return {
            ...obj,
            name: obj.Product_Booking_Key.name,
            quantity_ordered: obj.order_quantity,
            no_of_days: diffDays,
            price: obj.Product_Booking_Key.rate,
            event_booking_start: obj.event_booking_start,
            event_booking_end: obj.event_booking_end
          };
        });
        res.send(200, dataResp);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      res.send(400, 'some error occured');
    }
  }

  async deleteBookingProducts(req, res) {
    //console.log("order ID -> ", "deleteBookingProducts");
    try {
      var orderId = req.query.orderId;
      //console.log("order ID -> ", orderId);
      // const orderResponse = await this.productServices.getOrderedProductsByOrderId(
      //   orderId
      // );

      // if (orderResponse.length > 0) {
      const response = await this.productServices.deleteOrderedProducts(
        orderId
      );
      if (response) {
        res.send(200, response);
      } else {
        res.send(204, 'error in fetching data');
      }
      // }
      // else {
      //   res.send(200, orderResponse);
      // }
    } catch (ex) {
      //console.log("ex -> ", ex);
      res.send(400, 'some error occured');
    }
  }

  _dataObjectForRequest(dataObj) {
    let allProductIds = [];
    const products = dataObj.selectedProducts;
    const modifiedProducts = dataObj.modifiedProducts;

    const modifiedProducts1 = _.groupBy(modifiedProducts, 'id');
    const keysModified = _.keys(modifiedProducts1);
    let startDate = '';
    let endDate = '';
    const productIds = _.compact(
      _.map(products, obj => {
        const productId = parseInt(obj.id, 10);
        allProductIds.push(productId);
        if (keysModified.indexOf(obj.id) == -1) {
          startDate = obj.event_booking_start;
          endDate = obj.event_booking_end;
          return productId;
        }
      })
    );

    const productObj = {
      productIds: productIds,
      startDate: startDate,
      endDate: endDate
    };

    return { productObj, modifiedProducts, allProductIds };
  }

  _dataObjectForResponse(
    allProductQuantity,
    modifiedProductOrdQuantity,
    selectedProductOrdQuantity,
    dataObj
  ) {
    let productResp = [];
    let modProdOrdQty,
      selectProdOrdQty = [];
    const products = dataObj.selectedProducts;

    const modProdQtyGroupBy = _.groupBy(
      modifiedProductOrdQuantity,
      'product_id'
    );
    const selectProdOrdQtyGroupBy = _.groupBy(
      selectedProductOrdQuantity,
      'product_id'
    );
    const allProductQtyGroupBy = _.groupBy(allProductQuantity, 'id');

    modProdOrdQty = _.keys(modProdQtyGroupBy);
    selectProdOrdQty = _.keys(selectProdOrdQtyGroupBy);

    productResp = _.map(products, obj => {
      const productId = obj.id.toString();

      if (modProdOrdQty.indexOf(productId) > -1) {
        const orderQuantity = modProdQtyGroupBy[productId][0].order_quantity;

        return {
          ...obj,
          quantity: parseInt(obj.quantity, 10) - parseInt(orderQuantity, 10)
        };
      } else if (selectProdOrdQty.indexOf(productId) > -1) {
        const orderQuantity =
          selectProdOrdQtyGroupBy[productId][0].order_quantity;
        return {
          ...obj,
          quantity: parseInt(obj.quantity, 10) - parseInt(orderQuantity, 10)
        };
      } else {
        return { ...obj, quantity: parseInt(obj.quantity, 10) };
      }
    });

    return productResp;
  }

  async fetchProductsForOrders(req, res) {
    try {
      const dataObj = req.body;

      let selectedProductQuantity = [];
      let modifiedProductQuantity = [];
      const {
        productObj,
        modifiedProducts,
        allProductIds
      } = this._dataObjectForRequest(dataObj);

      // //console.log("productObj -> ", productObj);
      // //console.log("modifiedProducts -> ", modifiedProducts);

      const allProductQuantity = await this.productServices.getProductQuantity(
        allProductIds
      );

      if (productObj.productIds.length > 0) {
        selectedProductQuantity = await this.productServices.getOrdererdDateProducts(
          productObj.productIds,
          productObj.startDate,
          productObj.endDate
        );
      }

      for (const obj of modifiedProducts) {
        const productResponse1 = await this.productServices.getOrdererdDateProducts(
          [obj.id],
          obj.event_booking_start,
          obj.event_booking_end
        );
        if (productResponse1.length > 0) {
          modifiedProductQuantity.push(productResponse1[0]);
        }
      }

      const productResp = this._dataObjectForResponse(
        allProductQuantity,
        modifiedProductQuantity,
        selectedProductQuantity,
        dataObj
      );

      if (productResp.length > 0) {
        res.send(200, productResp);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, 'some error occured');
    }
  }

  _bulkCreateDTORequest = dataObj => {
    let eventItemsArray = [];
    const customerId = dataObj.customerId;
    const orderId = dataObj.orderId;
    const eventItems = dataObj.eventItems;

    eventItemsArray = _.map(eventItems, obj => {
      return {
        customer_id: customerId,
        order_id: orderId,
        event_booking_start: obj.event_booking_start,
        event_booking_end: obj.event_booking_end,
        product_id: obj.id,
        sku: obj.sku,
        order_quantity: obj.quantity_ordered,
        order_item_price: obj.rate
      };
    });

    return eventItemsArray;
  };

  async createBookingProducts(req, res) {
    try {
      let dataObj = req.body;
      dataObj = this._bulkCreateDTORequest(dataObj);
      const bulkProducts = await this.productServices.createOrdererdDateBulkProducts(
        dataObj
      );

      if (bulkProducts.length > 0) {
        res.send(200, bulkProducts);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, 'some error occured');
    }
  }

  async createDraftBookingProducts(req, res) {
    try {
      let dataObj = req.body;
      dataObj = this._bulkCreateDTODraftRequest(dataObj);
      const bulkProducts = await this.productServices.createOrdererdDateBulkDraftProducts(
        dataObj
      );

      if (bulkProducts.length > 0) {
        res.send(200, bulkProducts);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      //console.log("ex ", ex);

      res.send(400, 'some error occured');
    }
  }

  async fetchOrderedProductByDraftId(req, res) {
    try {
      var draftId = req.params.draftId;

      const response = await this.productServices.getOrderedProductsByDraftId(
        draftId
      );

      if (response) {
        res.send(200, response);
      } else {
        res.send(204, 'error in fetching data');
      }
    } catch (ex) {
      res.send(400, 'some error occured');
    }
  }

  async deleteDraftBookingProducts(req, res) {
    //console.log("order ID -> ", "deleteDraftBookingProducts");
    try {
      var draftId = req.query.draftId;
      //console.log("order ID -> ", draftId);
      // const orderResponse = await this.productServices.getOrderedProductsByOrderId(
      //   draftId
      // );

      // if (orderResponse.length > 0) {
      const response = await this.productServices.deleteDraftOrderedProducts(
        draftId
      );
      if (response) {
        res.send(200, response);
      } else {
        res.send(204, 'error in fetching data');
      }
      // }
      // else {
      //   res.send(200, orderResponse);
      // }
    } catch (ex) {
      //console.log("ex -> ", ex);
      res.send(400, 'some error occured');
    }
  }

  _bulkCreateDTODraftRequest = dataObj => {
    let eventItemsArray = [];
    const customerId = dataObj.customerId;
    const draftId = dataObj.draftId;
    const eventItems = dataObj.eventItems;

    eventItemsArray = _.map(eventItems, obj => {
      return {
        customer_id: customerId,
        draft_id: draftId,
        event_booking_start: obj.event_booking_start,
        event_booking_end: obj.event_booking_end,
        product_id: obj.id,
        sku: obj.sku,
        order_quantity: obj.quantity_ordered,
        order_item_price: obj.rate
      };
    });

    return eventItemsArray;
  };
}
