import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from '../../screens/Home';
import MapScreen from '../../screens/MapScreen';
import Home from "../../screens/Home"
import CivicLaws from "../../screens/CivicLawsScreen"
import QuickLink from '../../screens/QuickLink';
import Appinfo from '../../screens/Appinfo';


const Stack = createStackNavigator();



const CivicLaw = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Civic Laws'
                component={CivicLaws}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:115
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
export default CivicLaw;