import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import AxiosService from './services/axios_service'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './layout/AuthLayout';
import AppLayout from './layout/AppLayout';
import Login from './views/feature/auth/views/Login';
import Register from './views/feature/auth/views/Register';
import Home from './views/feature/home/views/Home';
import Board from './views/feature/board/views/Board';
function App() {
  new AxiosService().init()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='boards' element={<Home />} />
          <Route path='boards/:boardId' element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
