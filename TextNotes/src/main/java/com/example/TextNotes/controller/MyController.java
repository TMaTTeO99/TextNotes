package com.example.TextNotes.controller;

import com.example.TextNotes.errors.ErrorRespose;
import com.example.TextNotes.exceptions.InvalidBodyException;
import com.example.TextNotes.exceptions.ResourceNotFoundException;
import com.example.TextNotes.myservice.NotesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.TextNotes.resources.MyNote;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/notes")
@RequiredArgsConstructor

@CrossOrigin(origins = "http://localhost:5174")
public class MyController {

    private final NotesService notesService;

    @PostMapping("/addNote")
    public ResponseEntity<MyNote> createNote(@RequestBody MyNote note) {

        try {
            return ResponseEntity.created(URI.create("/notes/IDnotes")).body(notesService.createNote(note));
        }
        catch (InvalidBodyException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @GetMapping("/selectedNumber")
    public ResponseEntity<Page<MyNote>> getAllSelectedNotes(@RequestParam(value = "page", defaultValue = "0") int page,
                                                            @RequestParam(value = "size", defaultValue = "10") int size) {

        return ResponseEntity.ok().body(notesService.getAllSelectedNotes(page, size));
    }

    @GetMapping("/all")
    public ResponseEntity<List<MyNote>> getAllNotes() {
        return ResponseEntity.ok().body(notesService.getAllNotes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MyNote> getNoteById(@PathVariable String id)  {

        try {
            return ResponseEntity.ok().body(notesService.getNotes(id));
        }
        catch (InvalidBodyException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MyNote> deleteNote(@PathVariable String id)   {

        try {
            return ResponseEntity.ok().body(notesService.deleteNote(id));
        }
        catch (ResourceNotFoundException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

    }

    @PutMapping("/updateNote")
    public ResponseEntity<MyNote> updateNote(@RequestBody MyNote note)   {

        try {
            return ResponseEntity.ok().body(notesService.updateNote(note));
        }
        catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
        catch (InvalidBodyException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

    }

    /**
     * Centralizated handler to send ResponseStatusException
     * @param e: Exception throwed
     */

    /*
    @ExceptionHandler(Exception.class)
    public void handleException(Exception e) {

        if (e instanceof InvalidBodyException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
        else if (e instanceof ResourceNotFoundException) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
        else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorRespose> handleResponseStatusException(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(new ErrorRespose(e.getMessage(), e.getStatusCode(), e.getStackTrace()));
    }
    */

}
