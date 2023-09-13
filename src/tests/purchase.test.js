const supertest = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
require("../models")

const BASE_URL = "/api/v1/purchase"
const BASE_URL_USERS = "/api/v1/users/login"
let TOKEN
let userId
let product

beforeAll(async () => {

    const user = {
        email: "sle.0394@hotmail.com",
        password: "12345678"
    }

    const res = await supertest(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id
})



test("POST -> 'BASE_URL', should return status code 201 and res.body.quantity = cartBody.quantity", async () => {

    const productBody = {
        title: "Yamaha R1",
        description: "The most top ",
        price: "99.99",
    }

     product = await Product.create(productBody)

    const cartBody = {
        quantity: 1,
        userId,
        productId: product.id
    }

    await Cart.create(cartBody)


    const res = await supertest(app)
        .post(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(201)
    expect(res.body[0].quantity).toBe(cartBody.quantity)
})


test("GET -> 'BASE_URL' should return status code 00 and res.body.length === 1", async () => {

    const res = await supertest(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)

expect(res.status).toBe(200)
expect(res.body).toHaveLength(1)

await product.destroy()
})