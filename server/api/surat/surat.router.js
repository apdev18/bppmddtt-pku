const router = require("express").Router()
const { checkToken } = require("../../auth/token_validation")
const { isAdmin } = require("../../auth/admin_validation")

const {
    getLetters,
    createLetters,
    updateLetters,
    deleteLetters,
    createReply,
    getReplyByLetterId,
    getLettersByStatus,
    getLettersByDepartment,
    getLettersByPriority,
    getLettersById,
    getSummaryByMonth,
    getSummaryByDay,
    getLettersByStatusForDep,
    getLettersByPriorityForDep
} = require("./surat.controller")

router.get("/", checkToken, getLetters);
router.get("/month-summary", checkToken, isAdmin, getSummaryByMonth)
router.get("/day-summary", checkToken, isAdmin, getSummaryByDay)
router.get("/:id", checkToken, getLettersById)
router.post("/create", checkToken, isAdmin, createLetters)
router.patch("/", checkToken, isAdmin, updateLetters)
router.delete("/", checkToken, isAdmin, deleteLetters)
router.get("/bystatus/:status", checkToken, getLettersByStatus)
router.get("/bydepartment/:department", checkToken, getLettersByDepartment)
router.get("/bypriority/:priority", checkToken, isAdmin, getLettersByPriority)
router.get("/bydepstatus/:status/:department", checkToken, getLettersByStatusForDep,)
router.get("/bydeppriority/:priority/:department", checkToken, getLettersByPriorityForDep)

router.post("/reply/create", checkToken, createReply)
router.get("/reply/:id", checkToken, getReplyByLetterId)

module.exports = router
