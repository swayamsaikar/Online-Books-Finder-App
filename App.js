// ! This api Key will do not work Kindly put your own google Books api Key

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Linking,
} from "react-native";
import MyHeader from "./components/Header";
import { Button, ListItem, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ApiKey } from "./Config";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "rich Dad Poor Dad",
      data: [],
    };
  }

  fetchDataFromGoogleBooksApi = async (SearchedText) => {
    var TrimmedSearchedText = SearchedText.trim();
    try {
      // ! This api Key will do not work Kindly put your own google Books api Key
      var req = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${TrimmedSearchedText}${ApiKey}`
      );
      var res = await req.json();
      this.setState({ data: res.items });
    } catch (error) {
      alert("No Data Found With This Name !");
    }
  };

  componentDidMount() {
    this.fetchDataFromGoogleBooksApi(this.state.text);
  }

  render() {
    return (
      <View>
        <MyHeader title="Online Books Finder App" />
        {/* TextInput */}
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Icon name="person-search" size={30} color="grey" />
            <TextInput
              placeholder="Search Profile"
              style={styles.Input}
              value={this.state.text}
              onChangeText={(text) => {
                this.setState({ text: text });
              }}
            />
            <Button
              icon={{
                name: "search",
                size: 25,
                color: "#fff",
              }}
              buttonStyle={{ borderRadius: 45 }}
              onPress={() => {
                this.state.text
                  ? this.fetchDataFromGoogleBooksApi(this.state.text)
                  : alert("Please Type a valid Book name to get the Results!");
              }}
            />
          </View>
        </View>

        {/* Main Body */}
        {this.state.data ? (
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem bottomDivider style={{ marginBottom: 15 }}>
                {item.volumeInfo.imageLinks ? (
                  <Avatar
                    source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                    size={50}
                  />
                ) : (
                  <Avatar
                    source={require("./assets/request-book.png")}
                    size={50}
                  />
                )}
                <ListItem.Content>
                  <ListItem.Title numberOfLines={1} ellipsizeMode="tail">
                    {item.volumeInfo.title}
                  </ListItem.Title>
                  <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {item.volumeInfo.subtitle}
                  </ListItem.Subtitle>
                </ListItem.Content>

                <View
                  style={{
                    width: "29.5%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    title="View"
                    onPress={() => {
                      Linking.openURL(item.volumeInfo.previewLink);
                    }}
                    buttonStyle={{ backgroundColor: "#fdcb6e" }}
                  />
                  <Button
                    style={{ marginLeft: 20 }}
                    icon={{ name: "shopping-cart", color: "#fff", size: 25 }}
                    onPress={() => {
                      Linking.openURL(item.volumeInfo.infoLink);
                    }}
                    buttonStyle={{ backgroundColor: "#00b894" }}
                  />
                </View>
              </ListItem>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "70%",
            }}
          >
            <Text style={{ fontSize: 30, textAlign: "center" }}>
              This Book That You Now Searched Do Not Exists !
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    marginHorizontal: "5%",
  },
  Input: {
    borderBottomWidth: 1,
    borderColor: "#000",
    fontSize: 20,
    width: "70%",
    padding: 5,
  },
});
