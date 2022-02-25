package com.example.snowdropserver.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"plants", "posts", "comments"})
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

    @Column(name="editor_privilege")
    int editorPrivilege;

//    @OneToMany(mappedBy = "user")
//    @JsonManagedReference
//    @ToString.Exclude
//    private List<PlantCare> plants;

    @OneToMany(mappedBy = "sender")
    @ToString.Exclude
    private List<Post> posts;

    @OneToMany(mappedBy = "sender")
    @ToString.Exclude
    private List<Comment> comments;

    /*
    @Override
    public String toString() {
        return "User{" +
                "id:" + id +
                ",userName:" + userName +
                ",email:" + email +
                ",passwordHash:" + passwordHash +
                ",totalPoints:" + totalPoints +
                ",authTokenHash:" + authTokenHash +
                ",googleID:" + googleID +
                "}";
    }
     */
}
