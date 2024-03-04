import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js';
import { test,register, update, deleteC, search, get } from './category.controller.js';

const api = express.Router();

api.get('/test',[validateJwt], test)
api.post('/register', [validateJwt], register)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteC)
api.post('/search', [validateJwt], search)
api.get('/get', [validateJwt], get)

export default api