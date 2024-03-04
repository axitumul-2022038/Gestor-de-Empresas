'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js';
import { test,register, update, get, getExperiences, getAFromZ, getZFromA, excelReport, deleteE, getCategory } from './empresa.controller.js';

const api = Router()

api.get('/test',[validateJwt], test)
api.post('/register',[validateJwt], register);
api.put('/update/:id',[validateJwt], update);
api.get('/getCompany',[validateJwt], get);
api.get('/getExperiences',[validateJwt], getExperiences);
api.get('/getAZ',[validateJwt], getAFromZ);
api.get('/getZA',[validateJwt], getZFromA);
api.get('/excelReport',[validateJwt], excelReport)
api.delete('/delete/:id', [validateJwt], deleteE)
api.get('/getCategory',[validateJwt], getCategory);

export default api

