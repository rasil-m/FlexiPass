import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './Principle/Pages/Layout'
import Home from './Principle/Pages/Home'
import Register from './Principle/Pages/Register'
import Status from './Principle/Pages/Status'
import Update from './Principle/Pages/Update';
import Settings from './Principle/Pages/Settings';
import RTO from './RTO/pages/Layout'
import RTO_dashboard from './RTO/pages/Home'
import {RTO_applications,RTO_messages} from './RTO/containers/main'
import SignUp from './Register/Register'
import Login from './Login/Login';
import Student from './Student/Pages/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
       <Route path='signup' element={<SignUp/>}/>
       <Route path='login' element={<Login/>}/>
     
       
        <Route path='Principle' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='Register' element={<Register/>}/>
          <Route path='status' element={<Status/>}/>
          <Route path='update' element={<Update/>}/>
          <Route path='settings' element={<Settings/>}/>
        </Route> 
        <Route path='rto' element={<RTO/>}>
          <Route index element={<RTO_dashboard/>}/>
          <Route path='applications' element={<RTO_applications/>}/>
          <Route path='messages' element={<RTO_messages/>}/>
        </Route>
        <Route path='student/:id' element={<Student/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
