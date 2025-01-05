import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './myComponents/Home'
import { useEffect, useState} from 'react';
import { NoteDataFromServer } from './myInterface/noteInterfaces';
import { getAllNotes } from './httpService';


/*
  Retrieve all notes from server
*/
function retrieveData(setDataState: React.Dispatch<React.SetStateAction<boolean>>, setData: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>) {

  getAllNotes()
    .then(listOfNotes => {
      setDataState(false);
      setData(listOfNotes)      
  })
  .catch(error => {
    console.log(error)
    setDataState(true);
    setData([])
  });

}


function App() {
  
  const [dataState, setDataState] = useState(false);
  const [data, setData] = useState<NoteDataFromServer[]>([]);

  useEffect(() => {retrieveData(setDataState, setData)}, []);
  
  //temp handle of error
  if(!dataState){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home notes={data} />} />
        </Routes>
      </Router>
    )
  }
  else {
    return (
      <>
        <h1>Impossibile recuperare i dati</h1>
      </>

    )
  }
  
}

export default App
