const axios = require("axios");

class PaymentService {
    async createPayment(req, res) {
        const url = "https://api.mercadopago.com/checkout/preferences";
        console.log("lo que llega por req", req.body.items)

        const body = {
            // payer: {
            //     email: "test_user_70262691@testuser.com"
            // },
            items: req.body.items,
            back_urls: {
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending",
                success: "http://localhost:3000/success"
                // failure: "https://bookitech-olive.vercel.app/failure",
                // pending: "https://bookitech-olive.vercel.app/pending",
                // success: "https://bookitech-olive.vercel.app/success"
            },
            auto_return: "approved"
        };
        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                Authorization: `Bearer APP_USR-3096624136492303-081117-58ae3aa07ef218ba8fb24ab60f827c52-1177841588`
            }
        });

        return payment.data;
    }
}

module.exports = PaymentService;
