import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class RadioButtons extends Component {
	state = {
		value: 'M',
	};

	render() {
		const { options } = this.props;
		const { value } = this.state;

		return (
			<View style={{flexDirection:'row',marginLeft:15,}}>
				{options.map(item => {
					return (
						<View key={item.key} style={styles.buttonContainer}>
							
							<TouchableOpacity
								style={styles.circle}
								onPress={() => {
									this.setState({
										value: item.key,
									});
									console.log(value);
									this.props.callbackFromParent(value);
								}}
							>
								{value === item.key && <View style={styles.checkedCircle} />}
							</TouchableOpacity>
							<Text style={{marginLeft:5,}}>{item.text}</Text>
						</View>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft:15,
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
	},
  
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 6,
		backgroundColor: 'white',
	},
});
