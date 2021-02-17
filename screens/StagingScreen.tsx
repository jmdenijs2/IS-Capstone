import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { MenuItem } from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Image } from 'react-native'
import { Card, Input } from 'react-native-elements'
import InputSpinner from "react-native-input-spinner";

export default function StagingScreen({route}) {
    const [quantity, setQuantity] = React.useState(1);
    const myMenuItem = route.params.MenuItem;

    const {
      name,
      image,
      longDesc,
      shortDesc,
      ABV,
      Allergens,
      price,
      mandatoryMods,
    } = myMenuItem;

    return (

        <View style={styles.container}>
          <Card containerStyle={{width: '95%'}}>
            <Card.Image source={{uri: image}}>
            
            </Card.Image>
            <Card.Title>{name}                       ${Number(price).toFixed(2)}</Card.Title>
            <Text style={{marginBottom: 10}}>
                {longDesc}
            </Text>

          </Card>
          
          <InputSpinner
            style = {styles.spinner}
            width = {200}
            max={10}
            min={1}
            step={1}
            colorMax={"#f04048"}
            value={quantity}
            onChange={(num:number) => {
              setQuantity(num);
            }}
          />
          <Card containerStyle={{width: '95%'}}>
            <Input
              placeholder='Notes for the chef...'
            />
          </Card>
          

          {/* <View style={styles.bottomcontainer}> */}
            <Card>
            <MaterialCommunityIcons.Button
                      name="tray-plus"
                      size={34} 
                      color="white"
                      backgroundColor="#a28"
                      accessibilityLabel="Confirm add item">
                         {`Confirm order                                 $${Number(quantity * price).toFixed(2)}`}
                      
            </MaterialCommunityIcons.Button>
          
            </Card>
          {/* </View> */}

        </View>    
    )

    // after confirm the order we want send user back to previous page
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '70%',
    justifyContent: "center",
    alignItems: 'center',

  },
  bottomcontainer: {
    width: '105%',
    height: 100,
    justifyContent: 'center',

    position: 'absolute',
    bottom: 0, 
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
  spinner: {
    margin: 15,
  }
});