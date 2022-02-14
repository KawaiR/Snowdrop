package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    String postTitle;
    LocalDateTime uploadDate;
    String content;

    int totalScore;
    int upvotes;
    int downvotes;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    User poster;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    Tag tag;

    @OneToMany(mappedBy = "parent")
    List<Comment> children;

    //TODO: ONE-TO-MANY MAPPING between tags and posts

}
