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

const Enviroment = ({ navigation }) => {

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
                        <Text style={styles.heading}>Environment Clean</Text>
                        <Text style={styles.card_titleLOGO}>1. Reduce the usage of your electrical appliances</Text>
                        <Text style={styles.card_titleLOGO}>2. Drive your car less</Text>
                        <Text style={styles.card_titleLOGO}>3. Reduce the usage of your wooden stove</Text>
                        <Text style={styles.card_titleLOGO}>4. Maintain a healthy eco system</Text>
                        <Text style={styles.card_titleLOGO}>5. Reduce usage of chemicals and pesticides</Text>
                        <Text style={styles.card_titleLOGO}>6. Recycle the waste products</Text>
                        <Text style={styles.card_titleLOGO}>7. Reduce carbon footprints</Text>
                        <Text style={styles.card_titleLOGO}>8. Grow your food locally</Text>
                        <Text style={styles.card_titleLOGO}>9. Reduce contaminants</Text>
                        <Text style={styles.card_titleLOGO}>10. Avoid the pollution</Text>




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


        // height: 200,
     
    },
    heading: {
        fontSize: 20,
        padding: 5,
        textDecorationLine: "underline",

    },
    card_body: {
        width: 318,
        height: 430,
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

export default Enviroment;
