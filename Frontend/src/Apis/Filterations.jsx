import axios from "axios";

const FilterURL = import.meta.env.VITE_BACKEND_URL;
if (!FilterURL) {
  console.error("VITE_BACKEND_URL is not defined");
  throw new Error("Backend URL is not configured");
}

// Create axios instance with base URL and timeout
const api = axios.create({
  baseURL: FilterURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('API Request Error:', error.request);
    } else {
      console.error('API Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

//This is dropdown config for semester and branch
export const fetchPapersByFilter = async (sem, branch) => {
  try {
    console.log("🔍 Fetching papers for:", { sem, branch });
    
    const response = await api.get(`/all/paper/filter?sem=${sem}&branch=${branch}`);
    console.log("📥 API Response:", response.data);
    
    // Handle different response structures
    let papers;
    if (Array.isArray(response.data)) {
      papers = response.data;
    } else if (response.data?.papers) {
      papers = response.data.papers;
    } else if (response.data?.data) {
      papers = response.data.data;
    } else {
      console.warn("Unexpected response structure:", response.data);
      return [];
    }
        return papers;
    
  } catch (error) {
    console.error("❌ Error fetching papers:", error);
    if (error.response) {
      console.error("❌ Response status:", error.response.status);
      console.error("❌ Response data:", error.response.data);
    }
    throw new Error(`Failed to fetch papers: ${error.message}`);
  }
};


// Fetch the available semesters and branches for filtering papers
export const fetchFilters = async () => {
  try {
    const response = await api.get('/all/paper/paper-filters');
    console.log("response");
    console.log(response.data);
    
    if (!response.data || !response.data.semesters || !response.data.branches) {
      throw new Error("Invalid response structure");
    }

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch filters: ${error.message}`);
  }
};

