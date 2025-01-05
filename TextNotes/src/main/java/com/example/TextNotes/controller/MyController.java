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
    public ResponseEntity<MyNote> createNote(@RequestBody MyNote note) throws InvalidBodyException {
        return ResponseEntity.created(URI.create("/notes/IDnotes")).body(notesService.createNote(note));
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
    @DeleteMapping("/{id}")
    public ResponseEntity<MyNote> deleteNote(@PathVariable String id) throws ResourceNotFoundException {
        return ResponseEntity.ok().body(notesService.deleteNote(id));
    }

    @PutMapping("/updateNote")
    public ResponseEntity<MyNote> updateNote(@RequestBody MyNote note) throws ResourceNotFoundException, InvalidBodyException {
        return ResponseEntity.ok().body(notesService.updateNote(note));
    }


    @ExceptionHandler(InvalidBodyException.class)
    public ResponseEntity<ErrorRespose> handleInvalidBodyException(InvalidBodyException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorRespose(e.getMessage(), 400, new Date(System.currentTimeMillis())));
    }

}
