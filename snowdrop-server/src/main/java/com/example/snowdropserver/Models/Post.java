package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String title;
    LocalDateTime date;
    String content;

    int totalScore;
    int upVotes;
    int downVotes;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    User poster;

    //TODO: ONE-TO-MANY MAPPING between tags and posts

}
