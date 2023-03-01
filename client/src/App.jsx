import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'


import Navbar from './components/Navbar/Navbar'
import { Home,CreatePost } from './pages'
import {ChatPage} from './pages/chatPage'

const App = () => {
  return (
    <BrowserRouter>
        
            <Navbar/>
            <main className="sm:p-8 px-4 py-8
            w-full bg-[#f9fafe] min-h-[calc
            (100vh-73px)]">
            <Routes>
                {/* 嵌套路由 */}
                <Route path="/" element={<Home/>}/>
                <Route path="/create-post" element={<CreatePost/>}/>
                <Route path="/chat" element={<ChatPage/>}/>
            
            </Routes>

            </main>
    </BrowserRouter>

  )
}

export default App