const router = require("express").Router();
const getTotalUsers = require("../../controllers/admin/getTotalUsers");
const isAdmin = require("../../middlewares/isAdmin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const getTotalSales = require("../../controllers/admin/getTotalSales");
const getsalesByDay = require("../../controllers/admin/getSalesByDay");

// utilisateur doit etre authetifier et admin pour avoir acces a ces données (dans ordre isauth->isadmin)
router.get("/total-users", isAuthenticated, isAdmin  , getTotalUsers.getTotalUsers);

router.get("/total-sales", isAuthenticated, isAdmin, getTotalSales.getTotalSales);

router.get("/sales-by-day", isAuthenticated, isAdmin, getsalesByDay.getSalesByDay);

module.exports = router;
