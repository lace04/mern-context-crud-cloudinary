import { Formik, Form, Field, ErrorMessage } from 'formik';
import { usePost } from '../context/PostContext';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

export function PostForm() {
  const { createPost, getPost, updatePost } = usePost();
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    (async () => {
      if (id) {
        const post = await getPost(id);
        setPost({
          title: post.title,
          description: post.description,
        });
      }
    })();
  }, [id, getPost]);

  return (
    <>
      <header>
        <h1 className='text-3xl font-bold text-center text-white mt-6'>
          {id ? 'Edit Post' : 'New post'}
        </h1>
      </header>
      <Formik
        initialValues={post}
        enableReinitialize
        validationSchema={Yup.object({
          title: Yup.string().required('Title is required').min(1),
          description: Yup.string().required('Description is required'),
        })}
        onSubmit={async (values, actions) => {
          if (id) {
            await updatePost(id, values); // updatePost is a function from PostContext
          } else {
            await createPost(values); // createPost is a function from PostContext
          }
          actions.setSubmitting(false);
          navigate('/');
        }}
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <Form
            className='bg-zinc-900 p-4 rounded-md flex flex-col justify-center mx-auto w-2/3 md:w-1/3 gap-y-4 mt-16'
            onSubmit={handleSubmit}
          >
            <label htmlFor='title' className='text-white text-sm'>
              Title
            </label>
            <Field
              name='title'
              placeholder='Write a title'
              className='bg-zinc-700 p-2 rounded-md focus:outline-none'
              autoFocus
            />
            <ErrorMessage
              name='title'
              component='p'
              className='text-red-500 text-xs'
            />

            <label htmlFor='description' className='text-white text-sm'>
              Description
            </label>
            <Field
              name='description'
              component='textarea'
              rows='3'
              placeholder='Write a description'
              className='bg-zinc-700 p-2 rounded-md focus:outline-none'
            />

            <ErrorMessage
              name='description'
              component='p'
              className='text-red-500 text-xs'
            />

            <input
              name='image'
              type='file'
              onChange={(e) => {
                setFieldValue('image', e.target.files[0]);
              }}
            />
            <button
              type='submit'
              className='bg-blue-500 px-2 py-1 rounded-md text-base hover:bg-blue-700 transition duration-500 ease-in-out'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : id ? 'Update' : 'Create'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
