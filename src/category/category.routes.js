import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js';
import { register, update, deleteC, search, get } from './category.controller.js';

const api = express.Router();

api.post('/register', [validateJwt], register)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteC)
api.post('/search', search)
api.get('/get', get)

export default api