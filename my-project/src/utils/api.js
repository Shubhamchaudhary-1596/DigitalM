
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// Create axios instance
const axiosInstance = axios.create();

// Add response interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove tokens on 401 Unauthorized
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshToken");
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ==================== PUBLIC APIs (No Auth Required) ====================

// Get public blogs without auth
export const getPublicBlogs = async (category = 'all') => {
  try {
    const url = category && category !== 'all' 
      ? `${apiUrl}/api/blog/public/all?category=${category}`
      : `${apiUrl}/api/blog/public/all`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching public blogs:", error);
    return { error: true, success: false, data: [] };
  }
};

// Get public blog by slug without auth
export const getPublicBlogBySlug = async (slug) => {
  try {
    const response = await axios.get(`${apiUrl}/api/blog/public/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching public blog by slug:", error);
    return { error: true, success: false, blog: null };
  }
};

// Get public categories without auth
export const getPublicCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/category/public`);
    return response.data;
  } catch (error) {
    console.error("Error fetching public categories:", error);
    return { error: true, success: false, data: [] };
  }
};

// ==================== PUBLIC APIs (No Auth Required) ====================

// Create Lead (public - no auth)
export const createLead = async (leadData) => {
  try {
    const response = await fetch(`${apiUrl}/api/lead/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error || 'Failed to create lead' };
    }
  } catch (error) {
    console.error("Error creating lead:", error);
    return { success: false, error: 'Network error' };
  }
};

// ==================== PROTECTED APIs (Auth Required) ====================

// for post api 
export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //Include your API key in the authorization header
        "Content-Type": "application/json", // Adjust the content type as needed
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      //console.log(data)
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

// for get api 
export const fetchDataFromApi = async (url) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //Include your API key in the authorization header
        "Content-Type": "application/json", // Adjust the content type as needed
      },
    };
    const { data } = await axiosInstance.get(apiUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// for edit and upload user avatar image
export const uploadImage = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //Include your API key in the authorization header
      "Content-Type": "multipart/form-data", // Adjust the content type as needed
    },
  };
  var response;
  await axiosInstance.put(apiUrl + url, updatedData, params).then((res) => {
    response = res;
  });
  return response;
};

// for edit data 
export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //Include your API key in the authorization header
      "Content-Type": "application/json", // Adjust the content type as needed
    },
  };
  var response;
  await axiosInstance.put(apiUrl + url, updatedData, params).then((res) => {
    response = res;
  });
  return response;
};

// delete data from database
export const deleteData = async (url, updatedData) =>{
  const params = {
    data: updatedData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //Include your API key in the authorization header
      "Content-Type": "application/json", // Adjust the content type as needed
      },

}
var response;
await axiosInstance.delete(apiUrl + url, params).then((res) => {
  response = res;
});
return response;
};

// for upload images
export const uploadImages = async (url, formData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, //Include your API key in the authorization header
      "Content-Type": "multipart/form-data", // Adjust the content type as needed
    },
  };
  var response;
  await axiosInstance.post(apiUrl + url, formData, params).then((res) => {
    response = res;
  });
  return response;
};





