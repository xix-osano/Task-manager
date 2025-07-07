import { useState, useEffect } from 'react'

export default function ApiPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const postsPerPage = 10

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const start = (page - 1) * postsPerPage
  const paginated = filtered.slice(start, start + postsPerPage)

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>

      <input
        type="text"
        placeholder="Search posts..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-500">Failed to load posts.</p>}

      <ul className="space-y-4">
        {paginated.map((post) => (
          <li key={post.id} className="border p-4 rounded dark:bg-gray-800 dark:text-white">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => (start + postsPerPage < filtered.length ? p + 1 : p))}
          disabled={start + postsPerPage >= filtered.length}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}