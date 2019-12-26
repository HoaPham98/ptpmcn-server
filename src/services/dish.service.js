const mongoose = require('mongoose')
const Dish = mongoose.model('Dish')

async function getDishes() {
    const dishes = await Dish.find()
 
    return dishes
}

module.exports = {
    getDishes
}
