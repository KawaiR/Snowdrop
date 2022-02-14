package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    LocalDateTime uploadDate;
    String content;

    int totalScore;
    int upvotes;
    int downvotes;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    User commenter;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    Post parent;
}
