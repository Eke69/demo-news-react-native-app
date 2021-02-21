import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import NewsFeed from "./src/Components/NewsFeed";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import ArticleContent from "./src/Components/ArticleContent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Article } from "./src/article.interface";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getNews } from "./src/utils";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const fetchNews = () => {
    getNews().then((articles) => {
      setArticles(articles);
      setIsRefreshing(false);
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  function handleRefresh() {
    setIsRefreshing(true);
    fetchNews();
  }
  type StackParamList = {
    HomeScreen: undefined;
    NewsFeedScreen: undefined;
    ContentScreen: { article: Article };
  };
  type ContentScreenRouteProp = RouteProp<StackParamList, "ContentScreen">;

  type ContentScreenNavigationProp = StackNavigationProp<
    StackParamList,
    "ContentScreen"
  >;
  type ContentScreenProps = {
    route: ContentScreenRouteProp;
    navigation: ContentScreenNavigationProp;
  };
  function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

  function NewsFeedScreen({
    navigation,
  }: {
    navigation: ContentScreenNavigationProp;
  }) {
    const handlePress = (article: Article) =>
      navigation.navigate("ContentScreen", { article });
    return (
      <View style={styles.container}>
        <NewsFeed
          articles={articles}
          handlePress={handlePress}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  function ContentScreen({ route }: ContentScreenProps) {
    const { article } = route.params;
    return (
      <View style={styles.container}>
        <ArticleContent article={article} />
      </View>
    );
  }

  const Stack = createStackNavigator<StackParamList>();
  const Tab = createBottomTabNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NewsFeedScreen" component={NewsFeedScreen} />
      </Stack.Navigator>
    );
  }
  function NewsFeedStack() {
    return (
      <Stack.Navigator initialRouteName="NewsFeedScreen">
        <Stack.Screen name="NewsFeedScreen" component={NewsFeedScreen} />
        <Stack.Screen name="ContentScreen" component={ContentScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: "#42f44b",
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color="blue" size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="NewsFeedStack"
          component={NewsFeedStack}
          options={{
            tabBarLabel: "Feed",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" color="blue" size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
