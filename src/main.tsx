import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import CityDetailPage from './routes/CityDetailPage'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/city/:id', element: <CityDetailPage /> }, // inga props här
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
