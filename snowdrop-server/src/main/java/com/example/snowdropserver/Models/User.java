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

    @Column(name="user_name")
    String userName;

    String email;

    @Column(name = "password_hash")
    String passwordHash;

    @Column(name="total_points")
    int totalPoints;

    @Column(name="auth_token_hash")
    String authTokenHash;

    // Google OAuth specific fields
    @Column(name="google_id")
    String googleID;

    @OneToMany(mappedBy = "user")
    private List<PlantCare> plants;

    @OneToMany(mappedBy = "sender")
    private List<Post> posts;

    @OneToMany(mappedBy = "sender")
    private List<Comment> comments;

}
