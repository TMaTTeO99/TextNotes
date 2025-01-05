import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './myComponents/Home'
import MyNoteForm from './myComponents/CreateNotePage'


function App() {
  
  
  //temp handle of error
 
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addNote" element={<MyNoteForm />} />
        </Routes>
      </Router>
    )
 
  
}

export default App
