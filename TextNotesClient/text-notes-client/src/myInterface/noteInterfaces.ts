export interface NoteItemProps {

    content: string,
    title: string,
    data: string,
    //id: string, for debug
    //updateNotes: (newContent: string, newTitle: string) => void,
    deleteNote: () => void

}
export interface NoteDataFromServer {

    id?: string | null,
    title: string | null,
    author?: string | null,
    date?: string | null,
    content: string | null,

}
export interface HomeNoteProps {
    notes: NoteDataFromServer[];
}
