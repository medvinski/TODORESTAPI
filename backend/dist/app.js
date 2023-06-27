"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasks = require('./routes/routes');
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/tasks', tasks);
const start = () => {
    try {
        app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
};
start();
