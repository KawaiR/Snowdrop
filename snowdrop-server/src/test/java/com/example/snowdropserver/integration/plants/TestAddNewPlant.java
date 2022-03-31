package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.integration.TestingUtils;
import org.junit.Test;

public class TestAddNewPlant {
    @Test
    public void addPlantSuccess() throws Exception {
        TestingUtils.addNewPlant("abietinella moss",
                "Abietinella abietina (Hedw.) Fleisch.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG",
                201);
    }

    @Test
    public void addPlant2Success() throws Exception {
        TestingUtils.addNewPlant("shrubby Indian mallow",
                "Abutilon abutiloides (Jacq.) Garcke ex Hochr.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG%22",
                201);
    }

    @Test
    public void addPlant3Success() throws Exception {
        TestingUtils.addNewPlant("Pacific silver fir",
                "Abies amabilis (Douglas ex Loudon) Douglas ex Forbes",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG%22",
                201);
    }


    @Test
    public void addDuplicatePlantFailure() throws Exception {
        TestingUtils.addNewPlant("abietinella moss",
                "Abietinella abietina (Hedw.) Fleisch.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG",
                201);
        TestingUtils.addNewPlant("abietinella moss",
                "Abietinella abietina (Hedw.) Fleisch.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG",
                400);
    }
}