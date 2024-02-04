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
import Snackbar from '../components/Snackbar';
import { Provider } from 'react-redux';
import { store } from '../store';
function App() {
  new AxiosService().init()
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppTheme>
          <Snackbar />
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
    </Provider>
  )
}

export default App
