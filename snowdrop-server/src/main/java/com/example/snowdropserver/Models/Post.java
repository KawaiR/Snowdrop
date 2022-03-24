package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name="post_title")
    String postTitle;
    @Column(name = "upload_date")
    LocalDateTime uploadDate;
    String content;

    @Column(name="total_score")
    int totalScore;
    int upvotes;
    int downvotes;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @ToString.Exclude
    User sender;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    Tag tag;

    @OneToMany(mappedBy = "parent")
    List<Comment> children;

    //TODO: ONE-TO-MANY MAPPING between tags and posts

}
