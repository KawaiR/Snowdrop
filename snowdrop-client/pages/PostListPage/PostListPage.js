import React, { useState, useRef, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Dimensions, Alert, TouchableOpacity } from "react-native";
import { Appbar, Chip, Card, Title, Paragraph } from 'react-native-paper';

import styles from './PostListPageStyle.js';

const PostListPage  = ({navigation}) => {
    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [tag, setTag] = React.useState(""); // change to route later
    const [posts, setPosts] = React.useState([
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        postTitle: 'First Item',
        content: 'First content',
        uploadDate: 'First time',
        upvotes: 10,
        downvotes: 11,
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        postTitle: 'Second Item',
        content: 'Second content',
        uploadDate: 'Second time',
        upvotes: 20,
        downvotes: 21,
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        postTitle: 'Third Item',
        content: 'Third content',
        uploadDate: 'Third time',
        upvotes: 30,
        downvotes: 31,
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6',
        postTitle: 'forth Item',
        content: 'forth content',
        uploadDate: 'forth time',
        upvotes: 40,
        downvotes: 41,
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa976',
        postTitle: 'fifth Item',
        content: 'fifth content',
        uploadDate: 'fifth time',
        upvotes: 50,
        downvotes: 51,
    },
    ]);

    async function getPosts() {
        let url = "";
        if (tag == "") {
            url = "http://localhost:8080/posts/";
        } else {
            url = "/" + tag + "/get-posts";
        }
        try {
			let response = await fetch(url, { method: 'GET' })
			.then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
                        console.log('fail');
						console.log(result.message);
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
					response.json().then((result) => {
                        console.log('success');
						console.log(result);
                        setPosts(result)
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    };

    useEffect(() => {
        getPosts();
        
    });

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.post} onPress={() => console.log("TODO - " + item.id)}>
            <View style={styles.postContent}>
                <View style={styles.postHeader}>
                    <Text>{"@TODO"}</Text>
                    <Text style={{textAlign:'right', flex: 1}}>{item.uploadDate}</Text>
                </View>
                <View style={styles.lineBreak}></View>
                <Text style={styles.title}>{item.postTitle}</Text>
                <Text>{item.content}</Text>
                <View style={styles.voteRowStyle}>
                    <Chip icon="thumb-up" textStyle={{fontSize: 12,}} style={styles.chip}>{item.upvotes}</Chip>
                    <Chip icon="thumb-down" textStyle={{fontSize: 12,}}>{item.downvotes}</Chip>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderEmpty = () => (
        <View>
            <Text>No post at the moment</Text>
        </View>
    )

	return (
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white"/>
    </Appbar.Header>
	<SafeAreaView style={styles.scroll}>
        <FlatList
            data={posts}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
        />
	</SafeAreaView>
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={width * 0.09} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
        <Appbar.Action icon="leaf" color="#EDEECB" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
        <Appbar.Action icon="account-supervisor" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => Alert.alert("Community", "Community page not yet implemented", [{ text: 'OK' }],)} />
        <Appbar.Action icon="brightness-5" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
    </Appbar>
    </View>
)}
export default PostListPage