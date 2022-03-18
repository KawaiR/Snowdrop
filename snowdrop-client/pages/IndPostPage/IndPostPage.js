import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import { Appbar, Avatar, Card, FAB, IconButton, ToggleButton } from 'react-native-paper';

import styles from './IndPostPageStyle.js';

const IndPostPage  = ({navigation}) => {
    var width = Dimensions.get('window').width; 
    var height = Dimensions.get('window').height;

    const [userName, setUserName] = React.useState("User");
    const [date, setDate] = React.useState("date");
    const [title, setTitle] = React.useState("title");
    const [postContent, setPostContent] = React.useState("content1\ncontent2");
    const [vote, setVote] = React.useState("null");
    const [upvote, setUpvote] = React.useState(10);
    const [downvote, setDownvote] = React.useState(5);


    const votePost = (newVote) => {
        console.log(newVote)
        setVote(newVote)
    }


	return (
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white"/>
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
            {/* <Text>{upvote + " upvote\t" + downvote + " downvotes"}</Text> */}
            <ToggleButton.Row onValueChange={value => votePost(value)} value={vote}>
                <ToggleButton icon="thumb-up-outline" value="up" size={20} style={styles.toggle}/>
                <ToggleButton icon="thumb-down-outline" value="down" size={20} style={styles.toggle}/>
                {/* <Text>{upvote + " upvote\t" + downvote + " downvotes"}</Text> */}
            </ToggleButton.Row>
            <Text style={{textAlign:'right', flex: 1, justifyContent: "center"}}>{upvote + " upvote\t" + downvote + " downvotes"}</Text>
        </View>
        </View>
        
	</ScrollView>
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={width * 0.09} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
        <Appbar.Action icon="leaf" color="#EDEECB" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
        <Appbar.Action icon="account-supervisor" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => Alert.alert("Community", "Community page not yet implemented", [{ text: 'OK' }],)} />
        <Appbar.Action icon="brightness-5" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
    </Appbar>
    </View>
)}
export default IndPostPage