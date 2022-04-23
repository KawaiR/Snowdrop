import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Text, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Appbar, Avatar } from 'react-native-paper';
import { SearchBar, Icon } from 'react-native-elements';

import styles from './Plant_Search_Style.js';

class Plants_Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            masterDataSource: [],
            filteredDataSource: [],
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        };
    }

    componentDidMount = () => {
        this.getPlants();
    }

    searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = this.state.masterDataSource.filter(function (item) {
                var itemData = "";
                if (item.plantName != null && item.scientificName != null) {
                    // Both name and scientific name are not null
                    // Filter using either one
                    const itemName = item.plantName;
                    const itemScientific = item.scientificName;
                    const textData = text;
                    return itemName.indexOf(textData) > -1 || itemScientific.indexOf(textData) > -1;
                } else if (item.plantName != null) {
                    // Only name is not null - filter using name
                    itemData = item.plantName;
                } else if (item.scientificName != null) {
                    // Only scientific is not null - filter using scientific
                    itemData = item.scientificName;
                } else {
                    // Both are null - shouldn't happen
                    console.log("This shouldn't happen");
                    return false;
                }
                const textData = text;
                return itemData.indexOf(textData) > -1;
            });
            this.setState({ search: text, filteredDataSource: newData, });
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            this.setState({ search: text, filteredDataSource: this.state.masterDataSource });
        }
    };

    getPlants = () => {
        console.log("Before fetch call");
        fetch('https://quiet-reef-93741.herokuapp.com/plants', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log("Fetch call failed");
                    Alert.alert(
                        'Error',
                        'Unable to load plant search at this time, please try again later.',
                        [{ text: 'OK' }],
                    );
                } else {
                    console.log("Fetch call succeeded");
                    var items = data.filter(item => item.plantImage !== "general-tag" && item.plantImage !== "advice-tag");
                    this.setState({ masterDataSource: items, filteredDataSource: items });
                }
            });
    };

    savePostInformation = (id) => {
        console.log("Global username = ", global.userName);
        console.log("Global postTitle = ", global.postTitle);
        console.log("Global content = ", global.postContent);
        console.log("plant id = ", id);
        try {
            let response = fetch('https://quiet-reef-93741.herokuapp.com/posts/create-post', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: global.userName,
                    postTitle: global.postTitle,
                    content: global.postContent,
                    plantId: id,
                }),
            })
                .then((response) => {
                    if (response.status == 400) {
                        response.json().then((result) => {
                            console.log(result.message);
                        });
                        Alert.alert(
                            'Error',
                            'Unable to save post at this time, please try again later.',
                            [{ text: 'OK' }],
                        );
                    }
                    if (response.status == 200 || response.status == 201 || response.status == 202) {
                        response.json().then((result) => {
                            console.log(result);
                            global.postTitle = "";
                            global.postContent = "";
                            Alert.alert(
                                'Success',
                                'Post created!',
                                [{
                                    text: 'OK',
                                    onPress: () => {
                                        this.props.navigation.navigate('Page_IndPost', { id: result });
                                    },
                                }],
                            );
                        });
                    }
                });
        } catch (err) {
            console.log("Fetch didnt work.");
            console.log(err);
        }
    }

    checkImage = (url) => {
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
    }

    checkAllImagesValidity = () => {
        for (let index = 0; index < this.state.masterDataSource.length; index++) {
            const element = this.state.masterDataSource[index];
            if (!this.checkImage(element.plantImage)) {
                this.state.masterDataSource[index].plantImage = 'https://www.okumcmission.org/wp-content/uploads/2019/07/250-2503958_potted-plants-clipart-transparent-background-plant-logo-free.jpg';
            }
        }
    }

    onItemPressed = (id) => {
        // Function for click on an item
        console.log("Item.id = " + id);
        if (global.plantSearchFromWritePost) {
            // Make fetch call POST request with username, postTitle, content, plantId
            this.savePostInformation(id)
        } else {
            this.props.navigation.navigate('Save_Plant', {
                plantId: id,
            });
        }
    };

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onItemPressed(item.id)}>
            <View style={styles.itemContainer}>
                <Avatar.Image
                    source={{ uri: item.plantImage }}
                    size={this.state.width * 0.12}
                    style={styles.itemImage}
                />
                <View style={styles.textContainer}>
                    <Text
                        category="s1"
                        style={styles.itemName}
                    >{item.plantName}</Text>
                    <Text
                        category="s1"
                        style={styles.itemScientific}
                    >{item.scientificName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    renderSeparator = () => <View style={styles.separator} />

    renderHeader = () => (
        <SearchBar
            containerStyle={styles.searchContainer}
            inputContainerStyle={{ backgroundColor: 'white' }}
            round
            autoFocus={true}
            searchIcon={{ size: 24 }}
            onChangeText={(text) => this.searchFilterFunction(text)}
            onClear={(text) => this.searchFilterFunction('')}
            placeholder="Search for a plant..."
            textContentType="name"
            value={this.state.search}
        />
    );

    render = () => {
        return (
            <View style={styles.container}>
                {/* Header Bar */}
                <Appbar.Header style={styles.appbar}>
                    <Appbar.BackAction color="white" onPress={() => this.props.navigation.navigate("Page_Plant")} />
                </Appbar.Header>

                <SafeAreaView style={styles.safeAreaContainer}>
                    {this.checkAllImagesValidity()}
                    <FlatList
                        style={styles.container}
                        data={this.state.filteredDataSource}
                        renderItem={(item) => this.renderItem(item)}
                        ListHeaderComponent={this.renderHeader}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections
                    />
                </SafeAreaView>

                {/* Bottom Nav Bar */}
                <Appbar style={styles.bottom}>
                    <Appbar.Action icon="home" color="#005500" size={Math.min(this.state.width * 0.09, this.state.height * 0.05)} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
                    <Appbar.Action icon="leaf" color="#EDEECB" size={Math.min(this.state.width * 0.09, this.state.height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => this.props.navigation.navigate("Page_Plant")} />
                    <Appbar.Action icon="account-supervisor" color="#005500" size={Math.min(this.state.width * 0.09, this.state.height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => this.props.navigation.navigate("Page_PostList")} />
                    <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(this.state.width * 0.09, this.state.height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { this.props.navigation.navigate("Page_Profile_Email_Account"); } else { this.props.navigation.navigate("Page_Profile_Google_Account"); }}} />
                </Appbar>
            </View>
        );
    }
}

export default Plants_Search