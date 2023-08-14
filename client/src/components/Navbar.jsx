import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { usePost } from '../context/PostContext';

function Navbar() {
  const { posts } = usePost();
  return (
    <nav className='bg-zinc-900 p-4 flex justify-between'>
      <Link
        to='/'
        className='flex items-center justify-center gap-x-2 text-white text-xl font-extralight'
      >
        Post App
        <h2 className='text-base'>#{posts.length}</h2>
      </Link>
      <Link
        to='/new'
        className='flex items-center gap-x-2 bg-blue-500 px-2 py-1 rounded-md text-base hover:bg-blue-700 transition duration-500 ease-in-out'
      >
        <AiOutlinePlus />
        Add Post
      </Link>
    </nav>
  );
}

export default Navbar;
