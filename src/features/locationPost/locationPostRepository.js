import { LocationPost } from './locationPostModel.js';
import { Category } from './categoryModel.js';
import { Location } from './locationModel.js';

// LocationPost
export const createLocationPost = async (data) => LocationPost.create(data);
export const findLocationPostById = async (id) =>
  LocationPost.findById(id).populate('category postedBy');
export const findAllLocationPosts = async (query) => LocationPost.find(query);
export const updateLocationPostById = async (id, data) =>
  LocationPost.findByIdAndUpdate(id, data, { new: true });
export const deleteLocationPostById = async (id) => LocationPost.findByIdAndDelete(id);

// Category
export const createCategory = async (data) => Category.create(data);
export const findCategoryById = async (id) => Category.findById(id);
export const findAllCategories = async () => Category.find();

// Location
export const createLocation = async (data) => Location.create(data);
