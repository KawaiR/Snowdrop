package com.example.snowdropserver.Models.Domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import javax.persistence.Column;

@Value
@Builder
@AllArgsConstructor
public class AddGoogleUserDomain {
    String googleID;
    String userName;

    public AddGoogleUserDomain() {
        this.googleID = "";
        this.userName = "";
    }
}