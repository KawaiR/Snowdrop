package com.example.snowdropserver.integration;

import com.example.snowdropserver.Models.Domains.*;
import com.example.snowdropserver.Models.PlantCare;
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


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class TestingUtils {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final String baseUrl = "http://localhost:8080";

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
}
