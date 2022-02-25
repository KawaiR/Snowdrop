package com.example.snowdropserver.integration;

import com.example.snowdropserver.Models.Domains.AddUserDomain;
import com.example.snowdropserver.Models.Domains.LoginDomain;
import com.example.snowdropserver.Models.Domains.UpdatePasswordDomain;
import com.example.snowdropserver.Models.Domains.ValidateResetTokenDomain;
import com.example.snowdropserver.Models.Domains.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;


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
                .passwordHash(password)
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

    public static void validateTokenAndExpect(ValidateResetTokenDomain resetTokenDomain, int expectedStatusCode) throws Exception {
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
}
