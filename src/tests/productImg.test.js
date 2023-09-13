const supertest = require("supertest")
const app = require("../app")
const path = require("path")


const BASE_URL_USER = "/api/v1/users/login"
const BASE_URL_PRODUCT_IMG = "/api/v1/product_images"
let TOKEN
let productImgId

beforeAll(async () => {
    const user = {
        email: "sle.0394@hotmail.com",
        password: "12345678",
    }

    const res = await supertest(app)
        .post(BASE_URL_USER)
        .send(user)

    TOKEN = res.body.token
})


test ("POST -> 'BASE_URL_PRODUCT_IMG' , should return status code 201 and res.body.url to be defined and res.body.filename to be defined" , async () => {

const imagePath = path.join(__dirname, "..", "public", "BMW_M1000RR.jpg")

    const res = await supertest(app)
    .post(BASE_URL_PRODUCT_IMG)
    .set('Authorization', `Bearer ${TOKEN}`)
    .attach('image', imagePath)

    productImgId = res.body.id
console.log(imagePath)
    expect(res.status).toBe(201)
    expect(res.body.url).toBeDefined()
    expect(res.body.filename).toBeDefined()


})

test("GET -> 'BASE_URL_PRODUCT_IMG', sholud status code 200 and res.body.length === 1", async()=>{

    const res = await supertest(app)
        .get(BASE_URL_PRODUCT_IMG)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

})

test("DELETE -> 'BASE_URL_PRODUCT_IMG/:productImgId', should return status code 204",async()=>{
   
    const res = await supertest(app)
        .delete(`${BASE_URL_PRODUCT_IMG}/${productImgId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
    
})