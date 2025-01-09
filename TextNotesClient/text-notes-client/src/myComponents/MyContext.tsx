import {dataContext} from '../myInterface/myContextDataInterface'
import React, { useContext, useState, createContext, useEffect } from 'react'
import {AllGet200ResponseInner} from '../../out/models/AllGet200ResponseInner'
const NotesContext = createContext<dataContext | null>(null);

export const useNoteContext = () => {
    const context = useContext(NotesContext);
    if (!context) {
      throw new Error('useNoteContext must be used within a NotesProvider');
    }
    return context;
} 
const loadFromLocalStorage = (key: string, defaultValue: any) => {

    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;

}

const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const MyProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    //used to save all data from server
    const [allNotes, setAllNotes] = useState<AllGet200ResponseInner[]>(() => loadFromLocalStorage('allNotes', []))
    const [allNotesCopy, setAllNotesCopy] = useState<AllGet200ResponseInner[]>(() => loadFromLocalStorage('noteCopy', []))

    //useeffect to save data in localstorage when they change
    useEffect(() => {saveToLocalStorage("allNotes", allNotes)}, [allNotes]);
    useEffect(() => {saveToLocalStorage("noteCopy", allNotesCopy)}, [allNotesCopy]);
    
    
    return (
        <NotesContext.Provider value={{
                allNotes, 
                setAllNotes, 
                allNotesCopy,
                setAllNotesCopy
            }}>
            {children}
        </NotesContext.Provider>
    );

}
