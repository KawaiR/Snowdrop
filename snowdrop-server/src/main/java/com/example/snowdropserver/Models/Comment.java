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

    @Column(name="upload_date")
    LocalDateTime uploadDate;
    String content;

    @Column(name="total_score")
    int totalScore;
    int upvotes;
    int downvotes;

    @ManyToOne(fetch = FetchType.EAGER)
    User sender;

    @ManyToOne(fetch = FetchType.EAGER)
    Post parent;
}
