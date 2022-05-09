import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import {
    Image,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableOpacity

} from "react-native";
import { Entypo, MaterialIcons,Foundation  } from '@expo/vector-icons';
import Screen from "../components/Screen";
import Text from "../components/text/AppText";
import environment from "../config/environment/environment";
import Card from "../components/Card";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import socket from "../config/socket";
import ActivityIndicator from "../components/ActivityIndicator";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Savewater = ({ navigation }) => {

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
    // const navigateToMyComplains = () => navigation.navigate('MyComplains');
    return (
        <Screen
            style={
                !loading && feed.length > 0
                    ? styles.container
                    : [
                        styles.container,
                        { alignItems: "center", justifyContent: "center" },
                    ]
            }
        >
            <View style={styles.card_template}>
                <TouchableOpacity
                    style={styles.button}
                // onPress={() => navigation.navigate('PostComplainTab')}
                >
                    <View style={styles.card_body}

                    >
                        <Text style={styles.heading}>Save Water</Text>
                        <Text style={styles.card_titleLOGO}>1. Turn off the faucet while brushing your teeth.</Text>
                        <Text style={styles.card_titleLOGO}>2. Only run the washing machine and dishwasher when you have a full load.</Text>
                        <Text style={styles.card_titleLOGO}>3. Use a low flow shower head and faucet aerators.</Text>
                        <Text style={styles.card_titleLOGO}>4. Fix leaks.</Text>
                        <Text style={styles.card_titleLOGO}>5. Install a dual flush or low flow toilet or put a conversion kit on your existing toilet.</Text>
                        <Text style={styles.card_titleLOGO}>6. Don’t overwater your lawn or water during peak periods, and install rain sensors on irrigation systems.</Text>
                        <Text style={styles.card_titleLOGO}>7. Install a rain barrel for outdoor watering.</Text>
                        <Text style={styles.card_titleLOGO}>8. Plant a rain garden for catching stormwater runoff from your roof, driveway, and other hard surfaces.</Text>
                        {/* <Text style={styles.card_titleLOGO}>9. Monitor your water usage on your water bill and ask your local government about a home water audit.</Text> */}




                    </View>
                </TouchableOpacity>



            </View>
          

        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },

    card_template: {
        flex: 1,


       
    },
    heading: {
        fontSize: 20,
        padding: 5,
        textDecorationLine: "underline",

    },
    card_body: {
        width: 318,
        height: 515,
        margin: 6,
        borderRadius: 10,
        backgroundColor: "white",

        justifyContent: "center",



    },
    contactHeading: {
        paddingLeft: 10,
        paddingBottom: 5,
        fontSize: 20,
        textAlign:"center"

    },


    card_image: {
        width: 45,
        height: 45,
        // marginTop:20,
        marginLeft: 55,
        // marginRight:20,
        borderRadius: 10,
    },
    card_titleLOGO: {
        textAlign: "justify",
        padding: 5,

    },
    card_title: {
        position: "absolute",
        left: 8,
        top: 140,
    },
});

export default Savewater;
