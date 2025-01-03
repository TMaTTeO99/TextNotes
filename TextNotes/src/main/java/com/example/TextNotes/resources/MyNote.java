package com.example.TextNotes.resources;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;

import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

/**
 * @author : TMaTTeO99
 */


@Entity
@Table(name = "notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class MyNote {
    @Id
    @UuidGenerator
    @Column(name = "ID", unique = true, updatable = false)
    private String ID;
    private String title;
    private String author;
    private String date;
    private String content;
}
