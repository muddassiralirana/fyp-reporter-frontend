

import Screen from '../components/Screen';
import socket from "../config/socket";
import React, { useEffect, TouchableOpacity, useState, useCallback } from "react";
import {
    Image,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Text,
    StatusBar,
    SafeAreaView,ScrollView
} from "react-native";

// import Text from "../components/text/AppText";
import environment from "../config/environment/environment";

export default function QuickLink(props) {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState(false);
    const [firstCall, setFirstCall] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const wait = (timeout) => {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    };
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            setRefreshing(false);
            setChange(!change);
        });
    }, []);

    const getFeedComplains = async () => {
        if (firstCall) {
            setLoading(true);
            setFirstCall(false);
        }
        try {
            let data = await axios.get(`${environment.baseUrl}/all-complains`);
            setFeed(data.data.complain.reverse());
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getFeedComplains();
        socket.on("complain", () => {
            setChange(!change);
        });

        return () => {
            socket.off("complain");
        };
    }, [change]);

    const keyExtractor = useCallback((item, index) => item._id.toString(), []);
    return (
        <SafeAreaView
            style={
                !loading && feed.length > 0
                    ? styles.container
                    : [
                        styles.container,
                        { alignItems: "center", justifyContent: "center" },
                    ]
            }
        >
            <ScrollView style={styles.scrollView}>
            <View style={styles.card_template}>
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/1122.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>Rescue 1122</Text>

                        <Text style={styles.text_2}>Helpline: 1122</Text>
                    </View>
                </View>
                <View style={styles.card_body}>

                </View>

            </View>
            
            <View style={styles.card_template}>
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/aman.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>Aman Foundation</Text>

                        <Text style={styles.text_2}>Helpline: 1021 </Text>
                    </View>
                </View>
                <View style={styles.card_body}>

                </View>

            </View>
            <View style={styles.card_template}>
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/chippa.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>Chhipa Ambulance</Text>

                        <Text style={styles.text_2}>Helpline: 1020 </Text>
                    </View>
                </View>
                <View style={styles.card_body}>

                </View>

            </View>
            <View style={styles.card_template}>
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/edhi.jpeg")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>Edhi Ambulance </Text>

                        <Text style={styles.text_2}>Helpline: 115</Text>
                    </View>
                </View>
                <View style={styles.card_body}>

                </View>

            </View>
            <View style={styles.card_template}>
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/1.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>Fire Brigade</Text>

                        <Text style={styles.text_2}>Helpline: 16</Text>
                    </View>
                </View>
                <View style={styles.card_body}>

                </View>

            </View>
            
            <View style={styles.card_template}>
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/police.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>Police Madadgar </Text>

                        <Text style={styles.text_2}>Helpline: 15 </Text>
                    </View>
                </View>
                <View style={styles.card_body}>

                </View>

            </View>
            <View style={styles.card_template}>
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/rangers.jpeg")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>Rangers Madadgar</Text>

                        <Text style={styles.text_2}>Helpline: 1011 </Text>
                    </View>
                </View>
                <View style={styles.card_body}>

                </View>

            </View>
            

            </ScrollView>
        </SafeAreaView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },

    card_template: {
        flex: 1,
        flexDirection: "row",

        // height: 200,
     
    },
    card_body: {
        
        height: 120,
        width:330,
        margin: 5,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center"

    },


    card_image: {
        width: 80,
        height: 80,
        margin: 15,
        marginTop:20,
        borderRadius: 10,
    },
    card_title: {
        position: "absolute",
        left: 0,
        top: 140,
    },
    text_1:{
        fontSize:20,
        marginLeft:20,
        marginTop:20

    },
    text_2:{
        fontSize:25,
        marginLeft:20,
        marginTop:5,
        // padding:5,


    }
});