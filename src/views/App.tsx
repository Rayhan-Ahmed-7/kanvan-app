import AxiosService from '../services/axios_service'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from '../layout/AuthLayout';
import AppLayout from '../layout/AppLayout';
import Login from './feature/auth/views/Login';
import Register from './feature/auth/views/Register';
import Home from './feature/home/views/Home';
import Board from './feature/board/views/Board';
import AppTheme from '../theme';
import ThemeProvider from '../context/themeContext';
function App() {
  new AxiosService().init()
  return (
    <ThemeProvider>
      <AppTheme>
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
      </AppTheme>
    </ThemeProvider>
  )
}

export default App
