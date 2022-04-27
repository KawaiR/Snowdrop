import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, FlatList, Dimensions, Alert } from "react-native";
import { Appbar, Chip, Portal, Dialog, IconButton, Button, Provider, TextInput } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

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

    const [deleteVisible, setDeleteVisible] = React.useState(false);
    const [commentDeleteVisible, setCommentDeleteVisible] = React.useState(false);
    const [newComment, setNewComment] = React.useState("");
    const [commentList, setCommentList] = React.useState([]);
    const [deletingComment, setDeletingComment] = React.useState("");

    const isFocused = useIsFocused()
    useEffect(() => {
        if (userName == "") {
            console.log("use effect");
            getPost(id);
            getComment(id);
            getVoteResult(id);
        }
        console.log("comment- " + commentList);
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
        
    }, [isFocused]);

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

    async function getComment(id) {
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/comments/' + id + '/get-comments', {
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
                        setCommentList(result);
					});
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    async function deletePost() {
        setDeleteVisible(false)
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/posts/' + id + "/delete-post", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: global.userName,
                }),
            })
			.then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
                        console.log('fail');
						console.log(result.message);
                        console.log('fail');
                        setDeleteVisible(false);
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
                    console.log('success');
                    navigation.navigate("Page_PostList");
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
    }

    async function deleteComment() {
        console.log("delete Comment entered")
        console.log(deletingComment)
        setCommentDeleteVisible(false)
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/comments/' + deletingComment + "/delete-comment", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                }),
            })
			.then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
                        console.log('fail');
						console.log(result.message);
                        console.log('fail');
                        setCommentDeleteVisible(false);
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
                    console.log('success');
                    getComment(id);
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

    async function makeComment() {
        console.log(newComment);
        try {
			let response = await fetch('https://quiet-reef-93741.herokuapp.com/comments/' + id + "/create-comment", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: global.userName,
                    content: newComment,
                }),
            })
			.then((response) => {
				if (response.status == 400) {
					response.json().then((result) => {
                        console.log('fail');
						console.log(result.message);
                        console.log('fail');
					});
				}
				if (response.status == 200 || response.status == 201 || response.status == 202) {
                    console.log('success');
				}
			});
		} catch (err) {
			console.log("Fetch didnt work.");
			console.log(err);
		}
        setNewComment("");
        getComment(id)

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

    const renderItem = ({ item }) => (
        <View style={styles.post}>
        <View style={styles.postContent}>
            <View style={styles.postHeader}>
                <Text>{item.sender.userName}</Text>
                <Text style={{textAlign:'right', flex: 1}}>{item.uploadDate}</Text>
            </View>
            <View style={styles.lineBreak}></View>
            <Text>{item.content}</Text>
        </View>
        {(global.userName == item.sender.userName) && <IconButton icon="trash-can" style={{marginLeft: 'auto'}} onPress={() => {setDeletingComment(item.id); setCommentDeleteVisible(true);}}></IconButton>}
        </View>
    );

    const renderEmpty = () => (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#EDEECB',}}>
            <Text style={styles.noPostText}>No comments at the moment</Text>
        </View>
    )

	return (
    <Provider>
    <View style={styles.container}>
    <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction color="white" onPress={() => navigation.navigate("Page_PostList")}/>
        <Appbar.Content title={<Text style={styles.headerTitle}>View Post</Text>} style={styles.headerTitle} />
    </Appbar.Header>
	{/* <ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
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
            <Chip icon="thumb-up" onPress={() => voteRequest(1)} selected={upvoteSelected} textStyle={{fontSize: 12,}} style={styles.chip}>{upvote}</Chip>
            <Chip icon="thumb-down" onPress={() => voteRequest(0)} textStyle={{fontSize: 12,}} selected={downvoteSelected} style={styles.chip}>{downvote}</Chip>
            {(global.userName == userName) && <IconButton icon="trash-can" style={{marginLeft: 'auto'}} onPress={() => setDeleteVisible(true)}></IconButton>}
        </View>
        </View>
        <View style={styles.textInputView}>
            <TextInput
                style={styles.textInput}
                label="New Comment"
                activeUnderlineColor="#005500"
                placeholder="New comment"
                value={newComment}
                multiline={true}
                onChangeText={text => setNewComment(text)}
            />
            {(newComment != "") && <IconButton icon="send" onPress={makeComment}></IconButton>}
        </View> */}

        <FlatList
            ListHeaderComponent={
                <>
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
                        <Chip icon="thumb-up" onPress={() => voteRequest(1)} selected={upvoteSelected} textStyle={{fontSize: 12,}} style={styles.chip}>{upvote}</Chip>
                        <Chip icon="thumb-down" onPress={() => voteRequest(0)} textStyle={{fontSize: 12,}} selected={downvoteSelected} style={styles.chip}>{downvote}</Chip>
                        {(global.userName == userName) && <IconButton icon="trash-can" style={{marginLeft: 'auto'}} onPress={() => setDeleteVisible(true)}></IconButton>}
                    </View>
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={styles.textInput}
                            label="New Comment"
                            activeUnderlineColor="#005500"
                            placeholder="New comment"
                            value={newComment}
                            multiline={true}
                            onChangeText={text => setNewComment(text)}
                        />
                        {(newComment != "") && <IconButton icon="send" onPress={makeComment}></IconButton>}
                    </View>
                    <Portal>
                        <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
                            <Dialog.Title>Deleting Post</Dialog.Title>
                            <Dialog.Content>
                            <Text>Do you want to delete this post?</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                            <Button onPress={deletePost}>Yes</Button>
                            <Button onPress={() => setDeleteVisible(false)}>Cancel</Button>
                            </Dialog.Actions>
                        </Dialog>
                        <Dialog visible={commentDeleteVisible} onDismiss={() => setCommentDeleteVisible(false)}>
                            <Dialog.Title>Deleting Comment</Dialog.Title>
                            <Dialog.Content>
                            <Text>Do you want to delete this comment?</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                            <Button onPress={deleteComment}>Yes</Button>
                            <Button onPress={() => setCommentDeleteVisible(false)}>Cancel</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </>
            }
            data={commentList}
            renderItem={renderItem}
        />

        {/* <Portal>
            <Dialog visible={deleteVisible} onDismiss={() => setDeleteVisible(false)}>
                <Dialog.Title>Deleting Post</Dialog.Title>
                <Dialog.Content>
                <Text>Do you want to delete this post?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={deletePost}>Yes</Button>
                <Button onPress={() => setDeleteVisible(false)}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
        
	</ScrollView> */}
    <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" color="#005500" size={Math.min(width * 0.09, height * 0.05)} onPress={() => Alert.alert("Home", "Home page not yet implemented", [{ text: 'OK' }],)} />
        <Appbar.Action icon="leaf" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
        <Appbar.Action icon="account-supervisor" color="#EDEECB" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_PostList")} />
        <Appbar.Action icon="brightness-5" color="#005500" size={Math.min(width * 0.09, height * 0.05)} style={{ marginLeft: '9%' }} onPress={() => {if (global.googleID == undefined) { navigation.navigate("Page_Profile_Email_Account"); } else { navigation.navigate("Page_Profile_Google_Account"); }}} />
    </Appbar>
    </View>
    </Provider>
)}
export default IndPostPage