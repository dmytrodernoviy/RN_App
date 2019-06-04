import React, {Component} from 'react'
import {View, 
        TextInput,
        TouchableOpacity, 
        Text, 
        StyleSheet} 
from 'react-native'

import {width, height} from '../pages/LoginScreen'

export default class EditUserDataForm extends Component {

    saveChanges = () => {
        let firstname = this.refs.firstname._lastNativeText
        let lastname = this.refs.lastname._lastNativeText
        let data = {
            firstname: firstname,
            lastname: lastname
        }

        this.props.editUserData(data)
        this.props.navigation.navigate('NotationsScreen')
    }

    render() {
        const {firstname, lastname} = this.props.userData
        return(
            <View style={styles.editContainer}>
                <View style={styles.inputContainer}>
                    <Text style={{fontSize: 25}}>First name:</Text>
                    <TextInput  style={styles.text} 
                                placeholder={!firstname ? "User" : firstname} 
                                ref="firstname"/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{fontSize: 25}}>Last name:</Text>
                    <TextInput  style={styles.text} 
                                placeholder = {!lastname ? "Name" : lastname} 
                                ref="lastname"/>
                </View>
                <TouchableOpacity onPress={this.saveChanges}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        width: width * .35
    },
    editContainer: {
        marginTop: 20,
        width: width * .7,
        height: height * .25,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputContainer: {
        width: width * .7,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: .7 * width,
        height: .07 * height,
        backgroundColor: "#1cd4a8",
        borderRadius: 50,
        fontSize: .035 * height,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: .035 * height,
        color: 'white'
    },
})
