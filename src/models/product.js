/*"title": "Lentejas",
        "description": "Sanas",
        "price": 1500,
        "stock": 25,
        "code": "L123",
        "thumbnail": [],
        "id": "1747ea8e4b47e46934ba",
        "img": "https://i.ibb.co/ZWs8k22/lentejas300.png"
*/


import { Schema, model } from "mongoose";

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        default: []
    }
})

const productModel = model("products", productSchema)

export default productModel