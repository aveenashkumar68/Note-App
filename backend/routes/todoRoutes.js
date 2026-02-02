import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/todoController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createTodo)
  .get(protect, getTodos);

router.route("/:id")
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

export default router;
