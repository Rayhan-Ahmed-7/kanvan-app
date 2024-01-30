import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import AxiosService from './services/axios_service'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './layout/AuthLayout';
import Login from './pages/feature/auth/views/Login';
import Register from './pages/feature/auth/views/Register';
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
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
