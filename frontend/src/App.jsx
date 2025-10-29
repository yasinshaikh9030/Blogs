import { useState } from 'react'
import './App.css'
import Homepage from './componants/Homepage.jsx'
import Viewpost from './componants/Viewpost.jsx'
//import { Route, Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">BlogSpace</h1>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentView === 'home'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                Create Post
              </button>
              <button
                onClick={() => setCurrentView('posts')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentView === 'posts'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                View Posts
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'home' ? <Homepage /> : <Viewpost />}
      </main>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
