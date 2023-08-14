import Post from '../schemas/Post.schema.js';
import { uploadImage, deleteImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPost = async (req, res) => {
  const { title, description } = req.body;
  let image;

  if (req.files?.image) {
    const result = await uploadImage(req.files.image.tempFilePath);
    image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
    fs.remove(req.files.image.tempFilePath); //delete the temp file
  }

  try {
    const newPost = new Post({ title, description, image });

    const postFound = await Post.findOne({ title: title.toLowerCase() });

    if (postFound) {
      return res
        .status(400)
        .json({ message: 'A post with this title already exists' });
    }

    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedPost)
      return res.status(404).json({ message: 'Post not found' });

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost)
      return res.status(404).json({ message: 'Post not found' });

    //delete image of cloudinary
    if (deletedPost.image.public_id) {
      await deleteImage(deletedPost.image.public_id);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
