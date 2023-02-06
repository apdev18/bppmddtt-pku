const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { isAdmin } = require("../../auth/admin_validation");

const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("./kategori.controller");

router.get("/", checkToken, isAdmin, getCategories);
router.post("/create", checkToken, isAdmin, createCategory);
router.patch("/", checkToken, isAdmin, updateCategory);
router.delete("/", checkToken, isAdmin, deleteCategory);

module.exports = router;