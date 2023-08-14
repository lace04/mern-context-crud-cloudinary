import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillHouseDoorFill } from 'react-icons/bs';

export function NotFound() {
  return (
    <section className='flex flex-col justify-center items-center h-screen'>
      <div className=''>
        <h1 className='text-4xl font-bold'>
          404 | <p className='inline-block text-2xl font-semibold'>Not Found</p>
        </h1>
      </div>
      <Link
        to='/'
        className='mt-20 text-xl font-semibold text-blue-500 hover:text-blue-700'
      >
        <BsFillHouseDoorFill size={32} />
      </Link>
    </section>
  );
}
