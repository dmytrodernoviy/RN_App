import React, {Component} from 'react'
import {View, 
        Text, 
        StyleSheet, 
        TouchableOpacity, 
        ScrollView, 
        Image, 
        AsyncStorage} 
from 'react-native'
import {width, height} from '../pages/LoginScreen'
import {connect} from 'react-redux'
import defaultAvatar from '../../assets/default-avatar.png'

const mapStateToProps = state => ({
    notations: state.notations,
    userData: state.userData,
    imageUri: state.imageUri
})

class NotationsScreen extends Component {
    // just add initialState notations to asyncStorage
    componentDidMount() {
        this.props.notations.forEach((item, index) => {
            AsyncStorage.setItem(`notation ${index + 1}`, item)
        })
    }

    toAddNotation = () => {
        this.props.navigation.navigate('AddNotationScreen')
    }

    toProfile = () => {
        this.props.navigation.navigate('ProfileScreen')
    }

    render() {
        const {notations, userData, imageUri} = this.props
        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.headerContaner}>
                        <Text style={styles.text}>Notations</Text>
                        <TouchableOpacity onPress={this.toAddNotation}>
                            <View>
                                <Text style={styles.addTouch}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.userBlock}>
                            <View>
                                <Image source={!imageUri ? defaultAvatar : {uri: imageUri}} style={styles.imageUser}/>
                            </View>
                        <View >
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.userText}>
                                    {!userData.firstname ? 'User' : userData.firstname}
                                </Text>
                                <Text style={styles.userText}>
                                    {!userData.lastname ? 'Name' : userData.lastname}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={this.toProfile} >
                                <Text style={styles.buttonText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.notationsContainer}>
                        {notations.map((item, index) => {
                            return (
                                <View style={styles.notationBlock} key={index}>
                                    <Text style={styles.notationHeader}>Notation #{index + 1}</Text>
                                    <Text style={styles.notationText}>{item}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default connect(mapStateToProps)(NotationsScreen)

const styles = StyleSheet.create({
    header: {
        height: .13 * height,
        width: width,
        backgroundColor: '#34a5de',
        justifyContent: "flex-end",
        paddingLeft: 15,
        paddingRight: 20,
        paddingBottom: 10
    },
    text: {
        fontSize: 30,
        color: "white"
    },
    headerContaner: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    imageUser: {
        width: 125,
        height: 125,
        borderWidth: 3,
        borderRadius: 62.5,
        borderColor: '#34a5de',
        zIndex: -10,
    },
    addTouch: {
        color: "white",
        fontSize: 40
    },
    notationsContainer: {
        width: width,
        alignItems: "center",
        paddingTop: .03 * height
    },
    notationBlock: {
        width: .95 * width,
        borderWidth: 2,
        borderColor: "#34a5de",
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    notationText: {
        fontSize: 18,
        marginTop: 10
    },
    notationHeader: {
        fontSize: 25,
        fontWeight: "bold"
    },
    userBlock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width * .95,
        marginLeft: width * .025,
        marginTop: 10
    },
    button: {
        width: .5 * width,
        height: .055 * height,
        backgroundColor: "#1cd4a8",
        borderRadius: 50,
        fontSize: .03 * height,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        fontSize: .035 * height,
        color: 'white'
    },
    userText: {
        fontSize: 20,
        marginLeft: 10
    }
})


