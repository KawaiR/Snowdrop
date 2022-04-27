import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList, View, Text, Dimensions, TouchableOpacity, Alert, Image } from "react-native";
import { Appbar, Avatar } from 'react-native-paper';
import { SearchBar, Icon } from 'react-native-elements';
import { useIsFocused } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

const {
    width,
    height,
} = Dimensions.get("window");

const Tag_Search = ({ navigation }) => {
    const [search, setSearch] = React.useState("");
    const [dataSource, setDataSource] = React.useState([]);
    const [filteredDataSource, setFilteredDataSource] = React.useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getTags();
        }
    }, [isFocused]);

    let [fontsLoaded] = useFonts({
        Alata_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }

    function searchFilterFunction(text) {
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = dataSource.filter(function (item) {
                var itemData = "";
                if (item.tagName != null && item.scientificName != null) {
                    // Both name and scientific name are not null - Filter using either one
                    const itemName = item.tagName.toLowerCase();
                    const itemScientific = item.scientificName.toLowerCase();
                    const textData = text.toLowerCase();
                    return itemName.indexOf(textData) > -1 || itemScientific.indexOf(textData) > -1;
                } else if (item.tagName != null) {
                    // Only name is not null - filter using name
                    itemData = item.tagName.toLowerCase();
                } else if (item.scientificName != null) {
                    // Only scientific is not null - filter using scientific
                    itemData = item.scientificName.toLowerCase();
                } else {
                    // Both are null - shouldn't happen
                    console.log("This shouldn't happen");
                    return false;
                }
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setSearch(text);
            setFilteredDataSource(newData);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setSearch(text);
            setFilteredDataSource(dataSource);
        }
    }

    async function getTags() {
        console.log("Before fetch call");
        try {
            let response = await fetch('https://quiet-reef-93741.herokuapp.com/tags', {
                method: 'GET'
            })
                .then((response) => {
                    if (response.status == 400) {
                        response.json().then((result) => {
                            console.log('fail');
                            console.log(result.message);
                        });
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            result.forEach(tag => {
                                if (tag.tagName == "" && tag.scientificName == "" && tag.plant.plantImage === "advice-tag") {
                                    tag.tagName = "Advice";
                                    tag.plant.plantImage = "https://clipart.world/wp-content/uploads/2020/06/Question-Mark-clipart-transparent-background-1.png";
                                } else if (tag.tagName == null && tag.scientificName == null && tag.plant.plantImage === "general-tag") {
                                    tag.tagName = "General";
                                    tag.scientificName = "";
                                    tag.plant.plantImage = "https://htmlcolors.com/color-image/82B47D.png";
                                }
                            });
                            setDataSource(result);
                            setFilteredDataSource(result);
                        });
                    }
                });
        } catch (err) {
            console.log("Fetch didnt work.");
            console.log(err);
        }
    }

    function checkImage(url) {
        //define some image formats 
        var types = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];

        //split the url into parts that has dots before them
        var parts = url.split('.');

        //get the last part 
        var extension = parts[parts.length - 1];

        //check if the extension matches list 
        if (types.indexOf(extension) !== -1) {
            return true;
        }
        return false;
    }

    function checkAllImagesValidity() {
        for (let index = 0; index < dataSource.length; index++) {
            const element = dataSource[index];
            if (!checkImage(element.plant.plantImage)) {
                element.plant.plantImage = 'https://www.okumcmission.org/wp-content/uploads/2019/07/250-2503958_potted-plants-clipart-transparent-background-plant-logo-free.jpg';
            }
        }
    }

    function onItemPressed(id) {
        // Function for click on an item
        console.log("Item.id = " + id);

        navigation.navigate('Page_PostListTag', {
            tagId: id,
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onItemPressed(item.id)}>
            <View style={styles.itemContainer}>
                <Avatar.Image
                    source={{ uri: item.plant.plantImage }}
                    size={width * 0.12}
                    style={styles.itemImage}
                />
                <View style={styles.textContainer}>
                    <Text
                        category="s1"
                        style={styles.itemName}
                    >{item.tagName}</Text>
                    <Text
                        category="s1"
                        style={styles.itemScientific}
                    >{item.scientificName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderSeparator = () => <View style={styles.separator} />

    const renderHeader = () => (
        <SearchBar
            containerStyle={styles.searchContainer}
            inputContainerStyle={{ backgroundColor: 'white' }}
            round
            autoFocus={true}
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            placeholder="Search for a plant..."
            textContentType="name"
            value={search}
        />
    );

    return (
        <View style={styles.container}>
            {/* Header Bar */}
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_PostList", {tagId: ""})} />
            </Appbar.Header>

            <SafeAreaView style={styles.safeAreaContainer}>
                {checkAllImagesValidity()}
                <FlatList
                    style={styles.container}
                    data={filteredDataSource}
                    renderItem={(item) => renderItem(item)}
                    ListHeaderComponent={renderHeader}
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item) => item.id}
                    enableEmptySections
                />
            </SafeAreaView>

            {/* Bottom Nav Bar */}
            <Appbar style={styles.bottom}>
                <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
                <Appbar.Action icon="leaf" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
                <Appbar.Action icon="account-supervisor" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList", {tagId: ""})} />
                <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => { if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); } }} />
            </Appbar>
        </View>
    );
}

export default Tag_Search;

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        marginBottom: 65,
        borderBottomColor: 'grey',
    },
    container: {
        width: width,
        height: height,
        backgroundColor: '#EDEECB',
    },
    appbar: {
        width: width,
        backgroundColor: '#82B47D',
        flexDirection: "row",
        height: height * 0.078125,
    },
    itemContainer: {
        flexDirection: "row",
        padding: 12,
        alignItems: "center",
    },
    itemImage: {
        width: width * 0.12,
        height: width * 0.12,
        backgroundColor: 'white',
        borderColor: '#D3D3D3',
        borderWidth: 1,
        marginRight: 16,
    },
    textContainer: {
        flexDirection: "column",
    },
    itemName: {
        marginLeft: width * 0.07,
        fontSize: 16,
        fontFamily: "Lato_400Regular",
    },
    itemScientific: {
        marginLeft: width * 0.07,
        fontSize: 12,
        fontFamily: 'Lato_400Regular',
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'grey',
    },
    searchContainer: {
        backgroundColor: '#82B47D',
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    bottom: {
        justifyContent: 'center',
        backgroundColor: '#82B47D',
        height: height * 0.078125,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});