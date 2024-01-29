import './App.css'
import Loading from './components/common/Loading'
import AxiosService from './services/axios_service'

function App() {
  new AxiosService().init()
  return (
    <>
      <Loading fullHeight/>      
    </>
  )
}

export default App
