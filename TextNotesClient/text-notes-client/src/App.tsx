import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './myComponents/Home'
import MyNoteForm from './myComponents/CreateNotePage'
import { MyProvider } from './myComponents/MyContext';

function App() {
  
  
  //temp handle of error
 
    return (
      <MyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addNote" element={<MyNoteForm />} />
          </Routes>
        </Router>
      </MyProvider>
      
    );
 
  
}

export default App
