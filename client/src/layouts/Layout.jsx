import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-4"> {children} </main>
      <Footer />
    </div>
  )
}