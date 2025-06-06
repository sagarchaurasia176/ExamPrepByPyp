// src/hooks/index.js
import { useState, useEffect } from 'react';
import { fetchFilters, fetchPapersByFilter } from '../Apis/Filterations';
// src/hooks/useFilters.js

// Fixed version of your hook that handles string arrays
export const BranchAndSemDropdown = () => {
  const [data, setData] = useState({
    semesters: [],
    branches: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setLoading(true);
        const response = await fetchFilters();
        console.log("Fetched filters:", response);
        
        if (!response || !response.semesters || !response.branches) {
          throw new Error("Invalid response structure");
        }
        
        // Transform simple string arrays to { value, label } objects
        const semesters = response.semesters.map(sem => ({
          value: sem.toString(),
          label: `Semester ${sem}`
        }));
        
        // Branch mapping for better labels
        const branchLabels = {
          'CSE': 'Computer Science Engineering',
          'ECE': 'Electronics & Communication Engineering', 
          'ME': 'Mechanical Engineering',
          'CE': 'Civil Engineering',
          'EE': 'Electrical Engineering',
          'IT': 'Information Technology',
          'AI': 'Artificial Intelligence',
          'DS': 'Data Science',
          // Add more mappings as needed
        };
        
        const branches = response.branches.map(branch => ({
          value: branch,
          label: branchLabels[branch] || branch
        }));

        setData({ semesters, branches });
      } catch (err) {
        console.error("Error loading filters:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  return { ...data, loading, error };
};



export const useFilterationsForPaper = (sem, branch) => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't return early - always execute the effect
    if (!sem || !branch) {
      setPapers([]);
      setLoading(false);
      setError(null);
      return;
    }

    const loadPapers = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching papers for:", { sem, branch });
        const response = await fetchPapersByFilter(sem, branch);
        console.log("Papers response:", response);
        setPapers(response || []);
      } catch (err) {
        console.error("Error fetching papers:", err);
        setError(err.message);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadPapers();
  }, [sem, branch]);

  return { papers, loading, error };
};