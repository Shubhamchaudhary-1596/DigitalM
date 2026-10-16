import CategoryModel from "../models/category.model.js";

// Create Category
export async function createCategory(request, response) {
  try {
    let category = new CategoryModel({
      name: request.body.name,
      parentId: request.body.parentId || null,
      parentCatName: request.body.parentCatName || "",
    });

    if (!category) {
      return response.status(500).json({
        message: "Category not Created",
        error: true,
        success: false,
      });
    }

    category = await category.save();

    return response.status(200).json({
      message: "Category Created",
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getCategories(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = request.query.perPage !== undefined ? parseInt(request.query.perPage) : 5;

    // If perPage is 0 or less, fetch all categories without pagination
    if (perPage <= 0) {
      // Fetch all root categories (parentId null or undefined)
      const rootCategoriesData = await CategoryModel.find({ $or: [{ parentId: null }, { parentId: { $exists: false } }] });

      // Fetch children for each root category
      const rootCategoriesWithChildren = await Promise.all(
        rootCategoriesData.map(async (rootCat) => {
          // Fetch sub categories (children of root category)
          const subCategories = await CategoryModel.find({ parentId: rootCat._id });

          // For each sub category, fetch third level categories
          const subCategoriesWithChildren = await Promise.all(
            subCategories.map(async (subCat) => {
              const thirdLevelCategories = await CategoryModel.find({ parentId: subCat._id });
              return {
                ...subCat._doc,
                children: thirdLevelCategories,
              };
            })
          );

          return {
            ...rootCat._doc,
            children: subCategoriesWithChildren,
          };
        })
      );

      return response.status(200).json({
        error: false,
        success: true,
        data: rootCategoriesWithChildren,
        totalPages: 1,
      });
    }

    // Get total count of root categories (parentId null or undefined)
    const totalCount = await CategoryModel.countDocuments({ $or: [{ parentId: null }, { parentId: { $exists: false } }] });

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / perPage);

    // Fetch paginated root categories
    const rootCategoriesData = await CategoryModel.find({ $or: [{ parentId: null }, { parentId: { $exists: false } }] })
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Fetch children for each root category
    const rootCategoriesWithChildren = await Promise.all(
      rootCategoriesData.map(async (rootCat) => {
        // Fetch sub categories (children of root category)
        const subCategories = await CategoryModel.find({ parentId: rootCat._id });

        // For each sub category, fetch third level categories
        const subCategoriesWithChildren = await Promise.all(
          subCategories.map(async (subCat) => {
            const thirdLevelCategories = await CategoryModel.find({ parentId: subCat._id });
            return {
              ...subCat._doc,
              children: thirdLevelCategories,
            };
          })
        );

        return {
          ...rootCat._doc,
          children: subCategoriesWithChildren,
        };
      })
    );

    return response.status(200).json({
      error: false,
      success: true,
      data: rootCategoriesWithChildren,
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

// Get categories count
export async function getCategoriesCount(request, response) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      parentId: undefined,
    });

    if (!categoryCount) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    } else {
      response.send({
        categoryCount: categoryCount,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Get sub categories count
export async function getSubCategoriesCount(request, response) {
  try {
    const categories = await CategoryModel.find();

    if (!categories) {
      return response.status(500).json({
        error: true,
        success: false,
      });
    } else {
      const subCatList = [];
      for (let cat of categories) {
        if (cat.parentId !== undefined) {
          subCatList.push(cat);
        }
      }
      response.send({
        subCategoryCount: subCatList.length,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Get single category
export async function getCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);
    if (!category) {
      response.status(500).json({
        message: "The category with the given ID was not found.",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Delete the category
export async function deleteCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);
    
    if (!category) {
      return response.status(404).json({
        message: "Category not found!",
        error: true,
        success: false,
      });
    }

    // Find and delete all subcategories
    const subCategory = await CategoryModel.find({
      parentId: request.params.id,
    });

    for (let i = 0; i < subCategory.length; i++) {
      const thirdsubCategory = await CategoryModel.find({
        parentId: subCategory[i]._id,
      });
      for (let j = 0; j < thirdsubCategory.length; j++) {
        await CategoryModel.findByIdAndDelete(thirdsubCategory[j]._id);
      }

      await CategoryModel.findByIdAndDelete(subCategory[i]._id);
    }

    const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
    
    response.status(200).json({
      message: "Category Deleted",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Update Category
export async function updatedCategory(request, response) {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        parentId: request.body.parentId || null,
        parentCatName: request.body.parentCatName || "",
      },
      { new: true }
    );

    if (!category) {
      return response.status(500).json({
        message: "Category cannot be updated!",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Category updated successfully",
      error: false,
      success: true,
      category: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Delete multiple categories
export async function deleteMultipleCategories(request, response) {
  try {
    const ids = request.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return response.status(400).json({
        message: "No category IDs provided",
        error: true,
        success: false,
      });
    }

    for (const id of ids) {
      const category = await CategoryModel.findById(id);
      if (!category) continue;

      // Find and delete all subcategories
      const subCategory = await CategoryModel.find({ parentId: id });
      for (const subCat of subCategory) {
        const thirdsubCategory = await CategoryModel.find({ parentId: subCat._id });
        for (const thirdSubCat of thirdsubCategory) {
          await CategoryModel.findByIdAndDelete(thirdSubCat._id);
        }
        await CategoryModel.findByIdAndDelete(subCat._id);
      }

      await CategoryModel.findByIdAndDelete(id);
    }

    return response.status(200).json({
      message: "Categories deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

