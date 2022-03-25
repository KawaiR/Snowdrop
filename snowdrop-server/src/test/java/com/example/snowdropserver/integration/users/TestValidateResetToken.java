package com.example.snowdropserver.integration.users;

import com.example.snowdropserver.Models.Domains.ValidateResetTokenDomain;
import com.example.snowdropserver.integration.TestingUtils;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class TestValidateResetToken {
/*
    @Test
    public void sendTokenSuccess() throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("https://quiet-reef-93741.herokuapp.com/users/razankawai99@gmail.com/forgot-password");

        StringEntity entity = new StringEntity("razankawai99@gmail.com");
        httpPost.setEntity(entity);
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-type", "application/json");

        CloseableHttpResponse response = client.execute(httpPost);
        assertThat(response.getStatusLine().getStatusCode(), equalTo(200));
        client.close();
    }

    @Test
    public void validateTokenSuccess() throws Exception {
        ValidateResetTokenDomain validateResetTokenDomain = ValidateResetTokenDomain.builder()
                .email("razankawai99@gmail.com")
                .resetToken("14416")
                .build();
        TestingUtils.validateTokenAndExpect(validateResetTokenDomain,
                200);
    }

    @Test
    public void validateTokenFailure() throws Exception {
        ValidateResetTokenDomain validateResetTokenDomain = ValidateResetTokenDomain.builder()
                .email("razankawai99@gmail.com")
                .resetToken("0000")
                .build();
        TestingUtils.validateTokenAndExpect(validateResetTokenDomain,
                400);
    }
 */
}
