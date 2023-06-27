import  {Router } from 'express';
const router = Router();
const { getTasks, createTodo, updateTasks, deleteTodo} = require('../controllers/controllers');

router.route('/').get(getTasks).post(createTodo);
router.route('/:id').patch(updateTasks).delete(deleteTodo);

module.exports = router;