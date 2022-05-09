import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity, Alert, Button, Linking,
  
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


const cbc = "http://www.cbc.gov.pk/en ";
const cbf = "http://cbfaisal.gov.pk/en";
const kwsb = "https://www.kwsb.gos.pk/";
const kmc = "http://www.kmc.gos.pk/";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const Government = ({navigation}) => {
  
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
              require("../assets/CBC.png")

            }
        
        
          />
                    <Text style={styles.card_titleLOGO}></Text>
                    <OpenURLButton url={cbc}>CBC</OpenURLButton>
        
    
     

        </View>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
       
      >
        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/KMC.png")
            }
          />
                    <Text style={styles.card_titleLOGO}></Text>
                    <OpenURLButton url={kmc}>KMC</OpenURLButton>


        </View>

        </TouchableOpacity>

      </View>
      <View style={styles.card_template}>
      <TouchableOpacity
        style={styles.button}

      >

        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/KWSB.png")
            }
          />
                    <Text style={styles.card_titleLOGO}> </Text>
                    <OpenURLButton url={kwsb}>KWSB</OpenURLButton>

        </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
      
      >

        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/CBF.png")
            }
          />
                    <Text style={styles.card_titleLOGO}></Text>
                    <OpenURLButton url={cbf}>CBF</OpenURLButton>


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
    height: 240,
    margin: 6,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",

  },


  card_image: {
    width: 130,
    height: 140,
    // marginTop:20,
    marginLeft: 10,
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

export default Government;
