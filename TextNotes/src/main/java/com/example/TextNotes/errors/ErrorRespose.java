package com.example.TextNotes.errors;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class ErrorRespose {

    private String error;
    private int status;
    private Date timestamp;
}
