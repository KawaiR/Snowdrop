import React, { useState, useRef, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Dimensions, Alert, TouchableOpacity } from "react-native";
import { Appbar, Chip, Card, Title, Paragraph } from 'react-native-paper';

import styles from './PostListPageStyle.js';

const PostListPage  = ({navigation}) => {
    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [tag, setTag] = React.useState(""); // change to route later
    const [posts, setPosts] = React.useState([]);

    async function getPosts() {
        // console.log("get post")
        let url = "https://quiet-reef-93741.herokuapp.com/posts";
        if (tag != "") {
            url = url + "/" + tag + "/get-posts";
        }
        console.log("get post")
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
        console.log("use effect");
        getPosts();
        
    });

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.post} onPress={() => console.log("TODO - " + item.id)}>
            <View style={styles.postContent}>
                <View style={styles.postHeader}>
                    <Text>{item.sender}</Text>
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