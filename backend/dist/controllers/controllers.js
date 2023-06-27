"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const _ = require('lodash');
const DATABASE = './src/db/db.json';
function readTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fs_1.promises.readFile(DATABASE);
        const parse_data = JSON.parse(data.toString());
        return parse_data;
    });
}
function writeTasks(data) {
    return __awaiter(this, void 0, void 0, function* () {
        fs_1.promises.writeFile(DATABASE, JSON.stringify(data));
    });
}
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield readTasks();
        let { tasks } = data;
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(404).json(err);
    }
});
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo } = req.body;
    try {
        let data = yield readTasks();
        let { tasks } = data;
        let item = {
            id: (0, uuid_1.v4)(),
            todo: todo
        };
        tasks.push(item);
        const find_list = tasks.find((i) => i.id === item.id);
        yield writeTasks(data);
        res.status(200).json(find_list);
    }
    catch (err) {
        res.status(404).json(err);
    }
});
const updateTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { todo } = req.body;
    try {
        let data = yield readTasks();
        let { tasks } = data;
        tasks = tasks.map((item) => (item.id === id ? { id, todo } : item));
        data.tasks = tasks;
        yield writeTasks(data);
        res.status(202).json({ id, todo });
    }
    catch (err) {
        res.status(404).json(err);
    }
});
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const arr_id = id.split(',');
    try {
        let data = yield readTasks();
        let { tasks } = data;
        let i = 0;
        for (i; i < arr_id.length; i++) {
            tasks = tasks.filter((item) => item.id !== arr_id[i]);
        }
        data.tasks = tasks;
        yield writeTasks(data);
        res.status(202).json(arr_id);
    }
    catch (error) {
        res.status(404).json(error);
        console.log(error);
    }
});
module.exports = {
    getTasks,
    createTodo,
    updateTasks,
    deleteTodo
};
