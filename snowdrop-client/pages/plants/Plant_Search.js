import React, { useState } from "react";
import { SafeAreaView, FlatList, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Appbar, Avatar } from 'react-native-paper';
import { SearchBar, Icon } from 'react-native-elements';

import styles from './Plant_Search_Style.js';

const masterDataSource = [
    {
        id: 1,
        name: 'Monstera Deliciosa',
    },
    {
        id: 2,
        name: 'Golden Pothos',
    },
    {
        id: 3,
        name: 'Cactus',
    },
    {
        id: 4,
        name: 'Basil',
    },
    {
        id: 5,
        name: 'Sand Verbena',
    },
    {
        id: 6,
        name: 'California Copperfield',
    },
    {
        id: 7,
        name: 'Acarospora Caesiofusca',
    },
    {
        id: 8,
        name: 'Long long long scientific name',
    },
    {
        id: 9,
        name: 'Monstera',
    },
    {
        id: 10,
        name: 'Golden',
    },
    {
        id: 11,
        name: 'Cactii',
    },
    {
        id: 12,
        name: 'Basil Basil',
    },
    {
        id: 13,
        name: 'Verbena',
    },
    {
        id: 14,
        name: 'California',
    },
    {
        id: 15,
        name: 'Caesiofusca',
    },
    {
        id: 16,
        name: 'Long long long long long scientific name',
    },
];

const Plants_Search = ({ navigation }) => {
    var width = Dimensions.get('window').width;
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState(masterDataSource);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.name;
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
                <Text
                    category="s1"
                    style={styles.itemText}
                >{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    extractItemKey = (item) => '${item.id}';

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