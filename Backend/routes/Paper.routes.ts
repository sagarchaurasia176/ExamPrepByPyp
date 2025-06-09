import express from 'express';
import {filterPaper, getAllPapers, DropdownPaperFilters } from '../controller/Filteration.Controller';
import { DropboxMiddleware } from '../middlewares/DropBoxServer.middleware';
import { upload } from '../utils/DropboxWithMulterConfig';
// import { uploadPaperViaForm } from '../controller/PaperUploaderViaForm.Controller';
import { uploadPaper } from '../controller/PaperUploaderViaForm.Controller';
import { DropboxAccessTokenHandler } from '../controller/DropboxAccessTokenHandler.Controller';

// Route to upload a paper
export const paper = express.Router();
//Dropdown filters for paper - routes
paper.post('/upload', DropboxMiddleware,uploadPaper);
//get all papers
paper.get('/view',getAllPapers);
//filterate all papers
paper.get('/filter',filterPaper) // Filter papers based on semester and branch
// Route to get all papers
paper.get('/paper-filters', DropdownPaperFilters);

// Route to check the dropbox connection
paper.get('/oauth2/callback' , DropboxAccessTokenHandler)





