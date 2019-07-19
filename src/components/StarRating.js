import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Text,
    Image,
} from 'react-native';

//type Props = {};

export default class StarRating extends Component{
	render() {
		return (
			<View style={ styles.container }>
                <Image
                    style={styles.star}
                    source={require('../images/star_check.png')} />
                <Image
                    style={styles.star}
                    source={require('../images/star_check.png')} />
                <Image
                    style={styles.star}
                    source={require('../images/star_check.png')} />
                <Image
                    style={styles.star}
                    source={require('../images/star_unchek.png')} />
                <Image
                    style={styles.star}
                    source={require('../images/star_unchek.png')} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 100,
        height: 50,
        flexDirection: 'row'
    },
    star: {
        width: 15,
        height: 15
       }
});