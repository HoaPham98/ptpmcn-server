const PreparingDish = require("../models/preparingDish.model");
const Dish = require("../models/dish.model");

async function addNewOrder(idBill, order) {
    let newPreparingList = [];
    // Danh sach cac mon an trong order dang can phai them
    let dishesInNewOrder = order.dishes.map(item => {
        return {
            "idDish": item.dish,
            "quantity": item.quantity
        }
    });

    // Danh sach cac id cua cac mon an trong order dang can phai them
    let idDishesInNewOrder = dishesInNewOrder.map(item => item.idDish);

    // Danh sach cac mon an dang trong man hinh nha bep co id trong order
    let preparingDishes = await PreparingDish.find({
        "dish": {
            $in: idDishesInNewOrder
        }
    }).populate("dish", "availableTime", "Dish");

    // danh sach id cac mon co the them vao ngay duoc
    let idDishesCanBeInstanlyAdded = preparingDishes.filter(item => (item.status === "pending" || Date.now() - item.startAt < item.dish.availableTime)).map(item => item.dish._id);

    // danh sach cac mon co the them vao ngay duoc
    let listDishesCanBeInstanlyAdded = preparingDishes.filter(item => {
        let index = idDishesCanBeInstanlyAdded.findIndex(temp => temp.toString() == item.dish._id.toString());
        if (index === -1)
            return false;
        return true;
    });

    // them cac mon vao ngay duoc
    for (let i = 0; i < listDishesCanBeInstanlyAdded.length; i++) {

        let addedDish = dishesInNewOrder.find(item => item.idDish.toString() === listDishesCanBeInstanlyAdded[i].dish._id.toString());

        listDishesCanBeInstanlyAdded[i].quantity += addedDish.quantity;
        if (!listDishesCanBeInstanlyAdded[i].bills.includes(idBill))
            listDishesCanBeInstanlyAdded[i].bills.push(idBill);

        await listDishesCanBeInstanlyAdded[i].save();
        newPreparingList.push(listDishesCanBeInstanlyAdded[i]);
    }

    // danh sach cac mon can them moi
    let newPerparingDishes = dishesInNewOrder.filter(item => {
        let index = idDishesCanBeInstanlyAdded.findIndex(temp => temp.toString() == item.idDish.toString());
        if (index === -1)
            return true;
        return false;
    });

    // tao cac mon moi trong preparing dish
    for (let i = 0; i < newPerparingDishes.length; i++) {
        let temp = await createPreparingDish({
            "dish": newPerparingDishes[i].idDish,
            "quantity": newPerparingDishes[i].quantity,
            "bills": [idBill],
            "status": "pending"
        });
        newPreparingList.push(temp);
    }
    return newPreparingList;
}


async function createPreparingDish(preparingDishInfo) {
    const dish = await PreparingDish.create({
        ...preparingDishInfo
    });
    return dish;
}

async function startPreparingDish(idPreparingDish) {
    const dish = await PreparingDish.find({ "_id": idPreparingDish });

    dish.startAt = Date.now();
    dish.status = "preparing";
    await dish.save();
    return dish;
}

async function finishPreparingDish(idPreparingDish) {
    const dish = await PreparingDish.find({ "_id": idPreparingDish });

    dish.status = "finished";
    await dish.save();
    return dish;
}

module.exports = {
    addNewOrder,
    startPreparingDish,
    finishPreparingDish
}