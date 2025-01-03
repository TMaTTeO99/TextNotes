package com.example.TextNotes.errors;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorRespose {

    private String error;
    private int status;
    private long timestamp;
}
