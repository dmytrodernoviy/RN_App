import React from 'react';
import {StyleSheet, 
        Text, 
        View, 
        TextInput, 
        Dimensions, 
        TouchableOpacity, 
        AsyncStorage } 
from 'react-native';

export const {width, height} = Dimensions.get("window")

export default class LoginForm extends React.Component {
    validates = () => { 
        let email= this.refs.email._lastNativeText
        let password = this.refs.password._lastNativeText
        let authorizeData = {
            email: email,
            password: password
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 

        if(reg.test(email) === false) { 
            alert("Invalid email") 
        } else if(password.length < 8) {
            alert("Password at least 8 characters")
        } else {
            this.login(authorizeData)
        } 
    } 

    login = (authorizeData) => {
        let itemsUserData = [
            ['email', authorizeData.email], 
            ['password', authorizeData.password]
        ]

        this.props.userDataSave(authorizeData)
        AsyncStorage.setItem('authorizeData', JSON.stringify(itemsUserData))
        this.props.navigation.navigate('NotationsScreen')
    }

    render() {
    return (
        <View style = {styles.inputContainer}>
                <TextInput  
                    type='email'
                    keyboardType='email-address'
                    style={styles.input}
                    placeholder="Email"
                    underlineColorAndroid='transparent'
                    ref='email'/>
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    ref="password"/>
                <TouchableOpacity style={styles.button} onPress={this.validates} >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: .07 * height,
        width: .9 * width,
        backgroundColor: 'white',
        borderRadius: 50,
        fontSize: .035 * height,
        paddingLeft: 20,
        paddingRight: 20,
        opacity: .7,
        marginBottom: 10
    },
    inputContainer: {
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        width: .9 * width,
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
    }
})