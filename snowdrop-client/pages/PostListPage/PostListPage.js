import React, { useState, useRef, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Dimensions, Alert, TouchableOpacity } from "react-native";
import { Appbar, Chip, Card, Title, Paragraph, Portal, Provider, FAB, Dialog, Button } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

import styles from './PostListPageStyle.js';

const PostListPage  = ({route, navigation}) => {
    const { tagId } = route.params;
    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [tag, setTag] = React.useState(tagId); // change to route later
    const [posts, setPosts] = React.useState([]);

    const [levelup, setLevelup] = React.useState(false);

    async function getPosts() {
        // console.log("get post")
        let url = "https://quiet-reef-93741.herokuapp.com/posts";
        if (tag !== "") {
            url = url + "/" + tag + "/get-posts";
        }
        console.log("get post = ", url)
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
                        // console.log('success');
						// console.log(result);
                        setPosts(result.reverse())
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    };

    async function getLevelHelper() {
        console.log("helper")
        let url = "https://quiet-reef-93741.herokuapp.com/users/" + global.userName + "/check-level";
        try {
			let response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                }),
            }).then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
                        console.log('fail');
						console.log(result.message);
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
					response.json().then((result) => {
                        console.log('!!!!helper!!!');
                        console.log('success: ' + result);
                        setLevelup(result);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getPosts();
            getLevelHelper();
        }
        
    }, [isFocused]);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.post} onPress={() => {
                navigation.navigate('Page_IndPost', {id: item.id});
            }}>
            <View style={styles.postContent}>
                <View style={styles.postHeader}>
                    <Text>{item.sender.userName}</Text>
                    <Text style={{textAlign:'right', flex: 1}}>{item.uploadDate}</Text>
                </View>
                <View style={styles.lineBreak}></View>
                <Text style={styles.title}>{item.postTitle}</Text>
                <Text>{item.content}</Text>
                <TouchableOpacity style={styles.tagButton} onPress = {() => {}}>
                    <Text style={styles.tagText}>{item.tag.plant.plantImage === "general-tag" ? "General" : (item.tag.plant.plantImage === "advice-tag" ? "Advice" : item.tag.plant.plantName)}</Text>
                </TouchableOpacity>
                <View style={styles.voteRowStyle}>
                    <Chip icon="thumb-up" textStyle={{fontSize: 12,}} style={styles.chip}>{item.upvotes}</Chip>
                    <Chip icon="thumb-down" textStyle={{fontSize: 12,}}>{item.downvotes}</Chip>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderEmpty = () => (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#EDEECB',}}>
            <Text style={styles.noPostText}>No posts at the moment</Text>
        </View>
    )

	return (
    <Provider>
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
    <Appbar.BackAction color="white" onPress={() => navigation.navigate("Home")}/>
    <Appbar.Content title={<Text style={styles.headerTitle}>Community</Text>} style={styles.headerTitle} />
    <Appbar.Action icon="magnify" color="white" style={{marginLeft: 'auto'}} onPress={() => {navigation.navigate("Tag_Search")}}/>
    </Appbar.Header>
	<SafeAreaView style={styles.scroll}>
        <FlatList
            ListHeaderComponent={
                <>
                <Portal>
                    <Dialog visible={levelup} onDismiss={() => setLevelup(false)}>
                        <Dialog.Title>Congrats!</Dialog.Title>
                        <Dialog.Content>
                        <Text>Expertise level up!</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={() => setLevelup(false)}>Okay</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                </>
            }
            data={posts}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
        />
	</SafeAreaView>

    {/* <Portal>
        <Dialog visible={levelup} onDismiss={() => setLevelup(false)}>
            <Dialog.Title>Congrats!</Dialog.Title>
            <Dialog.Content>
            <Text>Expertise level up!</Text>
            </Dialog.Content>
            <Dialog.Actions>
            <Button onPress={() => setLevelup(false)}>Okay</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal> */}

    <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => {
            navigation.navigate("Write_Post");}}
    />
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => navigation.navigate("Home")} />
        <Appbar.Action icon="leaf" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
        <Appbar.Action icon="account-supervisor" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => { setTag(""); navigation.navigate("Page_PostList", {tagId: ""});}} />
        <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
    </Appbar>
    </View>
    </Provider>
)}
export default PostListPage