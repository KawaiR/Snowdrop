package com.example.snowdropserver.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String username;
    String email;
    String passwordHash;

    int totalPoints;

    @OneToMany(mappedBy = "owner")
    private List<Plant> plants;

    @OneToMany(mappedBy = "poster")
    private List<Post> posts;

    @OneToMany(mappedBy = "commenter")
    private List<Comment> comments;

}
