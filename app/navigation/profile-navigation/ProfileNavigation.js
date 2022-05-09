import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from '../../screens/ProfileScreen';
import MyComplainsScreen from '../../screens/MyComplainsScreen';


const Stack = createStackNavigator();



const ProfileNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='MyProfile' component={ProfileScreen}
                options={{
                    title: 'My Profile',
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:110
                      },
                }}
            />
            <Stack.Screen name='MyComplains' component={MyComplainsScreen}
                options={{
                    title: 'My Complains'
                }}
            />

        </Stack.Navigator>
    )

}
export default ProfileNavigation;