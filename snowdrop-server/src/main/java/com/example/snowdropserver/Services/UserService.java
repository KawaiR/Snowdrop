package com.example.snowdropserver.Services;

import com.example.snowdropserver.Exceptions.*;
import com.example.snowdropserver.Models.*;
import com.example.snowdropserver.Models.Domains.*;
import com.example.snowdropserver.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.google.common.hash.Hashing;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
@EnableScheduling
public class UserService {
    private final UserRepository userRepository;
    private final ResetTokenRepository resetTokenRepository;
    private final JavaMailSender javaMailSender;
    private final PlantRepository plantRepository;
    private final PlantCareRepository plantCareRepository;
    private final PostRepository postRepository;
    private final DeviceRepository deviceRepository;
    private final CommentRepository commentRepository;
    private final UserPostMappingsRepository userPostMappingsRepository;

    private static final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe

    // this autowired annotation is magic that will link the correct repository into this constructor to make the service
    @Autowired
    public UserService(UserRepository userRepository, ResetTokenRepository resetTokenRepository, JavaMailSender javaMailSender, PlantRepository plantRepository, PlantCareRepository plantCareRepository, PostRepository postRepository, DeviceRepository deviceRepository, CommentRepository commentRepository, UserPostMappingsRepository userPostMappingsRepository) {
        this.userRepository = userRepository;
        this.resetTokenRepository = resetTokenRepository;
        this.javaMailSender = javaMailSender;
        this.plantRepository = plantRepository;
        this.plantCareRepository = plantCareRepository;
        this.postRepository = postRepository;
        this.deviceRepository = deviceRepository;
        this.commentRepository = commentRepository;
        this.userPostMappingsRepository = userPostMappingsRepository;
    }

    public List<User> getAllUsers() {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        return userRepository.findAll();
    }

    public Optional<User> getUserByGoogleId(AddGoogleUserDomain userDomain) {
        // this is the logic for the controller endpoint -- it's a simple service so there isn't much logic
        Optional<User> user = userRepository.getByGoogleID(userDomain.getGoogleID());
        if (user.isEmpty()) {
            System.out.println("There's no user registered with the data you entered.");
            throw new UserNotFoundException();
        }
        return user;
    }

    // Adds a user to the database
    public AuthConfirmDomain addUser(AddUserDomain userDomain) {
        if (check_username_exists(userDomain.getUserName())) {
            System.out.println("username found");
            throw new DuplicateUsernameException();
        }

        if (check_email_exists(userDomain.getEmail())) {
            System.out.println("email found");
            throw new DuplicateEmailException();
        }

        if (userDomain.getPassword().length() < 8) {
            System.out.println("length is less than 8 characters");
            throw new PasswordTooShortException();
        }

        // hash password before storing it into the database
        String passwordSha256hash = hash(userDomain.getPassword());

        // main idea to associate a token with each login for better security
        String authToken = generateNewToken();
        String authTokenHash = hash(authToken);

        User user = User.builder()
                .email(userDomain.getEmail())
                .passwordHash(passwordSha256hash)
                .userName(userDomain.getUserName())
                .authTokenHash(authTokenHash)
                .googleID(null)
                .totalPoints(0)
                .expertiseLevel("Novice")
                .editorPrivilege(0)
                .build();

        userRepository.save(user); // will save into database

        // value returned will interact with the front-end
        return AuthConfirmDomain.builder()
                .authTokenHash(authTokenHash)
                .userName(user.getUserName())
                .build();

    }

    // Adds a user to the database
    public AuthConfirmDomain addGoogleUser(AddGoogleUserDomain userDomain) {
        if (check_username_exists(userDomain.getUserName())) {
            System.out.println("username found");
            throw new DuplicateUsernameException();
        }

        if (check_google_exists(userDomain.getGoogleID())) {
            System.out.println("google id found");
            throw new DuplicateEmailException();
        }


        // main idea to associate a token with each login for better security
        String authToken = generateNewToken();
        String authTokenHash = hash(authToken);

        User user = User.builder()
                .email(null)
                .passwordHash(null)
                .userName(userDomain.getUserName())
                .authTokenHash(authTokenHash)
                .googleID(userDomain.getGoogleID())
                .totalPoints(0)
                .expertiseLevel("Novice")
                .build();

        userRepository.save(user); // will save into database

        // value returned will interact with the front-end
        return AuthConfirmDomain.builder()
                .authTokenHash(authTokenHash)
                .userName(user.getUserName())
                .build();

    }

    public AuthConfirmDomain login(LoginDomain loginDomain) {
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

            return AuthConfirmDomain.builder()
                    .authTokenHash(authTokenHash)
                    .userName(user.getUserName())
                    .userId(user.getId())
                    .build();
        }
    }

    public void forgotPassword(SendResetTokenDomain sendResetTokenDomain) {
        System.out.println(sendResetTokenDomain.getEmail());

        // check if user exists
        Optional<User> maybeUser = userRepository.getByEmail(sendResetTokenDomain.getEmail());

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
        simpleMailMessage.setText("Here's the pin to sign into your account: " + resetTokenPin);
        simpleMailMessage.setFrom("snowdrop.plantapp@gmail.com");
        javaMailSender.send(simpleMailMessage);

        System.out.println("Successfully sent email.");
    }

    public void updateForgottenPassword(ChangeForgottenDomain changeForgottenDomain) {
        // check if user exists
        Optional<User> maybeUser = userRepository.getByEmail(changeForgottenDomain.getEmail());

        if (!maybeUser.isPresent()) {
            System.out.println("Email not registered.");
            throw new EmailNotFoundException();
        }

        if (changeForgottenDomain.getNewPassword().length() < 8) {
            System.out.println("length is less than 8 characters");
            throw new PasswordTooShortException();
        }

        User user = maybeUser.get();

        // check if the reset token entered is valid
        Optional<ResetToken> maybeResetToken = resetTokenRepository.
                findByHashedTokenAndUser(hash(changeForgottenDomain.getResetToken()), user);

        // throw error if not found
        if (!maybeResetToken.isPresent()) {
            System.out.println("Token entered is invalid or expired.");
            throw new InvalidResetToken();
        }

        // retrieve token from database
        ResetToken resetToken = maybeResetToken.get();

        // remove reset token from database
        resetTokenRepository.delete(resetToken);
        user.setPasswordHash(hash(changeForgottenDomain.getNewPassword()));

        // update user info in database
        userRepository.save(user);
        System.out.println("Password updated!");
    }

    // Assumes old password was validated prior to this function call
    public void updatePassword(UpdatePasswordDomain updatePasswordDomain) {
        // check if user exists
        Optional<User> maybeUser = userRepository.getByEmail(updatePasswordDomain.getEmail());

        if (!maybeUser.isPresent()) {
            System.out.println("Email not registered.");
            throw new EmailNotFoundException();
        }

        User user = maybeUser.get();

        ValidatePasswordDomain validatePasswordDomain = ValidatePasswordDomain.builder()
                .password(updatePasswordDomain.getOldPassword())
                .email(updatePasswordDomain.getEmail())
                .build();

        if (!validate_password(validatePasswordDomain)) {
            System.out.println("Password entered is invalid");
            throw new InvalidPasswordException();
        }

        user.setPasswordHash(hash(updatePasswordDomain.getNewPassword()));

        // update user info in database
        userRepository.save(user);
        System.out.println("Password updated!");
    }


    public void changeEmail(SendResetTokenDomain sendResetTokenDomain) {
        System.out.println(sendResetTokenDomain.getEmail());

        // check if user exists
        Optional<User> maybeUser = userRepository.getByEmail(sendResetTokenDomain.getEmail());

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
        simpleMailMessage.setSubject("[SNOWDROP PLANT APP] Change Your Email");
        simpleMailMessage.setText("Here's the pin to change your email: " + resetTokenPin);
        simpleMailMessage.setFrom("snowdrop.plantapp@gmail.com");
        javaMailSender.send(simpleMailMessage);

        System.out.println("Successfully sent email.");
    }

    public void updateEmail(UpdateEmailDomain updateEmailDomain) {
        // check if user exists
        Optional<User> maybeUser = userRepository.getByEmail(updateEmailDomain.getOldEmail());

        if (!maybeUser.isPresent()) {
            System.out.println("Email not registered.");
            throw new EmailNotFoundException();
        }

        User user = maybeUser.get();

        // check if the reset token entered is valid
        Optional<ResetToken> maybeResetToken = resetTokenRepository.
                findByHashedTokenAndUser(hash(updateEmailDomain.getEmailToken()), user);

        // throw error if not found
        if (!maybeResetToken.isPresent()) {
            System.out.println("Token entered is invalid or expired.");
            throw new InvalidResetToken();
        }

        // retrieve token from database
        ResetToken resetToken = maybeResetToken.get();

        // remove reset token from database
        resetTokenRepository.delete(resetToken);

        if (check_email_exists(updateEmailDomain.getNewEmail())) {
            System.out.println("New email already exists.");
            throw new DuplicateEmailException();
        }
        user.setEmail(updateEmailDomain.getNewEmail());

        System.out.println(user.getEmail());

        // update user info in database
        userRepository.save(user);
        System.out.println("Email updated!");

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject("[SNOWDROP PLANT APP] Your new email");
        simpleMailMessage.setText("The email for " + user.getUserName() + " was changed.");
        simpleMailMessage.setFrom("snowdrop.plantapp@gmail.com");
        javaMailSender.send(simpleMailMessage);
    }

    public UserInfoDomain getUserInfo(String username) {
        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("No user with this username was found.");
            throw new UserNotFoundException();
        }

        User user = maybeUser.get();
        UserInfoDomain userInfoDomain = UserInfoDomain.builder()
                .editorPrivilege(user.getEditorPrivilege())
                .email(user.getEmail())
                .username(user.getUserName())
                .totalPoints(user.getTotalPoints())
                .expertiseLevel(user.getExpertiseLevel())
                .build();

        return userInfoDomain;
    }

    public void makeEditor(String username) {
        User user = authenticate_user(username);

        if (!is_editor_candidate(user)) {
            System.out.println("This user is not a valid candidate.");
            throw new NotCandidateException();
        }

        // Grant editing privileges
        user.setEditorPrivilege(1);
        userRepository.save(user);
    }

    // executed every 15 minutes
    @Scheduled(fixedRate = 900000)
    public void removeExpiredTokens() {
        List<ResetToken> expiredTokens = resetTokenRepository.findByExpiryDate(LocalDateTime.now());

        for (ResetToken resetToken : expiredTokens) {
            resetTokenRepository.delete(resetToken);
        }

        System.out.println("Routine pin removal was performed at: " + LocalDateTime.now());
    }

    public User authenticate_user(String username) {
        Optional<User> maybeUser = userRepository.getByUserName(username);

        if (!maybeUser.isPresent()) {
            System.out.println("User not found.");
            throw new UserNotFoundException();
        }

        User user = maybeUser.get();

        return user;
    }

    public boolean check_username_exists(String username) {
        List<User> users = userRepository.findAllByUserName(username);
        return !users.isEmpty();
    }

    public boolean validate_password(ValidatePasswordDomain validatePasswordDomain) {
        Optional<User> maybeUser = userRepository.getByEmail(validatePasswordDomain.getEmail());

        if (!maybeUser.isPresent()) {
            System.out.println("Email not registered.");
            throw new EmailNotFoundException();
        }

        User user = maybeUser.get();

        String hashedPassword = hash(validatePasswordDomain.getPassword());

        if (!user.getPasswordHash().equals(hashedPassword)) {
            System.out.println("Incorrect password.");
            throw new InvalidPasswordException();
        }

        return true;
    }

    public boolean validate_reset_token(ValidateResetTokenDomain resetTokenDomain) {
        System.out.println(resetTokenDomain);
        System.out.println();

        System.out.println(hash(resetTokenDomain.getResetToken()));
        System.out.println(resetTokenRepository.findAll());

        Optional<User> maybeUser = userRepository.getByEmail(resetTokenDomain.getEmail());

        if (!maybeUser.isPresent()) {
            System.out.println("Email not registered.");
            throw new EmailNotFoundException();
        }
        User user = maybeUser.get();

        // check if the reset token entered is valid
        Optional<ResetToken> maybeResetToken = resetTokenRepository.
                findByHashedTokenAndUser(hash(resetTokenDomain.getResetToken()), user);

        // throw error if not found
        if (!maybeResetToken.isPresent()) {
            System.out.println("Token entered is invalid or expired.");
            throw new InvalidResetToken();
        }

        return true;
    }

    public User getUserByUserName(String username) {
        System.out.println("in userService: " + username);

        List<User> users = userRepository.findAllByUserName(username);
        System.out.println(users);

        Optional<User> maybeUser = userRepository.getByUserName(username);
        System.out.println(maybeUser);

        if (!maybeUser.isPresent()) {
            System.out.println("User not found.");
            throw new UserNotFoundException();
        }
        return maybeUser.get();
    }

    /*
     * pre-condition: user was authenticated and exists
     */
    public boolean level_up(User user) {
        int points = user.getTotalPoints();
        String currentLevel = user.getExpertiseLevel();
        boolean changedStatus = false;

        if (points <= 100 && !currentLevel.equals("Novice")) {
            user.setExpertiseLevel("Novice");
            changedStatus = true;
        } else if (points <= 1000 && !currentLevel.equals("Beginner")) {
            user.setExpertiseLevel("Beginner");
            changedStatus = true;
        } else if (points <= 5000 && !currentLevel.equals("Intermediate")) {
            user.setExpertiseLevel("Intermediate");
            changedStatus = true;
        } else if (points <= 10000 && !currentLevel.equals("Enthusiast")) {
            user.setExpertiseLevel("Enthusiast");
            changedStatus = true;
        } else if (points <= 100000 && !currentLevel.equals("Expert")) {
            user.setExpertiseLevel("Expert");
            changedStatus = true;
        } else if (points <= 500000 && !currentLevel.equals("Advanced")) {
            user.setExpertiseLevel("Advanced");
            changedStatus = true;
        }

        if (changedStatus) {
            user.setLeveledUp(1);
        }

        userRepository.save(user);

        return changedStatus;
    }

    public boolean check_level(String username) {
        User user = authenticate_user(username);

        if (user.getLeveledUp() == 1) {
            user.setLeveledUp(0);
            userRepository.save(user);
            return true;
        }

        return false;
    }

    public boolean is_editor_candidate(User user) {
        return user.getExpertiseLevel().equals("Advanced");
    }

    public boolean is_editor(User user) {
        return (user.getEditorPrivilege() == 1);
    }

    public boolean check_email_exists(String email) {
        List<User> users = userRepository.findAllByEmail(email);
        return !users.isEmpty();
    }

    public boolean check_google_exists(String idToken) {
        List<User> users = userRepository.findAllByGoogleID(idToken);
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
    /*
    public List<PlantCare> plantForUser(AuthConfirmDomain domain) {
        Optional<User> user = userRepository.getByUserName(domain.getUserName());
        return user.get().getPlants();
    }
    */

    @PostConstruct
    public void init() {
        Optional<User> maybeUser = userRepository.getByUserName("anonymous");
        if (!maybeUser.isPresent()) {
            User user = User.builder()
                    .email(null)
                    .passwordHash(null)
                    .userName("anonymous")
                    .authTokenHash(null)
                    .googleID(null)
                    .totalPoints(0)
                    .expertiseLevel("")
                    .editorPrivilege(0)
                    .build();
            userRepository.save(user);
        }
    }

    public void deleteUser(String username) {
        Optional<User> maybeUser = userRepository.getByUserName(username);
        if (!maybeUser.isPresent()) {
            System.out.println("User not found.");
            throw new EmailNotFoundException();
        }
        User user = maybeUser.get();
        Optional<User> maybeAnonymousUser = userRepository.getByUserName("anonymous");
        if (!maybeAnonymousUser.isPresent()) {
            System.out.println("User not found.");
            throw new EmailNotFoundException();
        }
        User anonymousUser = maybeAnonymousUser.get();
        // delete all the plantCare Information of the user
        for (PlantCare plantCare: plantCareRepository.getByUser(user)) {
            plantCareRepository.delete(plantCare);
        }
        for (Device device: deviceRepository.getByUser(user)) {
            deviceRepository.delete(device);
        }
        for (Post post: postRepository.getBySender(user)) {
            post.setSender(anonymousUser);
            postRepository.save(post);
        }
        for (Comment comment: commentRepository.getBySender(user)) {
            comment.setSender(anonymousUser);
            commentRepository.save(comment);
        }
        for (UserPostMappings userPostMapping : userPostMappingsRepository.findByUser(user)) {
            userPostMapping.setUser(anonymousUser);
            userPostMappingsRepository.save(userPostMapping);
        }
        userRepository.delete(userRepository.getByUserName(username).get());
    }

}


//        Optional<User> maybeAnonymousUser = userRepository.getByUserName("anonymous");
//        if (!maybeAnonymousUser.isPresent()) {
//            AddUserDomain domain = AddUserDomain.builder().userName("anonymous").email("anonymous").password("\t").build();
//            addUser(domain);
//            maybeAnonymousUser = userRepository.getByUserName("anonymous");
//        }
//        User anonymousUser = maybeAnonymousUser.get();
//        // set post sender to anonymous
//        for (Post post: postRepository.getBySender(user)) {
//            post.setSender();
//        }
//        // delete the user object
//        userRepository.delete(user);