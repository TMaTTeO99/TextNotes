package com.example.TextNotes.myservice;

import com.example.TextNotes.exceptions.InvalidBodyException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.example.TextNotes.repo.MyRepo;
import com.example.TextNotes.resources.MyNote;

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

        //i check if the note is not empty to avoid to save empty data
        if (title == null || title.isEmpty() || content == null || content.isEmpty()) {
            throw new InvalidBodyException("Title and Content Must Be Not Empty");
        }

        return myRepo.save(note);
    }


}
