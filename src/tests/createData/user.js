const User = require("../../models/User")

const user = async()=>{

    const userCreate = {
        firstName: "Santiago",
        lastName: "Loaiza",
        email: "sle.0394@hotmail.com",
        password: "12345678",
       phone: "12345678"
    }

    await User.create(userCreate)
}

module.exports = user