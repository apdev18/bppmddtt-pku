const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { isAdmin } = require("../../auth/admin_validation");

const {
    getDepartments,
    createDepartments,
    updateDepartments,
    deleteDepartments,
} = require("./departemen.controller");

router.get("/", checkToken, isAdmin, getDepartments);
router.post("/create", checkToken, isAdmin, createDepartments);
router.patch("/", checkToken, isAdmin, updateDepartments);
router.delete("/", checkToken, isAdmin, deleteDepartments);

module.exports = router;