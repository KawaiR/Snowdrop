import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Appbar, Avatar } from 'react-native-paper';
import { SearchBar, Icon } from 'react-native-elements';

import styles from './Plant_Search_Style.js';

class Plants_Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: [],
            masterDataSource: [],
            filteredDataSource: [],
            width: Dimensions.get('window').width,
        };
    }

    componentDidMount = () => {
        this.getPlants();
        this.checkAllImagesValidity();
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
        fetch('http://localhost:8080/plants', { method: 'GET' })
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
                    this.setState({ masterDataSource: data, filteredDataSource: data });
                }
            });
    };

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
            if (this.checkImage(element.plantImage)) {
                console.log("Image is good");
            } else {
                this.state.masterDataSource[index].plantImage = 'https://cdn-icons-png.flaticon.com/512/3090/3090496.png';
                // 1. Make a shallow copy of the items
                let items = [...this.state.filteredDataSource];
                // 2. Make a shallow copy of the item you want to mutate
                let item = { ...items[index] };
                // 3. Replace the property you're intested in
                item.plantImage = 'https://cdn-icons-png.flaticon.com/512/3090/3090496.png';
                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                items[index] = item;
                // 5. Set the state to our new copy
                this.setState({ filteredDataSource: items });
            }
        }
    }

    onItemPressed = (item) => {
        // Function for click on an item
        this.props.navigation.navigate('Save_Plant');
    };

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onItemPressed(item)}>
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
            value={this.state.search}
        />
    );

    render = () => {
        return (
            <View style={styles.container}>
                {/* Header Bar */}
                <Appbar.Header style={styles.appbar}>
                    <Appbar.BackAction color="white" />
                </Appbar.Header>

                <SafeAreaView style={styles.safeAreaContainer}>
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
                    <Appbar.Action icon="home" color="#005500" size={this.state.width * 0.09} />
                    <Appbar.Action icon="leaf" color="#EDEECB" size={this.state.width * 0.09} style={{ marginLeft: '9%' }} />
                    <Appbar.Action icon="account-supervisor" color="#005500" size={this.state.width * 0.09} style={{ marginLeft: '9%' }} />
                    <Appbar.Action icon="brightness-5" color="#005500" size={this.state.width * 0.09} style={{ marginLeft: '9%' }} />
                </Appbar>
            </View>
        );
    }
}

export default Plants_Search