package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.*;
import com.example.snowdropserver.Models.Domains.AddUserDomain;
import com.example.snowdropserver.Models.Domains.LoginDomain;
import com.example.snowdropserver.Models.ResetToken;
import com.example.snowdropserver.Models.User;
import com.example.snowdropserver.Repositories.ResetTokenRepository;
import com.example.snowdropserver.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ResetTokenRepository resetTokenRepository;
    private final JavaMailSender javaMailSender;

    private static final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe

    // this autowired annotation is magic that will link the correct repository into this constructor to make the service
    @Autowired
    public UserService(UserRepository userRepository, ResetTokenRepository resetTokenRepository, JavaMailSender javaMailSender) {
        this.userRepository = userRepository;
        this.resetTokenRepository = resetTokenRepository;
        this.javaMailSender = javaMailSender;
    }

    public List<User> getAllUsers() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return userRepository.findAll();
    }

    // Adds a user to the database
    public AddUserDomain addUser(AddUserDomain userDomain) {
        if (check_username_exists(userDomain.getUserName())) {
            System.out.println("username found");
            throw new DuplicateUsernameException();
        }

        if (check_email_exists(userDomain.getEmail())) {
            System.out.println("email found");
            throw new DuplicateEmailException();
        }

        if (userDomain.getPasswordHash().length() < 8) {
            System.out.println("length is less than 8 characters");
            throw new PasswordTooShortException();
        }

        // hash password before storing it into the database
        String passwordSha256hash = hash(userDomain.getPasswordHash());

        User user = User.builder()
                .email(userDomain.getEmail())
                .passwordHash(passwordSha256hash)
                .userName(userDomain.getUserName())
                .authTokenHash(null)
                .comments(null)
                .totalPoints(0)
                .plants(null)
                .posts(null)
                .build();

        userRepository.save(user); // will save into database

        // value returned will interact with the front-end
        return AddUserDomain.builder()
                .email(user.getEmail())
                .passwordHash(user.getPasswordHash())
                .userName(user.getUserName())
                .build();

    }

    public String login(LoginDomain loginDomain) {
        Optional<User> maybeUser = userRepository.getByEmail(loginDomain.getEmail());

        if (!maybeUser.isPresent()) {
            System.out.println("no user found with this email");
            throw new EmailNotFoundException();
        }

        User user = maybeUser.get();
        String hashedPassword = hash(loginDomain.getPassword());

        if (!hashedPassword.equals(user.getPasswordHash())) {
            System.out.println("Password entered is incorrect");
            throw new InvalidPasswordException();
        } else {
            // main idea to associate a token with each login for better security
            String authToken = generateNewToken();
            String authTokenHash = hash(authToken);
            user.setAuthTokenHash(authTokenHash); // we store the hashed token in the database

            userRepository.save(user);

            return authToken;
        }
    }

    public void forgotPassword(String email) {
        System.out.println(email);

        // check if user exists
        Optional<User> maybeUser = userRepository.getByEmail(email);

        if (!maybeUser.isPresent()) {
            System.out.println("Email not registered.");
            throw new EmailNotFoundException();
        }

        User user = maybeUser.get();

        int resetTokenPin = (int) (Math.random() * 100000);

        // hash before storing in database for increased security
        String hashedToken = hash(Integer.toString(resetTokenPin));

        ResetToken resetToken = ResetToken.builder().
                hashedToken(hashedToken).
                expiryDate(LocalDateTime.now().plusMinutes(10)).
                user(user).
                build();

        resetTokenRepository.save(resetToken);

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject("[SNOWDROP PLANT APP] Forgot your password?");
        simpleMailMessage.setText("Here's the pin to sign into your account:" + resetTokenPin);
        simpleMailMessage.setFrom("snowdrop.plantapp@gmail.com");
        javaMailSender.send(simpleMailMessage);

        System.out.println("Successfully sent email.");
    }

    public boolean check_username_exists(String username) {
        List<User> users = userRepository.findAllByUserName(username);
        return !users.isEmpty();
    }


    public boolean check_email_exists(String email) {
        List<User> users = userRepository.findAllByEmail(email);
        return !users.isEmpty();
    }

    public static String generateNewToken() {
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

    public static String hash(String toHash) {
        return Hashing.sha256()
                .hashString(toHash, StandardCharsets.UTF_8)
                .toString();
    }
}
