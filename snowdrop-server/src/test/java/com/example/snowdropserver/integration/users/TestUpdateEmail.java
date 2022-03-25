package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.Models.Domains.ChangeForgottenDomain;
import com.example.snowdropserver.Models.Domains.UpdateEmailDomain;
import com.example.snowdropserver.integration.TestingUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class TestUpdateEmail {

    /*
    @Test
    public void requestChangeSuccess() throws Exception {
        TestingUtils.createUserAndExpect("requestChangeSuccess",
                "razankawai99@hotmail.com",
                "requestChangeSuccess",
                201);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://localhost:8080/users/change-email-request");

        StringEntity entity = new StringEntity("razankawai99@hotmail.com");
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
        client.close();
    }

    @Test
    public void updatePasswordSuccess() throws Exception {

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://localhost:8080/users/update-email");

        UpdateEmailDomain updateEmailDomain = UpdateEmailDomain.builder()
                .oldEmail("razankawai99@hotmail.com")
                .newEmail("pyunj70@gmail.com")
                .emailToken("66027")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(updateEmailDomain);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
        client.close();
    }

    @Test
    public void loginWithNewEmailSuccess() throws Exception {
        TestingUtils.loginAndExpect("pyunj70@gmail.com",
                "requestChangeSuccess",
                200);
    }

    @Test
    public void updatePasswordFailure() throws Exception {

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://localhost:8080/users/update-email");

        UpdateEmailDomain updateEmailDomain = UpdateEmailDomain.builder()
                .oldEmail("pyunj70@gmail.com")
                .newEmail("kjdga;")
                .emailToken("10731")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(updateEmailDomain);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(400));
        client.close();
    }
     */
}
