import * as React from "react";
import { StyleSheet, SectionList } from "react-native";
import { Text, View } from "../components/Themed";
import MenuTitleComponent from "../components/MenuTitleComponent";
import MenuItemComponent from "../components/MenuItemComponent";
import DefaultRestaurant from "../constants/DefaultRestaurant";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from "../components/SearchBar";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Get the pushToken from local storage
// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@pushToken')
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch(e) {
//     // error reading value
//     console.log(e)
//   }
// }

export default function MenuScreen({ route }) {
  const { restaurant } = route.params;
  const { menu } = restaurant;
  const categories = extractCategories(menu);
  const renderItem = ({ item }) => (
    <View>
      <MenuItemComponent menuItem={item}>
          {/**Use a convenient button component from react-native-vector-icons to create an add to tray button.*/}
          <MaterialCommunityIcons.Button
            name="tray-plus"
            size={24} 
            color="white"
            backgroundColor="#a28"
            accessibilityLabel="Add item to tray"
            >
              Add
          </MaterialCommunityIcons.Button>
      </MenuItemComponent>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <MenuTitleComponent
        title={restaurant.name ?? DefaultRestaurant.name}
      ></MenuTitleComponent> */}
      {/*<MenuItemComponent menuItem={restaurant.menu[0]} />*/}
      <SearchBar
        renderFunction={renderItem}
        dataToBeSearched={menu}
        fieldToSearch={"name"}
      />
      <SectionList
        sections={categories}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        style={{paddingTop: 5, height: "100%"}}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => <Text style={{fontWeight: "500", fontSize: 15}}>{title}</Text>}
        contentContainerStyle={{paddingBottom: 50}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const reducer = (accumulator, currentItem) => {
  if (accumulator[currentItem.category]) {
    accumulator[currentItem.category].push(currentItem);
  } else {
    accumulator[currentItem.category] = [currentItem];
  }
  return accumulator;
};

const extractCategories = (menu: any) => {
  const categoriesObj = menu.reduce(reducer, {});
  return Object.keys(categoriesObj).map((category) => ({
    title: category,
    data: categoriesObj[category],
  }));
};

//An example of calling this function from a button may look like async () => sendPushNotification()
// async function sendPushNotification() {
//   const expoPushToken = await getData()
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   }

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }
