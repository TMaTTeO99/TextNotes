import React from "react"
import { NoteDataFromServer } from "./noteInterfaces"

/*
    Interface used to shared data in through my Context
*/
export interface dataContext {

    isRetrieveData: boolean, //boolean to know if data has been recovered  
    setIsRetrieveData: React.Dispatch<React.SetStateAction<boolean>>,
    
    allNotes: NoteDataFromServer[] // data that has been recovered
    setAllNotes: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>,
    
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    
    selectedNoteTitle: string | null,
    setSelectedNoteTitle: React.Dispatch<React.SetStateAction<string | null>>

    selectedNoteContent: string | null,
    setSelectedNoteContent: React.Dispatch<React.SetStateAction<string | null>>,

    headerText: string,
    setheaderText: React.Dispatch<React.SetStateAction<string>>

    toSave: boolean, //boolean to know if data has been recovered  
    setToSave: React.Dispatch<React.SetStateAction<boolean>>,

    //i need to know which note the user want change
    idNoteToChange: string | undefined,
    setIdNoteToChange: React.Dispatch<React.SetStateAction<string | undefined>>

    //i need a copy of my note to build search feature
    allNotesCopy: NoteDataFromServer[] // data that has been recovered
    setAllNotesCopy: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>,
}
