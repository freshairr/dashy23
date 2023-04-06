import { Routes, Route, Link, Navigate, Redirect, Outlet, NavLink } from "react-router-dom";

export default function GoogleAuth({user, children}) {
    if (user === false) {
        return <Navigate to="/login" replace />
    }
    return children
}