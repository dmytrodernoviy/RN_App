import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Image} from 'react-native'
import Logo from '../../assets/logo.png'
import LoginForm from '../forms/loginForm';
import { authorizeDataSave } from '../actions/main-actions';
import {connect} from 'react-redux'

export const {width, height} = Dimensions.get("window")

const mapStateToProps = state => ({
    authorizeData: state.authorizeData
})

const mapDispatchToProps = dispatch => ({
    userDataSave: (value) => dispatch(authorizeDataSave(value))
})
 
class LoginScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={Logo} 
                        style={styles.logo}/>
                <LoginForm navigation={this.props.navigation}
                            userDataSave={this.props.userDataSave}/>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: '#34a5de',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        marginTop: 30,
        width: 235,
        height: 210
    }
})
