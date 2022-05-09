import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from '../../screens/Home';
import News from '../../screens/HomeScreen';
import Home from "../../screens/Home"
import Govt from "../../screens/Goverment"
import Cont from "../../screens/contact"
import Appinfo from "../../screens/Appinfo"
import QuickLink from "../../screens/QuickLink"


const Stack = createStackNavigator();



const FeedNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home'
                component={Home}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:132
                      },
                    
                }}

            />
               <Stack.Screen name='GovtOff' component={Govt}
                options={{
                    title: 'Govt Office',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:60
                      },
                }}
            />
               <Stack.Screen name='Map' component={News}
                options={{
                    title: 'All complain',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:60
                      },
                }}
            />
               <Stack.Screen name='Contact' component={Cont}
                options={{
                    title: 'Contact US',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:60
                      },
                }}
            />
               <Stack.Screen name='Appinf' component={Appinfo}
                options={{
                    title: 'App Info',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:60
                      },
                }}
            />
               <Stack.Screen name='Quick' component={QuickLink}
                options={{
                    title: 'Emergency Contact',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:30
                      },
                }}
            />
            {/* <Stack.Screen name='Map'
                component={MapScreen}
            /> */}

        </Stack.Navigator>
    )

}
export default FeedNavigator;