import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'


import App from './App.jsx'
import Cabin from './Cabin.jsx'
import Forest from './Forest.jsx'
import Ending from './Ending.jsx'
import End from './End.jsx'
import Endings from './Endings.jsx'
import Living from './Living.jsx'
import Kitchen from './Kitchen.jsx'
import Outside from './Outside.jsx'
import Finale from './Finale.jsx'
import Progression from './Progression.jsx'
// import Credit from './Credit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Router>
      <Routes>

        <Route path='/' element={<App />} />

         <Route path='/cabin' element={<Cabin />} />


         <Route path='/forest' element={<Forest />} />
       
         <Route path='/ending' element={<Ending />} /> 

          <Route path='/end' element={<End />} /> 
           <Route path='/living' element={<Living />} /> 
            <Route path='/living' element={<Living />} /> 
          <Route path='/progression' element={<Progression />} />
           <Route path='/endings' element={<Endings />} /> 

            <Route path='/kitchen' element={<Kitchen />} /> 
              <Route path='/outside' element={<Outside />} /> 
              <Route path='/finale' element={<Finale />} /> 
              {/* <Route path='/credit' element={<Credit />} />  */}
      </Routes>

    </Router>
  </StrictMode>,
)
