import BlogModel from "../models/blog.model.js";
import { generateUniqueSlug } from "../utils/blogSlugGenerator.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret, // Click 'View API Keys' above to copy your API secret
  secure: true,
});

//Image Upload
var imagesArr = [];
export async function uploadImages(request, response) {
  try {
    imagesArr = [];

    const image = request.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      try {
        const result = await cloudinary.uploader.upload(image[i].path, options);
        imagesArr.push(result.secure_url);
        fs.unlinkSync(`uploads/${request.files[i].filename}`);
        console.log(`✅ Uploaded to Cloudinary: ${result.secure_url}`);
      } catch (uploadError) {
        if (uploadError.http_code === 401 || uploadError.message.includes('API key')) {
          // Fallback to local storage for invalid credentials
          const localUrl = `${request.protocol}://${request.get('host')}/uploads/${request.files[i].filename}`;
          imagesArr.push(localUrl);
          console.log(`🔄 Fallback to local: ${localUrl} (Cloudinary error: ${uploadError.message})`);
        } else {
          console.error('Upload error:', uploadError);
        }
        // Don't delete local file on fallback
      }
    }

    return response.status(200).json({
      images: imagesArr,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Create blog
export async function addBlog(request, response) {
  try {
    // Generate unique slug
    const existingBlogs = await BlogModel.find({}, 'slug');
    const existingSlugs = existingBlogs.map(blog => blog.slug);
    const slug = await generateUniqueSlug(request.body.title, existingSlugs);

    let blog = new BlogModel({
      title: request.body.title,
      slug: slug,
      images: request.body.images || [],
      description: request.body.description,
      category: request.body.category || null,
    });

    if (!blog) {
      return response.status(500).json({
        message: "Blog not Created",
        error: true,
        success: false,
      });
    }

    blog = await blog.save();
    imagesArr = [];

    return response.status(200).json({
      message: "Blog Created",
      error: false,
      success: true,
      blog: blog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getBlogs(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = request.query.perPage !== undefined ? parseInt(request.query.perPage) : 5;

    // If perPage is 0 or less, fetch all blogs without pagination
    if (perPage <= 0) {
      const allBlogs = await BlogModel.find().sort({ createdAt: -1 });

      return response.status(200).json({
        error: false,
        success: true,
        data: allBlogs,
        totalPages: 1,
      });
    }

    // Get total count of blogs
    const totalCount = await BlogModel.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / perPage);

    // Fetch paginated blogs
    const paginatedBlogs = await BlogModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return response.status(200).json({
      error: false,
      success: true,
      data: paginatedBlogs,
      totalPages: totalPages,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// New controller function to fetch all blogs without pagination
export async function getAllBlogs(request, response) {
  try {
    const { category } = request.query;
    
    let query = {};
    
    // Filter by category if provided
    if (category && category !== 'all') {
      query.category = category;
    }

    const allBlogs = await BlogModel.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    return response.status(200).json({
      error: false,
      success: true,
      data: allBlogs,
      totalPages: 1,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


// get single blog by ID
export async function getBlog(request, response) {
    try {
      const blog = await BlogModel.findById(request.params.id);
      if (!blog) {
        return response.status(404).json({
          message: "The blog with the given ID was not found.",
          error: true,
          success: false,
        });
      }
  
      return response.status(200).json({
        error: false,
        success: true,
        blog: blog,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  }

// get single blog by slug
export async function getBlogBySlug(request, response) {
    try {
      const blog = await BlogModel.findOne({ slug: request.params.slug }).populate('category', 'name');
      if (!blog) {
        return response.status(404).json({
          message: "The blog with the given slug was not found.",
          error: true,
          success: false,
        });
      }
  
      return response.status(200).json({
        error: false,
        success: true,
        blog: blog,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  }

  // Delete image from cloudinary
export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];
    if (imageName) {
const result = await cloudinary.uploader.destroy(imageName);
      if (result.result === 'ok' || result.result === 'not found') {
        return response.status(200).json({
          error: false,
          success: true,
          message: "Image deleted successfully",
        });
      } else {
        return response.status(400).json({
          error: true,
          success: false,
          message: "Failed to delete image",
        });
      }
    }
  }

  // delete the blog
  export async function deleteBlog(request, response) {
    const blog = await BlogModel.findById(request.params.id);
    const images = blog.images;
    let img = "";
  
    for (img of images) {
      const imgUrl = img;
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];
  
      if (imageName) {
        try {
          await cloudinary.uploader.destroy(imageName);
        } catch (error) {
          console.log('Delete image error:', error.message);
        }
      }
    }
   
    const deletedBlog = await BlogModel.findByIdAndDelete(request.params.id);
    if (!deletedBlog) {
      response.status(404).json({
        message: "Blog not found!",
        error: true,
        success: false,
      });
    }
    response.status(200).json({
      message: "Blog Deleted",
      error: false,
      success: true,
    });
  }

  //Update blog
  export async function updatedBlog(request, response) {
    const blog = await BlogModel.findByIdAndUpdate(
      request.params.id,
      {
        title: request.body.title,
     
      description: request.body.description,
        name: request.body.name,
        images: imagesArr.length > 0 ? imagesArr[0] : request.body.images,
        category: request.body.category || null,
       
      },
      { new: true }
    );
    if (!blog) {
      response.status(500).json({
        message: "Blog cannot be updated!",
        error: true,
        success: false,
      });
    }
    imagesArr = [];
    response.status(200).json({
      message: "Blog updated successfully",
      error: false,
      success: true,
      blog: blog,
    });
  }