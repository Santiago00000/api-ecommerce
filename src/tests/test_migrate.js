require ("../models")
require('../models/Category');
const sequelize = require('../utils/connection');
const user = require('./createData/user');


// importar index models y modelos sin relaciones
// require("../models")


const main = async() => {
 try{
await sequelize.sync({ force: true });

await user()

console.log("Me ejecute")

  process.exit();
 } catch(error){
       console.log(error);
 }
}
main();