var express = require("express");
var router = express.Router();
const torneoController = require("../controllers/torneos.controller");
const passport = require("passport");
router.get("/", torneoController.findAll);
router.get("/home", torneoController.find3);
router.get("/count", torneoController.tamano);
router.post(
    "/",
    passport.authenticate("jwt-admin-body", { session: false }),
    torneoController.create
);
router.get(
    "/:id/validar",
    passport.authenticate("jwt", { session: false }),
    torneoController.findParticipante
);
router.put(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    torneoController.actualizarTorneo
);
router.put("/:id", torneoController.updateParticipante);
router.get("/:id", torneoController.findId);
router.delete(
    "/participante/:id",
    passport.authenticate("jwt-admin", { session: false }),
    torneoController.deleteParticipante
);
router.delete(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    torneoController.deleteID
);
module.exports = router;
