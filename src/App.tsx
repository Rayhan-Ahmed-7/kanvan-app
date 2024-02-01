import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import AxiosService from './services/axios_service'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './layout/AuthLayout';
import Login from './pages/feature/auth/views/Login';
import Register from './pages/feature/auth/views/Register';
import Home from './pages/feature/home/views/Home';
import Board from './pages/feature/board/views/Board';
import AppLayout from './layout/AppLayout';
function App() {
  new AxiosService().init()
  const theme = createTheme({
    palette: { mode: "dark" }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />}/>
          </Route>
          <Route path='/' element={<AppLayout />}>
            {/* <Route index element={<Home />}/> */}
            <Route path='boards' element={<Home />}/>
            <Route path='boards/:boardId' element={<Board />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
