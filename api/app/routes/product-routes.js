import express from 'express';
import path from "path"
import ProductController from '../controllers/ProductController';

const router = express.Router();
const productController = new ProductController();
// declare route
//console.log("here ", "here");
router.get('/', productController.fetchAllProducts);
router.post('/dates', productController.fetchAllProducts);
router.get('/id/:id', productController.fetchProduct);
router.post('/create', productController.createProduct);
router.delete('/delete', productController.deleteProduct);
router.post('/createBulkProducts', productController.createBulkProducts);

///////////////////////////////////////////////////////////
////////////// Ordered Products Section ///////////////////
///////////////////////////////////////////////////////////

router.get('/orders/:orderId', productController.fetchOrderedProductByOrderId)
router.post('/bookingProducts', productController.fetchProductsForOrders);
router.post('/createBookingProducts', productController.createBookingProducts);
router.delete('/deleteBookingProducts', productController.deleteBookingProducts);

///////////////////////////////////////////////////////////
////////////// Draft Products Section ///////////////////
///////////////////////////////////////////////////////////

router.get('/drafts/:draftId', productController.fetchOrderedProductByDraftId)
router.post('/createDraftProducts', productController.createDraftBookingProducts);
router.delete('/deleteDraftProducts', productController.deleteDraftBookingProducts);
module.exports = router;