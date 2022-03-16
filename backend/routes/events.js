const { Router } = require("express");

const router = Router();
const { check } = require("express-validator");

const { validateToken } = require("../middlewares/validateToken");
const { validateFields } = require("../middlewares/validateFields");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

router.use(validateToken); // aplica el middleware a todas las rutas que estan por debajo de esta instruccion

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
