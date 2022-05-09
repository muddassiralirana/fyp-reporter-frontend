
import Screen from '../components/Screen';



import React, { useEffect, useState, useCallback } from "react";
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert, Button, Linking,
} from "react-native";
import Text from "../components/text/AppText";
import environment from "../config/environment/environment";
import Card from "../components/Card";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import socket from "../config/socket";
import ActivityIndicator from "../components/ActivityIndicator";

const bullying = "https://paycheck.pk/career-tips/workplace-bullying ";
const cyber_Crime = "https://www.zameen.com/blog/cybercrime-laws-pakistan.html ";
const domestic_violence = "http://www.mohr.gov.pk/NewsDetail/ZjRhOTFjNWUtMjk3Ny00Njk5LWE3MGItNmMyNGVjOTAyNDky#:~:text=Introducing%20the%20bill%2C%20Federal%20Human,gravity%20of%20the%20crime%20committed. ";
const Emotional_Violence = "https://hamarainternet.org/resources/laws-domestic-violence/ ";
const harassment = "https://blog.siasat.pk/9-harassment-laws-pakistani-woman/ ";
const sexual_assualt = "https://paycheck.pk/labour-laws/fair-treatment/sexual-harassment-1/sexual-harassment-old";



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

const CivicLawsScreen = ({ navigation }) => {
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
    
          <View style={styles.card_body}>
            <Image
              style={styles.card_image}
              source={
                require("../assets/bullying.png")
              }
            />
            <Text style={styles.card_titleLOGO}></Text>
            <OpenURLButton url={bullying}>Bullying</OpenURLButton>

          </View>
     
        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/cyber_crime.png")
            }
          />
          <Text style={styles.card_titleLOGO}></Text>
          <OpenURLButton url={cyber_Crime}>cyber_Crime</OpenURLButton>


        </View>

      </View>
      <View style={styles.card_template}>
        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/domestic_violence.png")
            }
          />
          <Text style={styles.card_titleLOGO}></Text>
          <OpenURLButton url={domestic_violence}>Domestic_Violence</OpenURLButton>

        </View>
        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/Emotional_Violence.png")
            }
          />
          <Text style={styles.card_titleLOGO}></Text>
          <OpenURLButton url={Emotional_Violence}>Emotional_Violence</OpenURLButton>

        </View>

      </View>
      <View style={styles.card_template}>
        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/harassment.png")
            }
          />
          <Text style={styles.card_titleLOGO}></Text>
          <OpenURLButton url={harassment}>Harassment</OpenURLButton>

        </View>
        <View style={styles.card_body}>
          <Image
            style={styles.card_image}
            source={
              require("../assets/sexual_assualt.png")
            }
          />
          <Text style={styles.card_titleLOGO}></Text>
          <OpenURLButton url={sexual_assualt}>Sexual Assualt</OpenURLButton>

        </View>

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
            <Text style={styles.card_titleLOGO}>Info</Text>
            {/* <OpenURLButton url={supportedURL}>Info</OpenURLButton> */}

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
            {/* <OpenURLButton url={supportedURL}>Quick Links</OpenURLButton> */}


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
    // margin:8
  },

  card_template: {
    flex: 1,
    flexDirection: "row",

    // height: 200,
 
  },
  card_body: {
    width: 168,
    height: 120,
    margin: 2,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",

  },


  card_image: {
    width: 50,
    height: 50,
    // marginTop:20,
    marginLeft: 60,
    // marginRight:20,
    borderRadius: 10,
  },
  card_titleLOGO: {
    textAlign: "center",

  },
  card_title: {
    position: "absolute",
    left: 0,
    top: 140,
  },
});

export default CivicLawsScreen;
