import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Appbar, Avatar } from 'react-native-paper';
import { SearchBar, Icon } from 'react-native-elements';

import styles from './Plant_Search_Style.js';

const masterDataSource = [
    {
        id: 1,
        name: 'Monstera',
        scientific: 'Monstera Deliciosa',
    },
    {
        id: 2,
        name: 'Goldie',
        scientific: 'Golden Pothos',
    },
    {
        id: 3,
        name: 'Cactii Boi',
        scientific: 'Cactus'
    },
    {
        id: 4,
        name: 'Basil Boi',
        scientific: 'Basil',
    },
    {
        id: 5,
        name: 'Sand Verbena',
        scientific: 'Verbenas Sandis',
    },
    {
        id: 6,
        name: 'California Copperfield',
        scientific: 'Copperfieldus Californias',
    },
    {
        id: 7,
        name: null,
        scientific: 'Acarospora Caesiofusca',
    },
    {
        id: 8,
        name: 'Long long long long name',
        scientific: null,
    },
    {
        id: 9,
        name: 'Copperfornia Califield',
        scientific: 'Copperfornias Califieldus',
    },
];

const Plants_Search = ({ navigation }) => {
    var width = Dimensions.get('window').width;
    const [search, setSearch] = useState('');
    // const [masterDataSource, setMasterDataSource] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState(masterDataSource);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                var itemData = "";
                if (item.name != null && item.scientific != null) {
                    // Both name and scientific name are not null
                    // Filter using either one
                    const itemName = item.name;
                    const itemScientific = item.scientific;
                    const textData = text;
                    return itemName.indexOf(textData) > -1 || itemScientific.indexOf(textData) > -1;
                } else if (item.name != null) {
                    // Only name is not null - filter using name
                    itemData = item.name;
                } else if (item.scientific != null) {
                    // Only scientific is not null - filter using scientific
                    itemData = item.scientific;
                } else {
                    // Both are null - shouldn't happen
                    console.log("This shouldn't happen");
                    return false;
                }
                const textData = text;
                return itemData.indexOf(textData) > -1;
            });

            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    // getPlants = () => {
    //     // const {route} = this.props;
    //     // const {userId} = route.params;
    //     // this.setState({userId: userId});
    //     fetch('localhost:8080/plants/get-all-plant-details')
    //       .then(res => res.json())
    //       .then(data => {
    //         if (data.error) {
    //           Alert.alert(
    //             'Error',
    //             'Unable to load plant search at this time, please try again later.',
    //             [{text: 'OK'}],
    //           );
    //         } else {
    //         //   this.setState({activities: data});
    //             setMasterDataSource(data);
    //             setFilteredDataSource(data);
    //         }
    //       });
    //   };

    onItemPressed = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.name);
    };

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onItemPressed(item)}>
            <View style={styles.itemContainer}>
                <Avatar.Image
                    source={require('snowdrop-client/assets/golden-pothos.png')}
                    size={width * 0.12}
                    style={styles.itemImage}
                />
                <View style={styles.textContainer}>
                    <Text
                        category="s1"
                        style={styles.itemName}
                    >{item.name}</Text>
                    <Text
                        category="s1"
                        style={styles.itemScientific}
                    >{item.scientific}</Text>
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
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            // onCancel={searchFilterFunction("")}
            // clearIcon={<Icon name='cancel' type='material-icons' color='grey' />}
            placeholder="Search for a plant..."
            value={search}
        />
    );

    return (
        <View style={styles.container}>
            {/* Header Bar */}
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="white" />
                <Appbar.Action icon="brightness-5" color="white" style={{ marginLeft: 'auto' }} />
            </Appbar.Header>

            <SafeAreaView style={styles.safeAreaContainer}>
                <FlatList
                    style={styles.container}
                    data={filteredDataSource}
                    renderItem={(item) => renderItem(item)}
                    ListHeaderComponent={renderHeader}
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    enableEmptySections
                />
            </SafeAreaView>

            {/* Bottom Nav Bar */}
            <Appbar style={styles.bottom}>
                <Appbar.Action icon="home" color="#005500" size={width * 0.09} />
                <Appbar.Action icon="leaf" color="#EDEECB" size={width * 0.09} style={{ marginLeft: '9%' }} />
                <Appbar.Action icon="account-supervisor" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} />
                <Appbar.Action icon="brightness-5" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} />
            </Appbar>
        </View>
    )
}

export default Plants_Search