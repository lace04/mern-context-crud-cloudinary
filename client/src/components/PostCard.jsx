import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { usePost } from '../context/PostContext';
import toast from 'react-hot-toast';

function PostCard({ post }) {
  const navigate = useNavigate();
  const { deletePost } = usePost();

  const handleDelete = async (e, _id) => {
    e.stopPropagation();
    toast(
      (t) => (
        <div className='flex flex-col items-center'>
          <p className='mr-2 text-white'>
            Are you sure? <strong>{_id}</strong>
          </p>
          <div className='flex gap-x-2 mt-1'>
            <button
              className='bg-red-500 hover:bg-red-700 transition duration-500 ease-in-out px-2 py-1 rounded-md text-xs text-zinc-100'
              onClick={() => {
                deletePost(_id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className='bg-zinc-500 hover:bg-slate-700 trasition duration-500 ease-in-out px-2 py-1 rounded-md text-xs text-zinc-100'
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: '#303030',
        },
      }
    );
  };

  return (
    <div
      className='bg-zinc-800 p-2 rounded-md hover:cursor-pointer flex flex-col'
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className='flex items-center justify-between'>
        <h1 className='text-xs font-bold hover:text-blue-500 transition duration-500 ease-in-out uppercase md:text-xl'>
          {post.title}
        </h1>
        <button
          className='bg-red-500 px-1 py-0.5 rounded-md text-base hover:bg-red-700 transition duration-500 ease-in-out'
          onClick={(e) => handleDelete(e, post._id)}
        >
          <AiFillDelete />
        </button>
      </div>
      <p className='text-sm text-gray-400 hover:text-gray-500 transition duration-500 ease-in-out'>
        {post.description}
      </p>
      {post.image && <img src={post.image.url} alt={post.title} className='w-64 bg-zinc-200 my-2 object-cover'/>}
      <p className='text-2xs text-zinc-500 mt-auto'>
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className='text-2xs text-amber-800'>
        {new Date(post.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}

export default PostCard;
