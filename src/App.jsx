import { Routes, Route } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Dashboard from "./views/Dashboard/Dashboard";
import './App.css'

function App() {


  return (

    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/dashboard" element={<Dashboard />} />



    </Routes>
  )
}

export default App
