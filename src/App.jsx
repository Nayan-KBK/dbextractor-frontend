import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import EmailExtractorPage from './Pages/EmailExtractorPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/email-extractor' element={<EmailExtractorPage />} />

        
      </Routes>
    </>
  )
}

export default App
