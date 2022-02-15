package com.example.snowdropserver.integration;

import com.example.snowdropserver.Models.Domains.AddUserDomain;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;


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
}
