import ResponsiveDrawer from "./components/layout"
import { Route, Routes } from "react-router-dom"
import Home from "./views/home"
import Projects from "./views/projects"
import './App.css'
import Schemas from "./views/schemas"
import Endpoints from "./views/endpoints"
import DataView from "./views/collections-data"

function App() {
 
  /* 
  
    xs, extra-small: 0px
    sm, small: 600px
    md, medium: 900px
    lg, large: 1200px
    xl, extra-large: 1536px
 */
  return (
       <Routes>
           
   
         <Route path="" element={<ResponsiveDrawer />} >
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/schemas" element={<Schemas/>}/>
          <Route path="/endpoints" element={<Endpoints/>}/>
          <Route path="/data" element={<DataView/>}/>

          <Route path="/" element={<Home/>}/>
         </Route>
       
       </Routes>
    




    
   
   )
}

export default App
