package com.example.TextNotes.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.TextNotes.resources.MyNote;

import java.util.Optional;

@Repository
public interface MyRepo extends JpaRepository<MyNote, String> {
    Optional<MyNote> findById(String id);
}
