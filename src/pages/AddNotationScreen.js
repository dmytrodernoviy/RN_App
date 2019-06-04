import React, {Component} from 'react'
import {View, 
        Text, 
        StyleSheet, 
        TextInput, 
        TouchableOpacity, 
        AsyncStorage} 
from "react-native"
import {width, height} from '../pages/LoginScreen'
import {connect} from 'react-redux'
import { addNewNotation } from '../actions/main-actions';

const mapStateToProps = state => ({
    notations: state.notations
})

const mapDispatchToProps = dispatch => ({
    addNotation: (value) => dispatch(addNewNotation(value))
})

class AddNotationScreen extends Component {

    addNotation = () => {
        let notationText = this.refs.notationText._lastNativeText
        let {addNotation, navigation, notations} = this.props

        if(!notationText) {
            alert("Please enter notation text")
        } else {
            addNotation(notationText)
            AsyncStorage.setItem(`notation ${notations.length}`, notationText)
            this.refs.notationText.clear()
            navigation.navigate("NotationsScreen")
        }
    }

    goBack = () => {
        this.props.navigation.navigate('NotationsScreen')
    }

    render() {
        return(
            <View style={{alignItems: 'center'}}>
                <View style={styles.header}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={this.goBack}>
                            <Text style={styles.text}>Go back</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Add new notation</Text>
                    </View>
                </View>

                <View style={styles.containerAddNotation}>
                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Type new notation"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                            ref="notationText"
                            />
                    </View>

                    <TouchableOpacity onPress={this.addNotation}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Add</Text>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotationScreen)

const styles = StyleSheet.create({
    header: {
        height: .11 * height,
        width: width,
        backgroundColor: '#34a5de',
        padding: 10,
        justifyContent: 'flex-end',
    },
    headerContainer: {
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: "row",
    },
    text: {
        fontSize: 22,
        color: "white"
    },
    textAreaContainer: {
        width: .9 * width,
        borderColor: '#34a5de',
        borderWidth: 3,
        borderRadius: 5,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        fontSize: 20,
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
    },
    containerAddNotation: {
        marginTop: 40,
        height: .35 * height,
        justifyContent: 'space-between'
    }
})