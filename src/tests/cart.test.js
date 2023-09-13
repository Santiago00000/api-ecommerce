const supertest = require("supertest")
const app = require('../app')
const Product = require("../models/Product")
require("../models")


const BASE_URL_USER = '/api/v1/users/login'
const BASE_URL = '/api/v1/cart'
let TOKEN
let userId
let product
let cartId


beforeAll(async () => {
    const user = {
        email: "sle.0394@hotmail.com",
        password: "12345678"
    }

    const res = await supertest(app)
        .post(BASE_URL_USER)
        .send(user)
        
    TOKEN = res.body.token
    userId = res.body.user.id
})


test("POST -> 'BASE_URL',should return status code 201 and res.body.quantity === body.quantity", async () => {

    const productBody = {
        title: "Yamaha R1",
        description: "The most top ",
        price: "99.99"
    }

    product = await Product.create(productBody)

    const cartBody = {
        quantity: 1,
        userId,
        productId: product.id
    }

    const res = await supertest(app)
        .post(BASE_URL)
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    cartId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(cartBody.quantity)
})


test("GET -> 'BASE_URL', sholud status code 200 and res.body.length === 1", async () => {
    const res = await supertest(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})


test("PUT -> 'BASE_URL/:id',should return status code 200 and res.body.quantity === cartBody.quantity", async () => {
  
    const cartBody = {
        quantity: 2
    }
    const res = await supertest(app)
        .put(`${BASE_URL}/${cartId}`)
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(cartBody.quantity)
})


test("DELETE -> 'BASE_URL/:id',should return status code 204", async () => {
    const res = await supertest(app)
        .delete(`${BASE_URL}/${cartId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

    await product.destroy()
})