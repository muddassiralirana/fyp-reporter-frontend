import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedNavigator from "../FeedNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ComplainButton from '../../components/ComplainButton';
import ProfileNavigation from '../profile-navigation/ProfileNavigation';
import PostNavigation from '../post-navigation.js/PostNavigation';
import CivicLawsScreen from '../../screens/CivicLawsScreen';
import CivicSensesScreen from '../../screens/CivicSensesScreen';
import CivicSenses from '../civicSense/civicSense';
import CivicLaw from '../civicLaw';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    paddingBottom: 6
                },
            }}
     
        >
            <Tab.Screen name='Feed' component={FeedNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home"  color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Civic Senses"
                component={CivicSenses}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="head-lightbulb-outline" color={color} size={size} />
                    ),
                    tabBarLabel: 'Civic Senses',
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:10
                      },
                }
                }
            />
            <Tab.Screen
                name="PostComplainTab"
                component={PostNavigation}
                options={({ navigation }) => ({
                    tabBarButton: () => (
                        <ComplainButton
                            onPress={() => navigation.navigate('PostComplainTab')}
                        />
                    ),
                    tabBarLabel: 'Post Complain',
                    headerShown: false
                })}
            />
            <Tab.Screen
                name="Civic Laws"
                component={CivicLaw}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="scale-balance" color={color} size={size} />
                    ),
                    tabBarLabel: 'Civic Laws',
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:100
                      },
                }
                }
            />


            <Tab.Screen
                name="Profile"
                component={ProfileNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                    tabBarLabel: 'Profile',
                    title: 'My Profile',
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#2e88de',
                        
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                        // textAlign:"center",
                        margin:130
                      },
                }
                }
            />
        </Tab.Navigator>
    )
}

export default AppNavigation;