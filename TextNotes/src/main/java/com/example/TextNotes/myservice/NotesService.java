package com.example.TextNotes.myservice;

import com.example.TextNotes.exceptions.InvalidBodyException;
import com.example.TextNotes.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.example.TextNotes.repo.MyRepo;
import com.example.TextNotes.resources.MyNote;

import java.util.Date;
import java.util.List;


@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class NotesService {


    //variable to access to my repo
    private final MyRepo myRepo;

    public MyNote createNote(MyNote note) throws InvalidBodyException {

        String title = note.getTitle();
        String content = note.getContent();

        //I check if the note is not empty to avoid to save empty data
        titleAndContentExists(title, content);

        note.setDate(new Date(System.currentTimeMillis()).toString());
        return myRepo.save(note);
    }

    public Page<MyNote> getAllSelectedNotes(int page, int size) {
        return myRepo.findAll(PageRequest.of(page, size));
    }
    public List<MyNote> getAllNotes() {
        return myRepo.findAll();
    }

    public MyNote deleteNote(String id) throws ResourceNotFoundException {

        if(!existsNote(id))
            throw new ResourceNotFoundException("Resource Not Exist");

        MyNote returnedNote = myRepo.findById(id).get();

        myRepo.deleteById(id);
        return returnedNote;
    }
    public MyNote updateNote(MyNote note) throws ResourceNotFoundException, InvalidBodyException {

        if(!existsNote(note.getID()))
            throw new ResourceNotFoundException("Resource Not Exist");

        String title = note.getTitle();
        String content = note.getContent();

        //I check if the note is not empty to avoid to save empty data
        titleAndContentExists(title, content);

        MyNote updatedNote = myRepo.findById(note.getID()).get();

        updatedNote.setTitle(note.getTitle());
        updatedNote.setContent(note.getContent());
        updatedNote.setDate(new Date(System.currentTimeMillis()).toString());
        updatedNote.setAuthor(note.getAuthor());

        return myRepo.save(updatedNote);
    }

    public boolean existsNote(String id) {
        return myRepo.existsById(id);
    }

    public void titleAndContentExists(String title, String content) throws InvalidBodyException {
        if (title == null || title.isEmpty() || content == null || content.isEmpty()) {
            throw new InvalidBodyException("Title and Content Must Be Not Empty");
        }
    }

}
