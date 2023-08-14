import { PostProvider } from './context/PostContext';
import { HomePage, PostForm, NotFound } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

function App() {
  return (
    <PostProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/new' element={<PostForm />} />
          <Route path='/posts/:id' element={<PostForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
