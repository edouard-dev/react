import React, { Component } from "react";
import { Button, Text, View, ImageBackground, SafeAreaView, StyleSheet, FlatList } from "react-native";
import  {useRoute} from '@react-navigation/native'
class Flat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataApi: null
        };
    }


    render() {
        const route = this.props
        console.log("je suis test ", route);
        let data = this.state.dataApi
        return (
            <View style={styles.styleflat}>
                <ImageBackground source={require('./assets/iphone3.jpg')} style={styles.image}>
                    <SafeAreaView style={styles.container}>
                        {/* <FlatList
                            data={data}
                            renderItem={({ data }) => (
                                <View style={{ flex: 1, flexDirection: 'column', margin: 40 }}>
                                    <Image style={styles.imageThumbnail} source={{ uri: data.src }} />
                                </View>
                            )}
                            numColumns={1}
                            keyExtractor={(item, index) => index}
                        /> */}
                    </SafeAreaView>
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "stretch",
        justifyContent: "center"
    },
    styleflat: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
    }
});

export default Flat;