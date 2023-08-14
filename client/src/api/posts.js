import axios from 'axios';

export const getPostsRequest = async () => {
  return await axios.get('http://localhost:3001/posts');
};

export const getPostRequest = async (id) => {
  return await axios.get(`http://localhost:3001/posts/${id}`);
};

// export const createPostRequest = async (post) => {
//   return await axios.post('http://localhost:3001/posts', post);
// };

export const createPostRequest = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return await axios.post('http://localhost:3001/posts', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deletePostRequest = async (id) => {
  return await axios.delete(`http://localhost:3001/posts/${id}`);
};

export const updatePostRequest = async (id, newFields) => {
  return await axios.patch(`http://localhost:3001/posts/${id}`, newFields);
};
