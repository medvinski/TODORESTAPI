"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { getTasks, createTodo, updateTasks, deleteTodo } = require('../controllers/controllers');
router.route('/').get(getTasks).post(createTodo);
router.route('/:id').patch(updateTasks).delete(deleteTodo);
module.exports = router;
