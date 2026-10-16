import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// Create axios instance
const axiosInstance = axios.create();

// Add response interceptor to handle 401 errors globally (graceful)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear tokens but let AuthContext handle refresh/logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Dispatch logout event instead of hard redirect
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(error);
  }
);

// Listen for auth:logout event from AuthContext
window.addEventListener('auth:logout', () => {
  // Optional: Additional cleanup or UI updates
  console.log('Global auth logout triggered');
});

// ==================== LEADS APIs ====================

// Get all leads
export const getAllLeads = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No token');
    const response = await axiosInstance.get(`${apiUrl}/api/lead`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

// Search leads
export const searchLeads = async (query) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No token');
    const response = await axiosInstance.get(`${apiUrl}/api/lead/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching leads:", error);
    throw error;
  }
};

// for post api 
export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
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
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
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
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  var response;
  await axiosInstance.put(apiUrl + url, updatedData, params).then((res) => {
    response = res;
  });
  return response;
};


// for upload the category image
export const uploadImages = async (url, formData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  var response;
  await axiosInstance.post(apiUrl + url, formData, params).then((res) => {
    response = res;
  });
  return response;
};

// for edit data 
export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
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
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
    data: updatedData,
  };

  var response;
  await axiosInstance.delete(apiUrl + url, params).then((res) => {
    response = res;
  });
  return response;
};

// delete category image from database
export const deleteImages = async (url, image) =>{
  const params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
}
var response;
await axiosInstance.delete(apiUrl + url, params).then((res) => {
  response = res;
});
return response;
};

// delete multiple product
export const deleteMultipleProducts = async (ids) => {
  try {
    const response = await axiosInstance.post(
      apiUrl + "/api/product/deleteMultipleProduct",
      { ids },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in deleteMultipleProducts API call:", error);
    throw error;
  }
};

// delete multiple categories
export const deleteMultipleCategories = async (ids) => {
  try {
    const response = await axiosInstance.post(
      apiUrl + "/api/category/deleteMultipleCategory",
      { ids },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in deleteMultipleCategories API call:", error);
    throw error;
  }
};

// RAM APIs
export const createRAM = async (data) => {
  try {
    const response = await axiosInstance.post(apiUrl + "/api/product/createRAM", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in createRAM API call:", error);
    throw error;
  }
};

export const updateRAM = async (id, data) => {
  try {
    const response = await editData(`/api/product/updateRAM/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error in updateRAM API call:", error);
    throw error;
  }
};

export const getAllRAMs = async () => {
  try {
    const response = await axiosInstance.get(apiUrl + "/api/product/getAllRAMs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllRAMs API call:", error);
    throw error;
  }
};

export const deleteMultipleRAMs = async (ids) => {
  try {
    const response = await axiosInstance.post(
      apiUrl + "/api/product/deleteMultipleRAMs",
      { ids },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleteMultipleRAMs API call:", error);
    throw error;
  }
};


// Upload RAMs
export const uploadRAMs = async (formData) => {
  try {
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axiosInstance.post(apiUrl + "/api/product/uploadRAMs", formData, params);
    return response;
  } catch (error) {
    console.error("Error in uploadRAMs API call:", error);
    throw error;
  }
};

// Size APIs
export const createSize = async (data) => {
  try {
    const response = await axiosInstance.post(apiUrl + "/api/product/createSize", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in createSize API call:", error);
    throw error;
  }
};

export const updateSize = async (id, data) => {
  try {
    const response = await editData(`/api/product/updateSize/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error in updateSize API call:", error);
    throw error;
  }
};

export const getAllSizes = async () => {
  try {
    const response = await axiosInstance.get(apiUrl + "/api/product/getAllSizes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllSizes API call:", error);
    throw error;
  }
};

export const deleteMultipleSizes = async (ids) => {
  try {
    const response = await axiosInstance.post(
      apiUrl + "/api/product/deleteMultipleSizes",
      { ids },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleteMultipleSizes API call:", error);
    throw error;
  }
};

// Weight APIs
export const createWeight = async (data) => {
  try {
    const response = await axiosInstance.post(apiUrl + "/api/product/createWeight", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in createWeight API call:", error);
    throw error;
  }
};

export const updateWeight = async (id, data) => {
  try {
    const response = await editData(`/api/product/updateWeight/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error in updateWeight API call:", error);
    throw error;
  }
};

export const getAllWeights = async () => {
  try {
    const response = await axiosInstance.get(apiUrl + "/api/product/getAllWeights", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllWeights API call:", error);
    throw error;
  }
};

export const deleteMultipleWeights = async (ids) => {
  try {
    const response = await axiosInstance.post(
      apiUrl + "/api/product/deleteMultipleWeights",
      { ids },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleteMultipleWeights API call:", error);
    throw error;
  }
};

// ==================== BLOG APIs ====================

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get(apiUrl + "/api/blog/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllBlogs API call:", error);
    throw error;
  }
};

// Get single blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(apiUrl + `/api/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getBlogById API call:", error);
    throw error;
  }
};

// Create new blog
export const createBlog = async (data) => {
  try {
    const response = await axiosInstance.post(apiUrl + "/api/blog/addBlog", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createBlog API call:", error);
    throw error;
  }
};

// Update existing blog
export const updateBlog = async (id, data) => {
  try {
    const response = await axiosInstance.put(apiUrl + `/api/blog/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateBlog API call:", error);
    throw error;
  }
};

// Delete blog
export const deleteBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(apiUrl + `/api/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteBlog API call:", error);
    throw error;
  }
};

// Upload blog images
export const uploadBlogImages = async (formData) => {
  try {
    const response = await axiosInstance.post(apiUrl + "/api/blog/uploadImages", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in uploadBlogImages API call:", error);
    throw error;
  }
};

// Delete blog image from cloudinary
export const deleteBlogImage = async (imageUrl) => {
  try {
    const response = await axiosInstance.delete(
      apiUrl + `/api/blog/deleteImage?img=${encodeURIComponent(imageUrl)}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleteBlogImage API call:", error);
    throw error;
  }
};

// ==================== CATEGORY APIs ====================

// Create new category
export const createCategory = async (data) => {
  try {
    const response = await axiosInstance.post(apiUrl + "/api/category/create", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createCategory API call:", error);
    throw error;
  }
};

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get(apiUrl + "/api/category/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getAllCategories API call:", error);
    throw error;
  }
};

// Get category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(apiUrl + `/api/category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getCategoryById API call:", error);
    throw error;
  }
};

// Update category
export const updateCategory = async (id, data) => {
  try {
    const response = await axiosInstance.put(apiUrl + `/api/category/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateCategory API call:", error);
    throw error;
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(apiUrl + `/api/category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteCategory API call:", error);
    throw error;
  }
};

// Get categories count
export const getCategoriesCount = async () => {
  try {
    const response = await axiosInstance.get(apiUrl + "/api/category/get/count", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getCategoriesCount API call:", error);
    throw error;
  }
};

// Get subcategories count
export const getSubCategoriesCount = async () => {
  try {
    const response = await axiosInstance.get(apiUrl + "/api/category/get/count/subCat", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getSubCategoriesCount API call:", error);
    throw error;
  }
};

