package com.example.snowdropserver.integration.plants;

import com.example.snowdropserver.integration.TestingUtils;
import liquibase.command.core.UpdateTestingRollbackCommandStep;
import liquibase.pro.packaged.T;
import org.junit.jupiter.api.Test;

public class PopulateDatabase {
    @Test
    public void populateDatabase() throws Exception {
        TestingUtils.addNewPlant("shrubby Indian mallow",
                "Abutilon abutiloides (Jacq.) Garcke ex Hochr.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG%22",
                "L",
                "A",
                7,
                20,
                3,
                201);
        TestingUtils.addNewPlant("abietinella moss",
                "Abietinella abietina (Hedw.) Fleisch.",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Abietinella_abietina_0293.JPG%22",
                "M",
                "A",
                3,
                -4,
                1,
                201);
        TestingUtils.addNewPlant("Ramshaw Meadows sand verbena",
                "Abronia alpina Brandegee",
                "https://upload.wikimedia.org/wikipedia/commons/b/be/Abronia_alpina_%28Ramshaw_Meadows_sand-verbena%29.jpg",
                "VL",
                "A",
                7,
                30,
                3,
                201);
        TestingUtils.addNewPlant("silver fir",
                "Abies alba Mill.",
                "https://upload.wikimedia.org/wikipedia/commons/2/2f/Abies_alba_Wis%C5%82a_1.jpg",
                "L",
                "N",
                4,
                16,
                2,
                201);
        TestingUtils.addNewPlant("Pacific silver fir",
                "Abies amabilis (Douglas ex Loudon) Douglas ex Forbes",
                "https://upload.wikimedia.org/wikipedia/commons/c/c5/Abies_amabilis_26395.JPG",
                "L",
                "B",
                1,
                16,
                1,
                201);
        TestingUtils.addNewPlant("Amelia's sand verbena",
                "Abronia ameliae Lundell",
                "https://upload.wikimedia.org/wikipedia/commons/1/13/Abronia_ameliae_1.jpg",
                "M",
                "A",
                5,
                14,
                2,
                201);
        TestingUtils.addNewPlant("Wyoming sand verbena",
                "Abronia ammophila Greene",
                "https://upload.wikimedia.org/wikipedia/commons/e/e5/Abronia_ammophila.jpg",
                "M",
                "N",
                8,
                -5,
                3,
                201);
        TestingUtils.addNewPlant("purple sand verbena",
                "Abronia angustifolia Greene",
                "https://upload.wikimedia.org/wikipedia/commons/0/0a/Abronia_umbellata.jpg",
                "VL",
                "B",
                9,
                37,
                3,
                201);
        TestingUtils.addNewPlant("clay sand verbena",
                "Abronia argillosa S.L. Welsh & Goodrich",
                "https://upload.wikimedia.org/wikipedia/commons/5/57/Abronia_latifolia.jpg",
                "M",
                "A",
                8,
                45,
                3,
                201);
        TestingUtils.addNewPlant("Asian Indian mallow",
                "Abutilon auritum (Wall. ex Link) Sweet",
                "https://upload.wikimedia.org/wikipedia/commons/0/0e/B%C5%8D-%C3%A1-t%C3%BAn_%C3%AA_hoe.jpg",
                "L",
                "N",
                10,
                50,
                3,
                201);
        TestingUtils.addNewPlant("devil's-cotton",
                "Abroma augustum (L.) L. f.",
                "https://upload.wikimedia.org/wikipedia/commons/e/e3/O-lat_komal.jpg",
                "M",
                "N",
                6,
                35,
                3,
                201);
        TestingUtils.addNewPlant("bottle-palm",
                "Beaucarnea Lem.",
                "https://upload.wikimedia.org/wikipedia/commons/2/2c/Pataelefante.jpg",
                "VL",
                "B",
                5,
                50,
                2,
                201);
        TestingUtils.addNewPlant("sweetbush",
                "Bebbia (Benth.) Greene",
                "https://upload.wikimedia.org/wikipedia/commons/2/2f/Bebbia_juncea_var_aspera_4.jpg",
                "VL",
                "A",
                8,
                49,
                3,
                201);
        TestingUtils.addNewPlant("Texas greeneyes",
                "Berlandiera betonicifolia (Hook.) Small",
                "https://upload.wikimedia.org/wikipedia/commons/e/ef/Berlandiera_texana.jpg",
                "M",
                "A",
                4,
                20,
                2,
                201);
        TestingUtils.addNewPlant("northern birch",
                "Betula borealis Spach",
                "https://upload.wikimedia.org/wikipedia/commons/7/71/Betula_pubescens_-_Burgwald_002.jpg",
                "L",
                "A",
                8,
                39.2,
                3,
                201);
        TestingUtils.addNewPlant("Bull's coraldrops",
                "Besseya bullii (Eaton) Rydb.",
                "https://upload.wikimedia.org/wikipedia/commons/d/d3/Besseya_bullii.jpg",
                "VL",
                "B",
                6,
                15,
                3,
                201);
        TestingUtils.addNewPlant("American barberry",
                "Berberis canadensis Mill.",
                "https://upload.wikimedia.org/wikipedia/commons/9/9e/Berberis_canadiensis_RB.jpg",
                "L",
                "B",
                8,
                32,
                3,
                201);
        TestingUtils.addNewPlant("blackberry lily",
                "Belamcanda chinensis (L.) DC.",
                "https://upload.wikimedia.org/wikipedia/commons/9/90/Belamcanda_chinensis_2007.jpg",
                "H",
                "A",
                2,
                -10,
                1,
                201);
        TestingUtils.addNewPlant("sloughgrass",
                "Beckmannia Host",
                "https://upload.wikimedia.org/wikipedia/commons/4/4d/B._syzigachne.jpg",
                "H",
                "A",
                6,
                59,
                3,
                201);
        TestingUtils.addNewPlant("scarlet begonia",
                "Begonia coccinea Hook.",
                "https://upload.wikimedia.org/wikipedia/commons/3/37/Gardenology.org-IMG_2097_rbgs11jan.jpg",
                "L",
                "N",
                5,
                55,
                2,
                201);
        TestingUtils.addNewPlant("Siberian-tea",
                "Bergenia crassifolia (L.) Fritsch",
                "https://upload.wikimedia.org/wikipedia/commons/2/2d/Bergenia_crassifolia_a1.jpg",
                "VL",
                "B",
                4,
                -20,
                2,
                201);
        TestingUtils.addNewPlant("clubed begonia",
                "Begonia cucullata Willd.",
                "https://upload.wikimedia.org/wikipedia/commons/c/c6/Begonia_x_semperflorens%2C_Gustave_rouge.jpg",
                "M",
                "A",
                5,
                70,
                3,
                201);
        TestingUtils.addNewPlant("acutetip cup lichen",
                "Cladonia acuminata (Ach.) Norrlin",
                "https://upload.wikimedia.org/wikipedia/commons/1/1a/CladoniaSpec01.jpg",
                "H",
                "A",
                2,
                -31,
                2,
                201);
        TestingUtils.addNewPlant("bristly lovegrass",
                "Cladoraphis Franch.",
                "https://upload.wikimedia.org/wikipedia/commons/e/ec/Cladoraphis_cyperoides_-_Botanical_Garden_in_Kaisaniemi%2C_Helsinki_-_DSC03680.JPG",
                "L",
                "B",
                5,
                50,
                2,
                201);
        TestingUtils.addNewPlant("yellowwood",
                "Cladrastis Raf.",
                "https://upload.wikimedia.org/wikipedia/commons/6/64/Cladrastis-kentukea-00.JPG",
                "M",
                "N",
                7,
                -22,
                3,
                201);
        TestingUtils.addNewPlant("whitehair leather flower",
                "Clematis albicoma Wherry",
                "https://upload.wikimedia.org/wikipedia/commons/7/70/Clematis_%27Nelly_Moser%27.JPG",
                "L",
                "N",
                4,
                45,
                3,
                201);
        TestingUtils.addNewPlant("echeandia",
                "Echeandia Ortega",
                "https://upload.wikimedia.org/wikipedia/commons/0/07/Echeandia_spp._%287555090394%29.jpg",
                "L",
                "B",
                5,
                5,
                3,
                201);
        TestingUtils.addNewPlant("purple coneflower",
                "Echinacea Moench",
                "https://upload.wikimedia.org/wikipedia/commons/b/b4/EchinaceaPurpureaMaxima1a.UME.JPG",
                "M",
                "N",
                6,
                65,
                3,
                201);
        TestingUtils.addNewPlant("Italian viper's bugloss",
                "Echium italicum L.",
                "https://upload.wikimedia.org/wikipedia/commons/5/57/Echium_italicum_0008.JPG",
                "M",
                "N",
                8,
                65,
                3,
                201);
        TestingUtils.addNewPlant("eclipta",
                "Eclipta L.",
                "https://upload.wikimedia.org/wikipedia/commons/5/54/Eclipta_prostrata_in_AP_W2_IMG_9785.jpg",
                "L",
                "N",
                7,
                68,
                3,
                201);
        TestingUtils.addNewPlant("hatiora",
                "Hatiora Britton & Rose",
                "https://upload.wikimedia.org/wikipedia/commons/6/66/Hatiora_saliscornioides_BlKakteenT95.jpg",
                "M",
                "A",
                3,
                54,
                1,
                201);
        TestingUtils.addNewPlant("havardia",
                "Havardia Small",
                "https://upload.wikimedia.org/wikipedia/commons/0/0d/Havardia_mexicana_-_Palmengarten_Frankfurt_-_DSC01730.JPG",
                "L",
                "B",
                4,
                17.1,
                2,
                201);
        TestingUtils.addNewPlant("beggarslice",
                "Hackelia virginiana (L.) I.M. Johnst.",
                "https://upload.wikimedia.org/wikipedia/commons/9/94/Hackelia_virginiana_002.JPG",
                "L",
                "A",
                6,
                65,
                3,
                201);
        TestingUtils.addNewPlant("American witchhazel",
                "American witchhazel",
                "https://upload.wikimedia.org/wikipedia/commons/e/ea/Hamamelis_virginiana_FlowersLeaves_BotGardBln0906.JPG",
                "M",
                "N",
                5,
                -10,
                2,
                201);
        TestingUtils.addNewPlant("coral-pea",
                "Hardenbergia violacea (Schneev.) Stearn",
                "https://upload.wikimedia.org/wikipedia/commons/5/5e/Wild-growing-Hardenbergia-violacea-2.jpeg",
                "M",
                "B",
                7,
                24,
                3,
                201);
    }

    @Test
    public void dummyData() throws Exception {
        TestingUtils.addNewPlant("silver bird's-foot trefoil",
                "Lotus argophyllus (A. Gray) Greene var. argenteus Dunkl",
                "https://upload.wikimedia.org/wikipedia/commons/0/09/Acmispon_argophyllus_var._argophyllus_002.jpg",
                "H",
                "A",
                4,
                20,
                2,
                201);
        TestingUtils.addNewPlant("canyon bird's-foot trefoil",
                "Lotus argyraeus (Greene) Greene var. argyraeus",
                "https://upload.wikimedia.org/wikipedia/commons/0/02/%28MHNT%29_Lotus_corniculatus_-_Plant_habit.jpg",
                "M",
                "N",
                5,
                50,
                3,
                201);
        TestingUtils.addNewPlant("Santa Cruz Island silverhosackia",
                "Lotus argophyllus (A. Gray) Greene var. adsurgens Dunkle",
                "https://upload.wikimedia.org/wikipedia/commons/0/09/Acmispon_argophyllus_var._argophyllus_002.jpg",
                "H",
                "A",
                4,
                35,
                2,
                201);
        TestingUtils.addNewPlant("tapertip desertparsley",
                "Lomatium attenuatum Evert",
                "https://upload.wikimedia.org/wikipedia/commons/9/90/Lomatium_brandegeei_5.jpg",
                "M",
                "N",
                6,
                40,
                1,
                201);
        TestingUtils.addNewPlant("goldencrest",
                "Lophiola aurea Ker Gawl.",
                "https://upload.wikimedia.org/wikipedia/commons/d/df/Lone_cypress_in_17-mile-drive.jpg",
                "L",
                "B",
                8,
                65,
                3,
                201);
        TestingUtils.addNewPlant("lotononis",
                "Lotononis bainesii Baker",
                "https://upload.wikimedia.org/wikipedia/commons/d/d8/Lotononis_galpinii.jpg",
                "M",
                "A",
                4,
                45,
                2,
                201);
        TestingUtils.addNewPlant("loeskypnum moss",
                "Loeskypnum badium (Hartm.) Paul",
                "",
                "L",
                "B",
                3,
                50,
                2,
                201);
        TestingUtils.addNewPlant("Bentham's broom",
                "Lotus benthamii Greene",
                "https://upload.wikimedia.org/wikipedia/commons/c/c3/Bentham%27s_lotus.jpeg",
                "L",
                "N",
                2,
                45,
                3,
                201);
        TestingUtils.addNewPlant("Berlandier's lobelia",
                "Lobelia berlandieri A. DC.",
                "https://upload.wikimedia.org/wikipedia/commons/8/86/Lobelia_%28aka%29.jpg",
                "M",
                "A",
                5,
                10,
                1,
                201);
        TestingUtils.addNewPlant("Bradshaw's desertparsley",
                "Lomatium bradshawii (Rose ex Mathias) Mathias & Constance",
                "https://upload.wikimedia.org/wikipedia/commons/6/63/Lomatium_bradshawii_2.jpg",
                "M",
                "A",
                4,
                20,
                2,
                201);
        TestingUtils.addNewPlant("California cottonrose",
                "Logfia californica (Nutt.) Holub",
                "https://upload.wikimedia.org/wikipedia/commons/2/26/Filagocalifornica.jpg",
                "L",
                "A",
                5,
                35,
                1,
                201);
        TestingUtils.addNewPlant("California lomatium",
                "Lomatium californicum (Nutt.) Mathias & Constance",
                "https://upload.wikimedia.org/wikipedia/commons/8/87/Lomatium_californicum.jpeg",
                "M",
                "N",
                6,
                40,
                2,
                201);
        TestingUtils.addNewPlant("bluefly honeysuckle",
                "Lonicera caerulea L. var. cauriana (Fernald) B. Boivin",
                "https://upload.wikimedia.org/wikipedia/commons/6/62/Lonicera_coerulea_a3.jpg",
                "H",
                "A",
                4,
                50,
                1,
                201);
        TestingUtils.addNewPlant("purpleflower honeysuckle",
                "Lonicera conjugialis Kellogg",
                "https://upload.wikimedia.org/wikipedia/commons/2/29/Lonicera_conjugialis_%28purpleflower_honeysuckle%29_%285991510753%29.jpg",
                "M",
                "A",
                5,
                35,
                2,
                201);
        TestingUtils.addNewPlant("island broom",
                "Lotus dendroideus (Greene) Greene",
                "https://upload.wikimedia.org/wikipedia/commons/b/bb/Lotusdendroideusdend.jpg",
                "L",
                "B",
                6,
                65,
                3,
                201);
        TestingUtils.addNewPlant("fernleaf biscuitroot",
                "Lomatium dissectum (Nutt.) Mathias & Constance",
                "https://upload.wikimedia.org/wikipedia/commons/b/b1/Lomatium_dissectum_4248.JPG",
                "L",
                "B",
                8,
                65,
                2,
                201);
        TestingUtils.addNewPlant("fernleaf biscuitroot",
                "Lomatium dissectum (Nutt.) Mathias & Constance var. dissectum",
                "https://upload.wikimedia.org/wikipedia/commons/a/a7/Lomatium_utriculatum_6416.JPG",
                "M",
                "N",
                6,
                45,
                2,
                201);
        TestingUtils.addNewPlant("Waihanau lobelia",
                "Lobelia dunbarii Rock ssp. dunbarii",
                "https://upload.wikimedia.org/wikipedia/commons/7/7e/Lobelia_niihauensis_%285762180787%29.jpg",
                "H",
                "A",
                4,
                30,
                2,
                201);
        TestingUtils.addNewPlant("northern biscuitroot",
                "Lomatium farinosum (Hook.) J.M. Coult. & Rose var. farinosum",
                "https://upload.wikimedia.org/wikipedia/commons/9/95/Lomatium_farinosum_var._hambleniae_2.jpg",
                "L",
                "A",
                3,
                45,
                2,
                201);
        TestingUtils.addNewPlant("Baja birdbush",
                "Ornithostaphylos oppositifolia (Parry) Small",
                "https://upload.wikimedia.org/wikipedia/commons/4/45/Ornithostaphylos_oppositifolia_32527264.jpg",
                "M",
                "N",
                4,
                33,
                2,
                201);
    }

    @Test
    public void addTags() throws Exception {
        TestingUtils.addTagAndExpect(4,
                201);

        TestingUtils.addTagAndExpect(14,
                201);

        TestingUtils.addTagAndExpect(24,
                201);

        TestingUtils.addTagAndExpect(34,
                201);

        TestingUtils.addTagAndExpect(44,
                201);

        TestingUtils.addTagAndExpect(54,
                201);

        TestingUtils.addTagAndExpect(64,
                201);

        TestingUtils.addTagAndExpect(74,
                201);

        TestingUtils.addTagAndExpect(84,
                201);

        TestingUtils.addTagAndExpect(94,
                201);

        TestingUtils.addTagAndExpect(104,
                201);

        TestingUtils.addTagAndExpect(114,
                201);

        TestingUtils.addTagAndExpect(124,
                201);

        TestingUtils.addTagAndExpect(134,
                201);

        TestingUtils.addTagAndExpect(144,
                201);

        TestingUtils.addTagAndExpect(154,
                201);

        TestingUtils.addTagAndExpect(164,
                201);

        TestingUtils.addTagAndExpect(174,
                201);

        TestingUtils.addTagAndExpect(184,
                201);

        TestingUtils.addTagAndExpect(194,
                201);

        TestingUtils.addTagAndExpect(204,
                201);

        TestingUtils.addTagAndExpect(214,
                201);

        TestingUtils.addTagAndExpect(224,
                201);

        TestingUtils.addTagAndExpect(234,
                201);

        TestingUtils.addTagAndExpect(244,
                201);

        TestingUtils.addTagAndExpect(254,
                201);

        TestingUtils.addTagAndExpect(264,
                201);

        TestingUtils.addTagAndExpect(274,
                201);

        TestingUtils.addTagAndExpect(284,
                201);

        TestingUtils.addTagAndExpect(294,
                201);

        TestingUtils.addTagAndExpect(304,
                201);

        TestingUtils.addTagAndExpect(314,
                201);

        TestingUtils.addTagAndExpect(324,
                201);

        TestingUtils.addTagAndExpect(334,
                201);

        TestingUtils.addTagAndExpect(344,
                201);

        TestingUtils.addTagAndExpect(354,
                201);

        TestingUtils.addTagAndExpect(364,
                201);

        TestingUtils.addTagAndExpect(374,
                201);

        TestingUtils.addTagAndExpect(384,
                201);

        TestingUtils.addTagAndExpect(394,
                201);

        TestingUtils.addTagAndExpect(404,
                201);

        TestingUtils.addTagAndExpect(414,
                201);

        TestingUtils.addTagAndExpect(424,
                201);

        TestingUtils.addTagAndExpect(434,
                201);

        TestingUtils.addTagAndExpect(444,
                201);

        TestingUtils.addTagAndExpect(454,
                201);

        TestingUtils.addTagAndExpect(464,
                201);

        TestingUtils.addTagAndExpect(474,
                201);

        TestingUtils.addTagAndExpect(484,
                201);

        TestingUtils.addTagAndExpect(494,
                201);

        TestingUtils.addTagAndExpect(504,
                201);

        TestingUtils.addTagAndExpect(514,
                201);

        TestingUtils.addTagAndExpect(524,
                201);

        TestingUtils.addTagAndExpect(534,
                201);

        TestingUtils.addTagAndExpect(544,
                201);
    }
}
