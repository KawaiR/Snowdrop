package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestAddNewPlant {
    @Test
    public void addPlantSuccess() throws Exception {
        TestingUtils.addNewPlant("abietinella moss",
                "Abietinella abietina (Hedw.) Fleisch.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG",
                200);
    }

    @Test
    public void addDuplicatePlantFailure() throws Exception {
        TestingUtils.addNewPlant("abietinella moss",
                "Abietinella abietina (Hedw.) Fleisch.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG",
                200);
        TestingUtils.addNewPlant("abietinella moss",
                "Abietinella abietina (Hedw.) Fleisch.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG",
                400);
    }
}
