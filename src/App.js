
import './App.css';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Register from './components/register';
import Login from './components/login'
import Navbar from './components/navbar';
import Home from './components/home';
import React from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import Call from './components/call';
import AddLibrary from './components/Add';


export  const Mycontext = createContext()

function App() {
const [user,setUser]=React.useState({loggedin:false,name:"",gender:""})

  return (
   <div>
   <Router>
      {/* {user.loggedin && <Nav user={user}/>} */}
      <Mycontext.Provider value={{user,setUser}}>
      <Navbar/>
      <Routes>
        {/* <Route exact path="/login" element={<Login  setUser={setUser} />}></Route> */}.
        <Route path="/login/:signed" element={<Login    />}></Route>
        <Route path="/login" element={<Login  />}></Route>
       
        <Route path="/home" element={<Home  />}></Route>
       
        <Route path="/connect" element={<Call  />}></Route>


        <Route exact path="/register" element={<Register   />}></Route>
        {/* <Route exact path="/logout" element={<Logout  setUser={setUser}  />}></Route> */}
        
      </Routes>
    
      </Mycontext.Provider>
     
   </Router>
   {/* <AddLibrary url="./agora-rtm-sdk-1.5.1.js"/> */}
   </div>
     
 
  
   
    
  ); 
  
}

export default App;
