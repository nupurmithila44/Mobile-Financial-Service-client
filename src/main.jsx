import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider,} from "react-router-dom";
import { router } from './Routes/Route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './Provider/AuthProvider';


const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer></ToastContainer>
    <AuthProvider>
    <div className='max-w-6xl mx-auto'>
      <RouterProvider router={router} />
      </div>
    </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
