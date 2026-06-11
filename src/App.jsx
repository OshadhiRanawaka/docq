import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Documents from './pages/Documents'
import Chats from './pages/Chats'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/chats" element={<Chats />} />
            </Routes>
        </Router>
    )
}
