import express from 'express';
import { uploadPaper, filterPaper, getAllPapers, DropdownPaperFilters } from '../controller/Filteration.Controller';
export const paper = express.Router();

// Route to upload a paper
paper.post('/upload',uploadPaper);
//get all papers
paper.get('/view',getAllPapers);
//filterate all papers
paper.get('/filter',filterPaper) // Filter papers based on semester and branch
// Route to get all papers
paper.get('/paper-filters', DropdownPaperFilters);









