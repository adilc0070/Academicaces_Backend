"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyCourse = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET);
const buyCourse = (image, price, hash, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: "Course",
                        images: [image]
                    },
                    unit_amount: price * 100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `http://localhost:5173/success?course=${courseId}&courseId=${hash}`,
        cancel_url: "http://localhost:5173/cancel",
    });
});
exports.buyCourse = buyCourse;
