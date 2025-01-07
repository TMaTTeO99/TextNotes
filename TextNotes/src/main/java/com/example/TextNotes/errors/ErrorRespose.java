package com.example.TextNotes.errors;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatusCode;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class ErrorRespose {

    private String error;
    private HttpStatusCode status;
    private StackTraceElement[] stackTrace;
}
