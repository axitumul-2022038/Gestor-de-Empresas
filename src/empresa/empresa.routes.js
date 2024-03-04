'use strict'

import { Router } from 'express'
import { register, update, get, getExperiences, getAFromZ, getZFromA, excelReport } from './empresa.controller.js';

const api = Router()

api.post('/create', register);
api.put('/update:id', update);
api.get('/getCompany', get);
api.get('/getExperiences', getExperiences);
api.get('/getAZ', getAFromZ);
api.get('/getZA', getZFromA);
api.get('/excelReport', excelReport)

export default api

