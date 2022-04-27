package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.jupiter.api.Test;

public class TestEditPlantInfo {
    @Test
    public void provideAllInfo() throws Exception {
//        TestingUtils.createUserAndExpect("editorUser",
//                "editorUser@test.com",
//                "editorUser",
//                201);

        TestingUtils.updatePlantAndExpect("editorUser",
                574,
                "https://upload.wikimedia.org/wikipedia/commons/b/b9/Utricularia_pusilla_Vahl_-_Flickr_-_Alex_Popovkin%2C_Bahia%2C_Brazil_%288%29.jpg",
                "H",
                "A",
                5,
                2,
                54,
                "E",
                200);
    }

    @Test
    public void provideSomeInfo() throws Exception {
        TestingUtils.updatePlantAndExpect("editorUser",
                584,
                "https://upload.wikimedia.org/wikipedia/commons/4/47/Valeriana_californica.jpg",
                "n/a",
                "n/a",
                4,
                3,
                64,
                "n/a",
                200);
    }
}
