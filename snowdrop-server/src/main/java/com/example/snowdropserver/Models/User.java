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

    public int getId() {
        return id;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public List<PlantCare> getPlants() {
        return plants;
    }

    public String getAuthTokenHash() {
        return authTokenHash;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public String getEmail() {
        return email;
    }

    public String getGoogleID() {
        return googleID;
    }

    public String getUserName() {
        return userName;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public void setAuthTokenHash(String authTokenHash) {
        this.authTokenHash = authTokenHash;
    }

    public void setGoogleID(String googleID) {
        this.googleID = googleID;
    }

    public void setPlants(List<PlantCare> plants) {
        this.plants = plants;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
