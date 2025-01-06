import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './myComponents/Home'
import MyNoteForm from './myComponents/CreateNotePage'
import { MyProvider } from './myComponents/MyContext';

function App() {
  
  //for all restart of my app i need to clear my localstorage
  //is used sessionStorage to check if app was restarted or not
  if(!sessionStorage.getItem("appStarted")){
    sessionStorage.setItem("appStarted", "true")
    localStorage.clear();
  }
  
  return (

    <MyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addNote" element={<MyNoteForm />} />
          <Route path="/viewNote" element={<MyNoteForm/>} />
        </Routes>
      </Router>
    </MyProvider>  
  );
 
  
}

export default App
