import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">React App</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/posts">Posts</Link>
        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </nav>
  )
}