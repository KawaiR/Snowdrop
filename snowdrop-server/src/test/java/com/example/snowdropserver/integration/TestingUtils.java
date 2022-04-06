package com.example.snowdropserver.integration;

import com.example.snowdropserver.Models.Domains.*;
import com.example.snowdropserver.Models.PlantCare;
import com.example.snowdropserver.Models.Post;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.Assert;


import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class TestingUtils {
    private static final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule())
            .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    // private static final String baseUrl = "http://localhost:8080";
    private static final String baseUrl = "https://quiet-reef-93741.herokuapp.com";

    public static void createUserAndExpect(String username, String email,
                                           String password, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/users");

        AddUserDomain userDomain = AddUserDomain.builder()
                .userName(username)
                .email(email)
                .password(password)
                .build();

        System.out.println(userDomain);

        String json = objectMapper.writeValueAsString(userDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING ADDUSER REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();
    }

    public static void loginAndExpect(String email,
                                      String password, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/users/login");

        LoginDomain loginDomain = LoginDomain.builder()
                .email(email)
                .password(password)
                .build();

        System.out.println(loginDomain);

        String json = objectMapper.writeValueAsString(loginDomain);
        System.out.println(json);


        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING LOGIN REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();
    }

    public static void updatePasswordAndExpect(String email, String oldPassword,
                                               String newPassword, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/users/update-password");

        UpdatePasswordDomain updatePasswordDomain = UpdatePasswordDomain.builder()
                .email(email)
                .newPassword(newPassword)
                .oldPassword(oldPassword)
                .build();

        System.out.println(updatePasswordDomain);

        String json = objectMapper.writeValueAsString(updatePasswordDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING UPDATE PASSWORD REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();
    }

    public static void validateTokenAndExpect(ValidateResetTokenDomain resetTokenDomain,
                                              int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/users/validate-reset-token");

        System.out.println(resetTokenDomain);

        String json = objectMapper.writeValueAsString(resetTokenDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING VALIDATE TOKEN REQUEST REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();
    }

    public static void validatePasswordAndExpect(String email, String password,
                                                 int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/users/validate-password");

        ValidatePasswordDomain validatePasswordDomain = ValidatePasswordDomain.builder()
                        .password(password)
                        .email(email)
                        .build();

        System.out.println(validatePasswordDomain);

        String json = objectMapper.writeValueAsString(validatePasswordDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING VALIDATE PASSWORD REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();
    }

    public static PlantInfoDomain getPlantInfoAndExpect(int plantId, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpGet httpGet = new HttpGet(baseUrl + "/plants/" + plantId + "/get-plant-info");

        System.out.println(plantId);

        httpGet.setHeader("Accept", "application/json");
        httpGet.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING GET PLANT INFO REQUEST ****");
        CloseableHttpResponse response = client.execute(httpGet);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));

        PlantInfoDomain plantInfoDomain = null;

        if (expectedStatusCode == 200) {
            String jsonResponse = EntityUtils.toString(response.getEntity(), "UTF-8");
            System.out.println("Got response:\n" +
                    jsonResponse);
            plantInfoDomain = objectMapper.readValue(jsonResponse,
                    new TypeReference<PlantInfoDomain>() {
                    });
        }
        client.close();

        return plantInfoDomain;
    }

    public static int addNewPlant(String commonName, String scientificName, String plantImageUrl,
                                   String waterNeeds, String soilType, int sunlightLevel,
                                   double minTemperature, int reportedSunlight,
                                   int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/plants/add-new-plant");

        AddNewPlantDomain addNewPlantDomain = AddNewPlantDomain.builder()
                .commonName(commonName)
                .scientificName(scientificName)
                .plantImageUrl(plantImageUrl)
                .waterNeeds(waterNeeds)
                .soilType(soilType)
                .sunlightLevel(sunlightLevel)
                .minTemperature(minTemperature)
                .reportedSunlight(reportedSunlight)
                .build();

        System.out.println(addNewPlantDomain);

        String json = objectMapper.writeValueAsString(addNewPlantDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING ADD NEW PLANT REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);

        int plantId = -1;
        if (expectedStatusCode == 201) {
            plantId = Integer.parseInt(EntityUtils.toString(response.getEntity(), "UTF-8"));
        }

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();

        return plantId;
    }

    public static int addUserPlant(int plantId, String userName, String plantHealth, String nickname,
                                   int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/plants/" + plantId + "/add-plant");

        AddPlantDomain addPlantDomain = AddPlantDomain.builder()
                .plantHealth(plantHealth)
                .userName(userName)
                .nickname(nickname)
                .build();

        System.out.println(addPlantDomain);

        String json = objectMapper.writeValueAsString(addPlantDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING ADD USER PLANT REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        int plantCare = -1;
        if (expectedStatusCode == 201) {
            plantCare = Integer.parseInt(EntityUtils.toString(response.getEntity(), "UTF-8"));
        }

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();

        System.out.println("in helper function: " + plantCare);
        return plantCare;
    }

    public static UserPlantsDomain getUserPlantsAndExpect(String username, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpGet httpGet = new HttpGet(baseUrl + "/plants/" + username + "/get-user-plants");

        httpGet.setHeader("Accept", "application/json");
        httpGet.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING GET PLANT INFO REQUEST ****");
        CloseableHttpResponse response = client.execute(httpGet);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));

        UserPlantsDomain userPlantsDomain = null;

        if (expectedStatusCode == 200) {
            String jsonResponse = EntityUtils.toString(response.getEntity(), "UTF-8");
            System.out.println("Got response:\n" +
                    jsonResponse);
            userPlantsDomain = objectMapper.readValue(jsonResponse,
                    new TypeReference<UserPlantsDomain>() {
                    });
        }
        client.close();

        return userPlantsDomain;
    }

    public static void updateNickName(String username, int plantCareId, String nickname, int expectedStatusCode)
                                                                                                    throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/plants/" + username + "/update-nickname");

        SetNicknameDomain setNicknameDomain = SetNicknameDomain.builder()
                        .nickname(nickname)
                        .plantCareId(plantCareId)
                        .build();

        System.out.println(setNicknameDomain);

        String json = objectMapper.writeValueAsString(setNicknameDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING UPDATE NICKNAME REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();
    }

    public static WaterPlantDomain waterPlant(String username, int plantCareId, int expectedStatusCode)
            throws Exception {
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/plants/" + plantCareId + "/water-plant");

        LogWaterPlantDomain logWaterPlantDomain = LogWaterPlantDomain.builder()
                .username(username)
                .build();

        System.out.println(logWaterPlantDomain);

        String json = objectMapper.writeValueAsString(logWaterPlantDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING WATER PLANT REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        WaterPlantDomain futureWater = null;
        if (expectedStatusCode == 200) {
            String jsonResponse = EntityUtils.toString(response.getEntity(), "UTF-8");
            System.out.println(jsonResponse);
//            futureWater = objectMapper.readValue(jsonResponse,
//                    new TypeReference<WaterPlantDomain>() {
//                    });
        }

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();

        System.out.println("in helper function: " + futureWater);

        return futureWater;
    }

    public static void deletePlantAndExpect(String username, int plantCareId, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/plants/" + plantCareId + "/delete-plant");

        DeleteUserPlantDomain deleteUserPlantDomain = DeleteUserPlantDomain.builder()
                .username(username)
                .build();

        System.out.println(deleteUserPlantDomain);

        String json = objectMapper.writeValueAsString(deleteUserPlantDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING DELETE PLANT REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();
    }

    public static int createPostAndExpect(String username, String postTitle, String content, int plantId,
                                          int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/posts/create-post");

        System.out.println(username);
        System.out.println("in util function");

        CreatePostDomain createPostDomain = CreatePostDomain.builder()
                .username(username)
                .postTitle(postTitle)
                .content(content)
                .plantId(plantId)
                .build();

        System.out.println(createPostDomain);

        String json = objectMapper.writeValueAsString(createPostDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING CREATE POST REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);

        int postId = -1;
        if (expectedStatusCode == 201) {
            postId = Integer.parseInt(EntityUtils.toString(response.getEntity(), "UTF-8"));
        }

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();

        System.out.println("post created: " + postId);

        return postId;
    }

    public static int addTagAndExpect(int plantId, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/tags/" + plantId + "/add-tag");
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING ADD TAG REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);

        int tagId = -1;
        if (expectedStatusCode == 201) {
            tagId = Integer.parseInt(EntityUtils.toString(response.getEntity(), "UTF-8"));
        }

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();

        System.out.println("tag created: " + tagId);

        return tagId;
    }

    public static void voteAndExpect(int postId, String username, int upvote, int expectedStatusCode)
            throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(baseUrl + "/posts/" + postId + "/vote");
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        VoteOnPostDomain voteOnPostDomain = VoteOnPostDomain.builder()
                        .username(username)
                        .upvote(upvote)
                        .build();


        String json = objectMapper.writeValueAsString(voteOnPostDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        System.out.println("**** MAKING VOTE REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();
    }

    public static PostInfoDomain getPostInfoAndExpect(int postId, int expectedStatusCode) throws Exception {
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        CloseableHttpClient client = HttpClients.createDefault();

        HttpGet httpGet = new HttpGet(baseUrl + "/posts/" + postId + "/get-info");

        httpGet.setHeader("Accept", "application/json");
        httpGet.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING GET PLANT INFO REQUEST ****");
        CloseableHttpResponse response = client.execute(httpGet);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));

        PostInfoDomain postInfoDomain = null;

        if (expectedStatusCode == 200) {
            String jsonResponse = EntityUtils.toString(response.getEntity(), "UTF-8");
            System.out.println("Got response:\n" +
                    jsonResponse);
            postInfoDomain = objectMapper.readValue(jsonResponse,
                    new TypeReference<PostInfoDomain>() {
                    });
        }
        client.close();

        return postInfoDomain;
    }

    public static List<Post> getPostsByTagAndExpect(int tagId, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpGet httpGet = new HttpGet(baseUrl + "/posts/" + tagId + "/get-posts");

        httpGet.setHeader("Accept", "application/json");
        httpGet.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING GET POSTS BY TAG REQUEST ****");
        CloseableHttpResponse response = client.execute(httpGet);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));

        List<Post> posts = null;

        if (expectedStatusCode == 200) {
            String jsonResponse = EntityUtils.toString(response.getEntity(), "UTF-8");
            System.out.println("Got response:\n" +
                    jsonResponse);
            posts = objectMapper.readValue(jsonResponse,
                    new TypeReference<List<Post>>() {
                    });
        }
        client.close();

        return posts;
    }

    public static PlantCareInfoDomain getPlantCareInfoAndExpect(int plantCareId, int expectedStatusCode)
        throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpGet httpGet = new HttpGet(baseUrl + "/plant-care/" + plantCareId + "/get-info");

        httpGet.setHeader("Accept", "application/json");
        httpGet.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING GET PLANT CARE INFO REQUEST ****");
        CloseableHttpResponse response = client.execute(httpGet);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));

        PlantCareInfoDomain plantCareInfoDomain = null;

        if (expectedStatusCode == 200) {
            String jsonResponse = EntityUtils.toString(response.getEntity(), "UTF-8");
            System.out.println("Got response:\n" +
                    jsonResponse);
            plantCareInfoDomain = objectMapper.readValue(jsonResponse,
                    new TypeReference<PlantCareInfoDomain>() {
                    });
        }
        client.close();

        return plantCareInfoDomain;
    }

    public static boolean reportedExposureAndExpect(int plantCareId, String username,
                                                    int reportedExposure, int expectedStatusCode) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(baseUrl + "/plants/" + plantCareId + "/sunlight-exposure");
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        SunlightExposureDomain sunlightExposureDomain = SunlightExposureDomain.builder()
                .username(username)
                .reportedSunlight(reportedExposure)
                .build();

        String json = objectMapper.writeValueAsString(sunlightExposureDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        System.out.println("**** MAKING VOTE REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);

        boolean alert = false;

        if (expectedStatusCode == 200) {
            String jsonResponse = EntityUtils.toString(response.getEntity(), "UTF-8");
            System.out.println("Got response:\n" +
                    jsonResponse);
            alert = objectMapper.readValue(jsonResponse,
                    new TypeReference<Boolean>() {
                    });
        }

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();

        return alert;
    }

    public static int createCommentAndExpect(int postId, String username, String content, int expectedStatusCode)
            throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        HttpPost httpPost = new HttpPost(baseUrl + "/comments/" + postId + "/create-comment");

        System.out.println(username);
        System.out.println("in util function");

        CreateCommentDomain createCommentDomain = CreateCommentDomain.builder()
                .username(username)
                .content(content)
                .build();

        System.out.println(createCommentDomain);

        String json = objectMapper.writeValueAsString(createCommentDomain);
        System.out.println(json);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");


        System.out.println("**** MAKING CREATE POST REQUEST ****");
        CloseableHttpResponse response = client.execute(httpPost);

        int commentId = -1;
        if (expectedStatusCode == 201) {
            commentId = Integer.parseInt(EntityUtils.toString(response.getEntity(), "UTF-8"));
        }

        assertThat(response.getStatusLine().getStatusCode(), equalTo(expectedStatusCode));
        client.close();

        System.out.println("post created: " + commentId);

        return commentId;
    }
}
