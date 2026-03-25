const router = require("express").Router();
const createAddress = require("../../controllers/address/createAddress");
const getAddresses = require("../../controllers/address/getUserAddresses");
const updateAddress = require("../../controllers/address/updateAddress");
const deleteAddress = require("../../controllers/address/deleteAddress");
const isAuthenticated = require("../../middlewares/isAuthenticated");

router.post("/", isAuthenticated, createAddress.createAddress);

router.get("/", isAuthenticated, getAddresses.getAddresses);

router.put("/:id", isAuthenticated, updateAddress.updateAddress);

router.delete("/:id", isAuthenticated, deleteAddress.deleteAddress);

module.exports = router;