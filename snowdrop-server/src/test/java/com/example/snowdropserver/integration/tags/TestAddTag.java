package com.example.snowdropserver.integration.tags;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestAddTag {
    @Test
    public void AddTagSuccess() throws Exception {
        TestingUtils.addTagAndExpect(4,
                201);
    }

    @Test
    public void AddDuplicateTag() throws Exception {
        TestingUtils.addTagAndExpect(4,
                400);
    }

    @Test
    public void AddTagFailure() throws Exception {
        TestingUtils.addTagAndExpect(-1, 400);
    }
}
