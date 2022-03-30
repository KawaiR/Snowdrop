import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, PixelRatio, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

const {
    width,
    height,
} = Dimensions.get("window");

const defaultW = 414;
const defaultH = 896;

function pxRD(px, cur_screen, base) {
    return Math.round(PixelRatio.roundToNearestPixel(cur_screen / base * px));
}

const Write_Post = ({ navigation }) => {
    const [title, onChangeTitle] = React.useState("");
    const [content, onChangeContent] = React.useState("");
    const [tag, setTag] = React.useState("");

    let [fontsLoaded] = useFonts({
        Alata_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });
    if (!fontsLoaded) {
        return <AppLoading />
    }

    async function savePostInformation() {
        console.log(global.userName)
        try {
            let response = await fetch('https://quiet-reef-93741.herokuapp.com/posts/create-post', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    username: global.userName,
                    postTitle: global.postTitle,
                    content: global.postContent,
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
                            global.postId = result;
                            Alert.alert(
                                'Success',
                                'Post created!',
                                [{
                                    text: 'OK',
                                    onPress: () => {
                                        // Navigate to view current post page
                                        // On view community post, clear out global.postTitle, global.postContent, global.postTag once used to avoid weird values
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

    function cancelPost() {
        Alert.alert(
            'Cancel post',
            'Are you sure you want to delete the post you were working on?',
            [{
                text: 'Yes',
                onPress: () => {
                    // Navigate to community home page (posts list)
                },
            }, {
                text: 'No',
            }],
        );
    }

    function onPressSubmit() {
        console.log("title = ", title)
        console.log("content = ", content)

        if (title === "" || content === "") {
            Alert.alert(
                'Missing Information',
                'Post title and content are both required to make a post',
                [{ text: 'OK' }],
            );
            return;
        }

        global.postTitle = title
        global.postContent = content
        global.postTag = tag
        global.plantSearchFromWritePost = false
        if (tag === "Plant") {
            global.plantSearchFromWritePost = true
            // navigate to plant_search
            navigation.navigate("Plant_Search")
        } else {
            // call fetch call
            savePostInformation()
            // show alert on success
            // navigate to view post on community
        }
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction color="white" onPress={() => cancelPost()} />
                <Appbar.Content title={<Text style={styles.headerTitle}>New Post</Text>} style={styles.headerTitle} />
            </Appbar.Header>

            <ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
                <View style={[styles.postDetailsContainer, {marginTop: 20}]}>
                    <Text style={styles.subtitleText}>Post Details</Text>
                    <TextInput
                        autoCapitalized='true'
                        autoCorrect={false}
                        autoFocus={true}
                        value={title}
                        multiline={true}
                        numberOfLines={2}
                        borderColor={title === "" ? "red" : "grey"}
                        borderRadius={25}
                        placeholder="Post Title"
                        clearButtonMode="always"
                        onChangeText={onChangeTitle}
                        selectionColor={'grey'}
                        underlineColorAndroid='transparent'
                        style={styles.titleTextField}
                    />
                    <TextInput
                        autoCapitalized='true'
                        autoCorrect={false}
                        autoFocus={false}
                        value={content}
                        borderColor={content === "" ? "red" : "grey"}
                        borderRadius={25}
                        placeholder="What's on your mind..."
                        clearButtonMode="always"
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={onChangeContent}
                        selectionColor={'grey'}
                        underlineColorAndroid='transparent'
                        style={styles.contentTextField}
                    />
                </View>

                <View style={styles.postDetailsContainer}>
                    <Text style={styles.subtitleText}>Tag</Text>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={[styles.tagButton, { backgroundColor: tag === "General" ? '#005500' : '#82B47D', }]} onPress={() => setTag("General")} >
                            <Text style={styles.tagText}>General</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tagButton, { backgroundColor: tag === "Plant" ? '#005500' : '#82B47D', }]} onPress={() => setTag("Plant")} >
                            <Text style={styles.tagText}>Choose specific plant</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tagButton, { backgroundColor: tag === "" ? '#005500' : '#82B47D', }]} onPress={() => setTag("")} >
                            <Text style={styles.tagText}>None</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={() => onPressSubmit()} >
                    <Text style={styles.submitText}>{(tag==="General" || tag==="") ? "Post" : "Next"}</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Add navigation to bottom appbar */}
            {/* Bottom Nav bar */}
            <Appbar style={styles.bottom}>
                <Appbar.Action icon="home" color="#005500" size={width * 0.09} />
                <Appbar.Action icon="leaf" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} onPress={() => navigation.navigate("Page_Plant")} />
                <Appbar.Action icon="account-supervisor" color="#EDEECB" size={width * 0.09} style={{ marginLeft: '9%' }} />
                <Appbar.Action icon="brightness-5" color="#005500" size={width * 0.09} style={{ marginLeft: '9%' }} />
            </Appbar>
        </View>
    );
}

export default Write_Post;

const styles = StyleSheet.create({
    // Appbar styles
    appbar: {
        width: width,
        backgroundColor: '#82B47D',
        flexDirection: "row",
        height: height * 0.078125, // 70defaultH
    },
    headerTitle: {
        alignSelf: "center",
        alignItems: "flex-start",
        fontSize: 24,
        fontFamily: "Lato_400Regular",
        color: "white",
    },
    bottom: {
        justifyContent: 'center',
        backgroundColor: '#82B47D',
        height: height * 0.078125,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EDEECB',
        paddingBottom: height * 0.078125,
    },
    postDetailsContainer: {
        backgroundColor: "white",
        borderRadius: 20,
        alignSelf: "center",
        marginBottom: 10,
        paddingBottom: 15,
        width: pxRD(385, width, defaultW),
    },
    rowContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
    },

    subtitleText: {
        fontFamily: "Lato_700Bold",
        fontSize: 20,
        margin: 15,
        marginLeft: 20,
    },
    titleTextField: {
        alignSelf: "center",
        borderRadius: 25,
        borderWidth: 1,
        padding: 15,
        paddingTop: 15,
        marginTop: 15,
        width: pxRD(355, width, defaultW),
        backgroundColor: 'white',
        fontFamily: "Lato_700Bold",
        fontSize: 20,
    },
    contentTextField: {
        alignSelf: "center",
        borderRadius: 25,
        borderWidth: 1,
        padding: 15,
        paddingTop: 15,
        marginTop: 12,
        width: pxRD(355, width, defaultW),
        height: pxRD(400, height, defaultH),
        backgroundColor: 'white',
        fontFamily: "Lato_400Regular",
        fontSize: 16,
    },

    tagButton: {
        backgroundColor: '#82B47D',
        borderRadius: 25,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 15,
        margin: 2,
        shadowColor: '#EDEECB',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    tagText: {
        justifyContent: 'center',
        color: 'white',
        fontFamily: "Lato_400Regular",
        fontSize: 16,
    },

    submitButton: {
        // top: pxRD(210, height, defaultH),
        width: pxRD(defaultW * 0.6, width, defaultW),
        height: pxRD(defaultH * 0.06, height, defaultH),
        backgroundColor: '#82B47D',
        borderRadius: 25,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        shadowColor: '#EDEECB',
        shadowOpacity: 0.8,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    submitText: {
        justifyContent: 'center',
        color: 'white',
        fontFamily: "Lato_700Bold",
        fontSize: 20,
    },
}); 