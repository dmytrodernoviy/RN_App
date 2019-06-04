import React, {Component} from 'react'
import {View, 
        Text, 
        AsyncStorage, 
        ActivityIndicator} 
from 'react-native'

class LoadScreen extends Component {
    async componentDidMount() {
        try {
            const result = await AsyncStorage.getItem('authorizeData');
            if(result) {
                // Только так удалось решить проблему рывка анимации при инициализации))))
                setTimeout(() => this.props.navigation.navigate('NotationsScreen'), 0)
            } else {
                setTimeout(() => this.props.navigation.navigate('LoginScreen'), 0)
            }
        } catch(error) {
            console.log(error);
        }
    }

    render(){
        return(
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#34a5de"/>
                <Text style={{marginTop: 10}}>Loading...</Text>
            </View>
        )
    }
}

export default LoadScreen