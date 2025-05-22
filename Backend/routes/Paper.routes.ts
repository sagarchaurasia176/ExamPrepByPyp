import express from 'express';
import { uploadPaper, filterPaper, getAllPapers } from '../controller/Filteration.Controller';
export const paper = express.Router();

// Route to upload a paper
paper.post('/upload',uploadPaper);
//get all papers
paper.get('/view',getAllPapers);
//filterate all papers
paper.get('/filter',filterPaper)









