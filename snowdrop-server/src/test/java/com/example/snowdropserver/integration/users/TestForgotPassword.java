package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.integration.TestingUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

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
}
