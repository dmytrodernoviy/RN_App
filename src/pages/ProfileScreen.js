import React, {Component} from 'react'
import {View, 
        StyleSheet, 
        Text, 
        TouchableOpacity, 
        Image, 
        Alert, 
        AsyncStorage} 
from 'react-native'
import { ImagePicker, Permissions } from 'expo';
import defaultAvatar from "../../assets/default-avatar.png"
import editImage from '../../assets/add-photo.png'
import {connect} from 'react-redux'
import {width, height} from '../pages/LoginScreen'
import { editUserData, takeAvatarUri } from '../actions/main-actions';
import EditUserDataForm from '../forms/editUserDataForm';

const mapStateToProps = state => ({
    userData: state.userData,
    imageUri: state.imageUri
})

const mapDispatchToProps = dispatch => ({
    editUserData: (value) => dispatch(editUserData(value)),
    takeAvatarUri: (value) => dispatch(takeAvatarUri(value))
})

class ProfileScreen extends Component {
    launchImageLibrary = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!cancelled) {
            this.props.takeAvatarUri(uri)
            AsyncStorage.setItem('avatar', uri)
        }
    };
    
    launchCamera = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });
        if (!cancelled) {
            this.props.takeAvatarUri(uri)
            AsyncStorage.setItem('avatar', uri)
        }
    };

    selectAvatar = () => {
        Alert.alert('Select Avatar', 'Select Photo', 
        [{ text: 'Camera', onPress: () => this.launchCamera() },
         { text: 'Library', onPress: () => this.launchImageLibrary() }])
    }

    goBack = () => {
        this.props.navigation.navigate('NotationsScreen')
    }

    render() {
        const {imageUri} = this.props
        return(
            <View>
                <View style={styles.header}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={this.goBack}>
                            <Text style={styles.text}>Go back</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Profile</Text>
                    </View>
                </View>

                <View style={{alignItems: 'center'}}>
                    <View style={styles.userPhoto}>
                        <Image  source={!imageUri ? defaultAvatar : {uri: imageUri}} 
                                style={styles.imageUser}/>
                        <TouchableOpacity   style={{position: "absolute"}} 
                                            onPress={this.selectAvatar}>
                            <View>
                                <Image source={editImage} style={styles.editImage}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <EditUserDataForm userData={this.props.userData}
                                        editUserData={this.props.editUserData}
                                        navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

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
    userPhoto: {
        width: 200,
        height: 200,
        marginTop: 15
    },
    imageUser: {
        width: 200,
        height: 200,
        borderWidth: 3,
        borderRadius: 75,
        borderColor: '#34a5de',
        zIndex: -10,
    },
    editImage: {
        width: 50,
        height: 50,
        zIndex: 10,
        left: 150
    }
})