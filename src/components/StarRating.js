import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Image,
} from 'react-native';

/*type Props = {
    ratingobj : {
        ratings: Number;
        vews: Number;
    }
};*/

export default class StarRating extends Component{
	render() {
        // Recieve the ratings object from the props
        let ratingObj = this.props.ratingObj;

        // This array will contain our star tags. We will include this
        // array between the view tag.
        let stars = [];
        // Loop 5 times
        for (var i = 1; i <= 5; i++) {
            // set the path to filled stars
            let path = require('../images/star_check.png');
            // If ratings is lower, set the path to unfilled stars
            if (i > ratingObj.ratings) {
                path = require('../images/star_unchek.png');
            }

            stars.push((<Image key={i} style={styles.image} source={path} />));
        }

        return (
            <View style={ styles.container }>
                { stars }
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
       },
       image: {
		width: 12,
		height: 12
	},
});