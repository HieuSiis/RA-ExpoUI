import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Linking } from "react-native";
import { Icon, Image } from "react-native-elements";

import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import {
  fetchLeaders,
  fetchDishes,
  fetchComments,
  fetchPromos,
  logoutUser,
} from "../redux/ActionCreators";

import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";

function TabNavigatorScreen() {
  const TabNavigator = createBottomTabNavigator();
  return (
    <TabNavigator.Navigator initialRouteName="Login">
      <TabNavigator.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}

function LoginNavigatorScreen() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator
      initialRouteName="LoginRegister"
      screenOptions={{
        headerStyle: { backgroundColor: "#7cc" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <LoginNavigator.Screen
        name="LoginRegister"
        component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerTitle: "Login",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </LoginNavigator.Navigator>
  );
}

function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#7cc" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: "Home",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </HomeNavigator.Navigator>
  );
}

function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator
      initialRouteName="About"
      screenOptions={{
        headerStyle: { backgroundColor: "#7cc" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <AboutNavigator.Screen
        name="About Us"
        component={About}
        options={({ navigation }) => ({
          headerTitle: "About",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </AboutNavigator.Navigator>
  );
}

function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: { backgroundColor: "#7cc" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerTitle: "Menu",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: "Dish Detail" }}
      />
    </MenuNavigator.Navigator>
  );
}

function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerStyle: { backgroundColor: "#7cc" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ContactNavigator.Screen
        name="Contact"
        component={Contact}
        options={({ navigation }) => ({
          headerTitle: "Contact",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ContactNavigator.Navigator>
  );
}

function CustomDrawerContent(props) {
  const users = props.users;
  const logoutUser = props.logoutUser;
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#7cc",
          height: 80,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: baseUrl + "images/logo.png" }}
            style={{ margin: 10, width: 80, height: 60 }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            Welcome
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      {/* <DrawerItem label='Help'
        icon={({ focused, color, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />}
        onPress={() => Linking.openURL('https://www.facebook.com/cenlly.nguyen.1/?viewas=100000686899395')} /> */}
      {users.logged === false ? (
        <DrawerItem
          label="Help"
          icon={({ focused, color, size }) => (
            <Icon name="help" size={size} color={focused ? "#7cc" : "#ccc"} />
          )}
          onPress={() =>
            Linking.openURL(
              "https://www.facebook.com/cenlly.nguyen.1/?viewas=100000686899395"
            )
          }
        />
      ) : (
        <DrawerItem
          label={"[" + users.userinfo.username + "] Logout"}
          icon={({ focused, color, size }) => (
            <Icon
              name="sign-out"
              type="font-awesome"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          )}
          onPress={() => {
            logoutUser();
            props.navigation.navigate("HomeScreen");
          }}
        />
      )}
    </DrawerContentScrollView>
  );
}

function ReservationNavigatorScreen() {
  const ReservationNavigator = createStackNavigator();
  return (
    <ReservationNavigator.Navigator
      initialRouteName="Reservation"
      screenOptions={{
        headerStyle: { backgroundColor: "#7cc" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ReservationNavigator.Screen
        name="Reservation"
        component={Reservation}
        options={({ navigation }) => ({
          headerTitle: "Reserve Table",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ReservationNavigator.Navigator>
  );
}

function FavoritesNavigatorScreen() {
  const FavoritesNavigator = createStackNavigator();
  return (
    <FavoritesNavigator.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerStyle: { backgroundColor: "#7cc" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <FavoritesNavigator.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerTitle: "My Favorites",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <FavoritesNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: "Dish Detail" }}
      />
    </FavoritesNavigator.Navigator>
  );
}

function MainNavigatorScreen(props) {
  const users = props.users;
  const logoutUser = props.logoutUser;
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator
      initialRouteName="HomeScreen"
      drawerContent={(props) => (
        <CustomDrawerContent {...props} users={users} logoutUser={logoutUser} />
      )}
    >
      {users.logged === false ? (
        <MainNavigator.Screen
          name="LoginScreen"
          component={LoginNavigatorScreen}
          options={{
            title: "Login",
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <Icon
                name="sign-in"
                type="font-awesome"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
      ) : null}
      <MainNavigator.Screen
        name="HomeScreen"
        component={HomeNavigatorScreen}
        options={{
          title: "Home",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" size={size} color={focused ? "#7cc" : "#ccc"} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="AboutScreen"
        component={AboutNavigatorScreen}
        options={{
          title: "About Us",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="info" size={size} color={focused ? "#7cc" : "#ccc"} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="MenuScreen"
        component={MenuNavigatorScreen}
        options={{
          title: "Menu",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="menu" size={size} color={focused ? "#7cc" : "#ccc"} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="ContactScreen"
        component={ContactNavigatorScreen}
        options={{
          title: "Contact Us",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="contacts"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      {users.logged === true ? (
        <MainNavigator.Screen
          name="ReservationScreen"
          component={ReservationNavigatorScreen}
          options={{
            title: "Reserve Table",
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <Icon
                name="cutlery"
                type="font-awesome"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
      ) : null}
      <MainNavigator.Screen
        name="FavoritesScreen"
        component={FavoritesNavigatorScreen}
        options={{
          title: "My Favorites",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="heart"
              type="font-awesome"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}

// redux
const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  logoutUser: () => dispatch(logoutUser()),
});
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen
          users={this.props.users}
          logoutUser={this.props.logoutUser}
        />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
