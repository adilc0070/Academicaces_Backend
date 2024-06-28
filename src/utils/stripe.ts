import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET as string)

export const buyCourse = async (image:string, price:number, hash:string, courseId:string) => {
    return await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {

                price_data: {
                    currency:'inr',
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
    })  
}