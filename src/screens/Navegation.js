/** @format */

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./Autentication/SplashScreen";
import LoginScreen from "./Autentication/LoginScreen";
import ForgotPasswordScreen from "./Autentication/ForgotPasswordScreen";
import OTPScreen from "./Autentication/OTPScreen";
import ResetPasswordScreen from "./Autentication/ResetPasswordScreen";

import Home from "./Home/Home";
import Street from "./Home/Street";
import Municipe from "./components/ListMunicipeLuanda";
import ListMunicipeOthersProvincia from "./components/ListMunicipeOthersProvincia";
import ListViewAtms from "./Home/ListViewAtms";
import Map from "./components/Map";
import MapAtmView from "./Home/MapAtmView";
import RegisterScreen from "./Autentication/RegisterScreen";
import HomeAngent from "./agent/HomeAgent";
import { Provider } from "react-redux";
import { Store } from "../features/store/index";
const Stack = createStackNavigator();

function Navegation() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen
            name="HomeAgent"
            component={HomeAngent}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MapAtmView"
            component={MapAtmView}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Forgot"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Map"
            component={Map}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ListViewAtms"
            component={ListViewAtms}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Street"
            component={Street}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Municipe"
            component={Municipe}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MunicipeOtherProvince"
            component={ListMunicipeOthersProvincia}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OTP"
            component={OTPScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reset"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navegation;
