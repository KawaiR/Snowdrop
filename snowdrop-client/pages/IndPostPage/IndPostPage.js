import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import { Appbar, Chip, Card, FAB, IconButton, ToggleButton } from 'react-native-paper';

import styles from './IndPostPageStyle.js';

const IndPostPage  = ({route, navigation}) => {
    const { id } = route.params;

    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    // const [id, setID] = React.useState(""); // change to route later

    const [userName, setUserName] = React.useState("");
    const [date, setDate] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("content1\ncontent2");
    const [upvote, setUpvote] = React.useState(10);
    const [downvote, setDownvote] = React.useState(5);
    const [status, setStatus] = React.useState(-1);
    const [upvoteSelected, setUpvoteSelected] = React.useState(0);
    const [downvoteSelected, setDownvoteSelected] = React.useState(0);


    useEffect(() => {
        if (userName == "") {
            console.log("use effect");
            getPost(id);
            getVoteResult(id);
        }
        console.log("status- " + status);
        if (status == 1) {
            setUpvoteSelected(true);
            setDownvoteSelected(false);
        } else if (status == 0) {
            setDownvoteSelected(true);
            setUpvoteSelected(false);
        } else {
            setDownvoteSelected(false);
            setUpvoteSelected(false);
        }
        
    });

    async function getPost(id) {
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/posts/' + id + '/get-info', {
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
                        console.log(result);
                        setUserName(result.username);
                        setDate(result.uploadDate);
                        setTitle(result.postTitle);
                        setPostContent(result.content);
                        setUpvote(result.upvotes);
                        setDownvote(result.downvotes);
                        // setStatus(result.voted);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    async function getVoteResult(id) {
        console.log("getVoteResult");
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/posts/'+ id + '/' +global.userName + '/check-mapping', { method: 'GET' })
			.then((response) => {
                console.log("getVoteResult then entered");
                console.log(response.status);
                console.log("getVoteResult then entered");
				if (response.status == 400) {
					response.json().then((result) => {
                        console.log('fail');
						console.log(result.message);
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
					response.json().then((result) => {
                        console.log("/n/nfirst status");
                        console.log("result");
                        setStatus(result);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    async function voteRequest(newVote) {
        console.log(newVote);
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/posts/' + id + "/vote", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: global.userName,
                    upvote: newVote,
                }),
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
                        console.log('success');
						console.log(result);
                        setUpvote(result.upvotes);
                        setDownvote(result.downvotes);
                        setStatus(result.status);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

	return (
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_PostList")}/>
        <Appbar.Content title={<Text style={styles.headerTitle}>View Post</Text>} style={styles.headerTitle} />
        {/* <Appbar.Action icon="brightness-5" color="white" style={{marginLeft: 'auto'}}/> */}
    </Appbar.Header>
	<ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.post}>
        <View style={styles.postContent}>
            <View style={styles.postHeader}>
                <Text>{"@" + userName}</Text>
                <Text style={{textAlign:'right', flex: 1}}>{date}</Text>
            </View>
            <View style={styles.lineBreak}></View>
            <Text style={styles.title}>{title}</Text>
            <Text>{postContent}</Text>

        </View>
        <View style={styles.postVotes}>
            {/* <Text>{upvote + " upvote\t" + downvote + " downvotes"}</Text>
            <ToggleButton.Row onValueChange={value => votePost(value)} value={vote}>
                <ToggleButton icon="thumb-up-outline" value="up" size={20} style={styles.toggle}/>
                <ToggleButton icon="thumb-down-outline" value="down" size={20} style={styles.toggle}/>
            </ToggleButton.Row> */}
            <Chip icon="thumb-up" onPress={() => voteRequest(1)} selected={upvoteSelected} textStyle={{fontSize: 12,}} style={styles.chip}>{upvote}</Chip>
            <Chip icon="thumb-down" onPress={() => voteRequest(0)} textStyle={{fontSize: 12,}} selected={downvoteSelected} style={styles.chip}>{downvote}</Chip>
        </View>
        </View>
        
	</ScrollView>
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => navigation.navigate("Home")} />
        <Appbar.Action icon="leaf" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
        <Appbar.Action icon="account-supervisor" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList")} />
        <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
    </Appbar>
    </View>
)}
export default IndPostPage