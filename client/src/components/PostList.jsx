import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { usePost } from '../context/PostContext';
import oops from '../assets/opps.png';
import PostCard from './PostCard';

function PostList({ post }) {
  const { posts } = usePost();

  if (posts.length === 0)
    return (
      <section className='flex flex-col justify-center items-center h-screen text-2xl'>
        <img src={oops} alt='opps' width={128} height={128} />
        <h1 className=''>You don't have posts yet</h1>
        <Link
          to='/new'
          className='mt-5 flex items-center gap-x-2 bg-blue-500 px-2 py-1 rounded-md text-base hover:bg-blue-700 transition duration-500 ease-in-out'
        >
          <AiOutlinePlus />
          Add Post
        </Link>
      </section>
    );

  return (
    <div className='flex flex-col justify-center mx-auto w-2/3'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-2 bg-zinc-900 rounded-md mt-5'>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
