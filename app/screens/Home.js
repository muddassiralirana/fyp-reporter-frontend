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

const Home = ({navigation}) => {
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
        onPress={() => navigation.navigate('PostComplainTab')}
      >
        <View style={styles.card_body}
           
        >
          <Image
            style={styles.card_image}
            source={
              require("../assets/report.png")

            }
        
            // onPress={navigateToMyComplains}
          />
                    <Text style={styles.card_titleLOGO}>Report issue</Text>
        
    
     

        </View>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Contact')}
      >
        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/emergency_contact.png")
            }
          />
                    <Text style={styles.card_titleLOGO}>Contact US</Text>

        </View>

        </TouchableOpacity>

      </View>
      <View style={styles.card_template}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GovtOff')}
      >

        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/home_feed.png")
            }
          />
                    <Text style={styles.card_titleLOGO}>Government Offices</Text>

        </View>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Map')}
      >

        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/news.png")
            }
          />
                    <Text style={styles.card_titleLOGO}>Feeds</Text>

        </View>
        </TouchableOpacity>

      </View>
      <View style={styles.card_template}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Appinf')}
      >
        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/abdout_us.png")
            }
          />
          <Text style={styles.card_titleLOGO}>App Info</Text>

        </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quick')}
      >
        <View style={styles.card_body}>

          <Image
            style={styles.card_image}
            source={
              require("../assets/link.png")
            }

          />
          <Text style={styles.card_titleLOGO}>Quick Links</Text>

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
    flexDirection: "row",

    // height: 200,
   
  },
  card_body: {
    width: 150,
    height: 160,

    margin: 6,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",

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
    textAlign: "center",

  },
  card_title: {
    position: "absolute",
    left: 8,
    top: 140,
  },
});

export default Home;
