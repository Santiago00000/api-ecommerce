const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require ("bcrypt")

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

// Eliminar propiedades desde el modelo 
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;  // eliminar desde el modelo delete values.<propiedad a eliminar>
    return values;
}

// Encriptacion password desde el modelo, se ejecuta antes de crear 
User.beforeCreate(async(user)=>{

    const hashPassword = await bcrypt.hash(user.password, 10)
    user.password = hashPassword
})

module.exports = User;