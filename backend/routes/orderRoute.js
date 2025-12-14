import express from 'express';
import {placeOrder, verify_Stripe, verifyRazorpay, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus} from '../controllers/ordercontroller.js';
import authadmin from '../middleware/adminauth.js';
import authUser from '../middleware/auth.js';
const orderRouter = express.Router();

orderRouter.post('/placeorder',authUser, placeOrder);
orderRouter.get('/allorders', authadmin,allOrders);
orderRouter.post('/placeorderstripe', authUser, placeOrderStripe);
orderRouter.post('/placeorderrazorpay', authUser, placeOrderRazorpay);
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/updateorderstatus', authadmin, updateOrderStatus);
orderRouter.post('/verifystripe',authUser,verify_Stripe)
orderRouter.post('/verifyrazorpay',authUser,verifyRazorpay)
export default orderRouter;

