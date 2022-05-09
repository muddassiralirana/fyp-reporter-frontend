

import Screen from '../components/Screen';
import socket from "../config/socket";
import React, { useEffect, useState, useCallback } from "react";
import {
    Image,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,ScrollView
} from "react-native";

// import Text from "../components/text/AppText";
import environment from "../config/environment/environment";

export default function CivicSensesScreen({props, navigation}) {
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
            <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Emo')}
      >
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/emotional_health.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>5 Tips</Text>

                        <Text style={styles.text_2}>EMOTIONAL HEALTH</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Appinf')}
      >
                
                </TouchableOpacity>

            </View>
            
            <View style={styles.card_template}>
            <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Enviroment')}
      >
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/environment_clean.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>5 Tips</Text>

                        <Text style={styles.text_2}>Environment Clean</Text>
                    </View>
                </View>
              </TouchableOpacity>

            </View>
            <View style={styles.card_template}>
            <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Plants')}
      >
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/plant_trees.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>5 Tips</Text>

                        <Text style={styles.text_2}>EARTH Plant Trees</Text>
                    </View>
                </View>
                </TouchableOpacity>
              

            </View>
            <View style={styles.card_template}>
            <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Savewater')}
      >
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/Save_Water.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>5 Tips</Text>

                        <Text style={styles.text_2}> EARTH Save Water</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
            <View style={styles.card_template}>
            <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Covid')}
      >
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/covid.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>5 Tips</Text>

                        <Text style={styles.text_2}>CORONA VIRUS COVID</Text>
                    </View>
                </View>
                </TouchableOpacity>
               

            </View>
            <View style={styles.card_template}>
            <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Trafic')}
      >
                <View style={styles.card_body}>
                    <Image
                        style={styles.card_image}
                        source={
                            require("../assets/traffic_rules.png")
                        }
                    />
                    <View>
                        <Text style={styles.text_1}>5 Tips</Text>

                        <Text style={styles.text_2}>CITY  TRAFFIC RULES</Text>
                    </View>
                </View>
                </TouchableOpacity>
              

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
        width:"100%",

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
        width: 100,
        height: 100,
        margin: 5,
        
        borderRadius: 10,
    },
    card_title: {
        position: "absolute",
        left: 0,
        top: 140,
    },
    text_1:{
        fontSize:20,
        marginLeft:5,
        marginTop:5

    },
    text_2:{
        fontSize:20,
        marginLeft:5,
        marginTop:5,
        padding:5,
        textTransform:"uppercase",


    }
});