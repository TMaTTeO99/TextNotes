import React from "react"
import { NoteDataFromServer } from "./noteInterfaces"

/*
    Interface used to shared data in through my Context
*/
export interface dataContext {

    isRetrieveData: boolean, //boolean to know if data has been recovered  
    allNotes: NoteDataFromServer[] // data that has been recovered
    setIsRetrieveData: React.Dispatch<React.SetStateAction<boolean>>,
    setAllNotes: React.Dispatch<React.SetStateAction<NoteDataFromServer[]>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
