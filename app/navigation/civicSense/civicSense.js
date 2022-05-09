import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from '../../screens/Home';
import MapScreen from '../../screens/MapScreen';
import Home from "../../screens/Home"
import CivicSense from "../../screens/CivicSensesScreen"
import Enviroment from '../../screens/Enviroment';
import Emo from '../../screens/Emo';
import Trafic from '../../screens/Trafic';
import Covid from '../../screens/Covid';
import Plants from '../../screens/Plants';
import Savewater from '../../screens/Savewater';
const Stack = createStackNavigator();



const CivicSenses = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Civic Senses'
                component={CivicSense}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:105
                      },
                    
                }}

            />
              <Stack.Screen name='Emo' component={Emo}
                options={{
                    title: 'EMOTIONAL HEALTH ',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:26
                      },
                }}
            />
              <Stack.Screen name='Enviroment' component={Enviroment}
                options={{
                    title: 'Environment Clean',
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
              <Stack.Screen name='Trafic' component={Trafic}
                options={{
                    title: 'TRAFFIC RULES',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:40
                      },
                }}
            />
              <Stack.Screen name='Savewater' component={Savewater}
                options={{
                    title: 'Save Water',
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
              <Stack.Screen name='Plants' component={Plants}
                options={{
                    title: 'Plants ',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:80
                      },
                }}
            />
              <Stack.Screen name='Covid' component={Covid}
                options={{
                    title: 'CORONA VIRUS',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:40
                      },
                }}
            />
            {/* <Stack.Screen name='Map'
                component={MapScreen}
            /> */}

        </Stack.Navigator>
    )

}
export default CivicSenses;