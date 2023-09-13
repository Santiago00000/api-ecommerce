const supertest = require("supertest")
const app = require("../app")

const BASE_URL = "/api/v1/users"
let TOKEN
let userId

beforeAll(async () => {
    const user = {
        email: "sle.0394@hotmail.com",
        password: "12345678"
    }

    const res = await supertest(app)
        .post(`${BASE_URL}/login`)
        .send(user)

    TOKEN = res.body.token
})

test("GET -> 'BASE_URL' , should return status code 200 and res.body to have length = 1", async () => {

    const res = await await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)
   
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("POST-> 'BASE_URL' , should return status code 201 and res.body.firstName = userCreate.firstName", async () => {

    const userCreate = {
        firstName: "Martin",
        lastName: "Rendon",
        email: "martin@gmail.com",
        password: "1234",
        phone: "123456789",
    }

    const res = await supertest(app)
        .post(BASE_URL)
        .send(userCreate)

    userId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(userCreate.firstName)
})


test("PUT-> 'BASE_URL/:id' , should return status code 200 and res.body.firstName = userUpdate.firstName", async () => {

    const userUpdate = {
        firstName: "Martin",
    }

    const res = await supertest(app)
        .put(`${BASE_URL}/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(userUpdate.firstName)
})

// Test login successful
test("POST-> 'BASE_URL/login' , should return status code 200 and res.body.user.email = userLogin.email and token", async () => {

    const userLogin = {
        email: "martin@gmail.com",
        password: "1234",
    }

    const res = await supertest(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)

    
    expect(res.status).toBe(200)
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
})


// Test login unSuccessful
test("POST-> 'BASE_URL/login' , should return status code 401", async () => {

    const userLogin = {
        email: "martin@gmail.com",
        password: "invalid password",
    }

    const res = await supertest(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)

    
    expect(res.status).toBe(401)
})

test("DELETE-> 'BASE_URL/:id' , should return status code 204 ", async () => {


    const res = await supertest(app)
        .delete(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

})

