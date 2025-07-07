import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './layouts/Layout';
import TaskManager from './pages/TaskManager';
import ApiPosts from './pages/ApiPosts';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskManager />} />
        <Route path="/posts" element={<ApiPosts />} />
      </Routes>
    </Layout>
  );
}
