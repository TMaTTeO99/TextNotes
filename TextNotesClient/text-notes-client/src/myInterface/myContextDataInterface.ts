import React from "react"
import { NoteDataFromServer } from "./noteInterfaces"

/*
    Interface used to shared data in through my Context
*/
export interface dataContext {

    allNotes: NoteDataFromServer[] // data that has been recovered
    setAllNotes: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>,
    
    //i need a copy of my note to build search feature
    allNotesCopy: NoteDataFromServer[] // data that has been recovered
    setAllNotesCopy: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>,
}
