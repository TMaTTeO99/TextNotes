export interface NoteItemProps {

    content: string | undefined,
    title: string | undefined,
    data?: string | null,
    myOnClick: () => void,
    deleteNote: () => void

}
export interface NoteDataFromServer {

    id?: string ,
    title: string | null,
    author?: string | null,
    date?: string | null,
    content: string | null,

}
export interface HomeNoteProps {
    notes: NoteDataFromServer[];
}
