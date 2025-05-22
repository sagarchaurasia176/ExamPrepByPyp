import { PaperModel } from "../schema/Paper.Schema";
import { Request, Response } from "express";
import { paper } from '../routes/Paper.routes';


// Function to post the paper 
export const uploadPaper = async (req: Request, res: Response):Promise<any> => { 
    try{
        const {title, sem, year, subject, fileurl} = req.body;
        // Check if all required fields are provided
        if(!title || !sem || !year || !subject || !fileurl){
            return res.status(400).json({ message: "Please provide all the required fields" });
        }
        // Create a new paper object
        const paperUploadToDatabase  = await PaperModel.create({
            title,
            sem,
            year,
            subject,
            fileurl
        })
        // Save the paper to the database
        await paperUploadToDatabase.save();
        // Return the saved paper
        return res.status(201).json({ paper: paperUploadToDatabase });
        // Handle any errors that occur during the process
    }catch(er){
        console.log(er);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// get showcase all the papers
export const getAllPapers = async (req: Request, res: Response):Promise<any> => {   
    try{
        const papers = await PaperModel.find();
        // Check if any papers were found
        if(papers.length === 0){
            return res.status(404).json({ message: "No papers found" });
        }
        // Return the papers
        return res.status(200).json({ papers: papers });
    
    }catch(err){    
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}





// Function to filter papers based on the provided query parameters
export const filterPaper = async (req: Request, res: Response):Promise<any> => {
    try{
        const{sem,year,subject} = req.query;
        // Check if all required query parameters are provided
        if(!sem || !year || !subject){
            return res.status(400).json({ message: "Please provide all the required fields" });
        }
        // Find papers that match the provided query parameters
        const papersFiltered = await PaperModel.find({
            sem: sem,   
            year: year,
            subject: subject
        });
        // Check if any papers were found
        if(papersFiltered.length === 0){
            return res.status(404).json({ message: "No papers found" });
        }
        // Return the filtered papers
        return res.status(200).json({ papers: papersFiltered });
        // Handle any errors that occur during the process
        
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }   
}








