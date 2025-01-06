import { NoteDataFromServer } from './myInterface/noteInterfaces';

export async function getAllNotes(): Promise<[NoteDataFromServer]> {
    
    const resp = await fetch('http://localhost:8080/notes/all', {
        method: 'GET'
    });
    if (!resp.ok){
        throw new Error("ERROR: status: " + resp.status);
    }
    const data: [NoteDataFromServer] = await resp.json();
    return data;

}

export async function deleteNoteInServer(id: string | undefined): Promise<NoteDataFromServer> {

    const resp = await fetch('http://localhost:8080/notes/' + id, {
        method: 'DELETE'
    });
    if (!resp.ok){
        throw new Error("ERROR: status: " + resp.status);
    }
    const data: NoteDataFromServer = await resp.json();
    return data;
    
}
export async function addNewNoteInServer(note: NoteDataFromServer) {
    
    const resp = await fetch('http://localhost:8080/notes/addNote' , {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(note)
    });
    if (!resp.ok){
        throw new Error("ERROR: status: " + resp.status);
    }
    const data: NoteDataFromServer = await resp.json();
    return data;

}
