import { Routes, Route, Navigate } from 'react-router-dom'
import Login from "./features/auth/pages/Login"
import Register from './features/auth/pages/Register'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes
