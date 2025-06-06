import express from 'express';
import { StudentQueryResolver } from '../controller/Chatbot.Controller';
export const botRouter = express.Router(); 
// Route to handle student queries
botRouter.post('/student-query', StudentQueryResolver);



