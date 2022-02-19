package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.Models.Domains.ChangeForgottenDomain;
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

//NOTE: this class has to be manually changed each time it's tested
public class TestForgotPassword {


    @Test
    public void forgotPasswordSuccess() throws Exception {
        TestingUtils.createUserAndExpect("resetPassword",
                "razankawai99@gmail.com",
                "resetPassword",
                201);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("http://localhost:8080/users/razankawai99@gmail.com/forgot-password");

        StringEntity entity = new StringEntity("razankawai99@gmail.com");
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
        HttpPost httpPost = new HttpPost("http://localhost:8080/users/razankawai99@gmail.com/update-password");

        ChangeForgottenDomain changeForgottenDomain = ChangeForgottenDomain.builder()
                .resetToken("81270")
                .newPassword("updatePasswordSuccess")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(changeForgottenDomain);

        StringEntity entity = new StringEntity(json);
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
        client.close();
    }

    @Test
    public void TestLoginWithNewPassword() throws Exception {
        TestingUtils.loginAndExpect("razankawai99@gmail.com",
                "updatePasswordSuccess",
                200);
    }
}
