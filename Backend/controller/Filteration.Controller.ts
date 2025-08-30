import { PaperModel } from "../schema/Paper.Schema";
import { Request, Response } from "express";
// This function retrieves papers from the database based on the provided semester and branch
export const filterPaper = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { sem, branch } = req.query;
    // Validate required fields
    if (!sem || !branch) {
      return res
        .status(400)
        .json({ message: "Please provide both semester and branch" });
    }
    // Find all papers that match semester and branch
    const papersFiltered = await PaperModel.find({ sem, branch }).select(
      "sem title fileurl branch"
    );
    // Handle case when no papers found
    if (papersFiltered.length === 0) {
      return res
        .status(404)
        .json({ message: "No papers found in the database" });
    }

    // Return the found papers
    return res.status(200).json({ papers: papersFiltered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Function to get filtered papers based on semester and branch
// 👉 Get unique branches and semesters
export const DropdownPaperFilters = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const branches = await PaperModel.distinct("branch");
    const semesters = await PaperModel.distinct("sem");
    return res.status(200).json({ branches, semesters });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch filters" });
  }
};

// get showcase all the papers
export const getAllPapers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const papers = await PaperModel.find();
    // Check if any papers were found
    if (papers.length === 0) {
      return res.status(404).json({ message: "No papers found" });
    }
    // Return the papers
    return res.status(200).json({ papers: papers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
