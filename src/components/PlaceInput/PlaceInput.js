import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DefaultInput from '~/src/components/UI/DefaultInput/DefaultInput';

class PlaceInput extends Component {
	state = {
		placeName: '',
	};

	placeNameChangedHandler = val => {
		this.setState({
			placeName: val,
		});
		this.props.subscribe(val);
	};

	render() {
		return (
			<DefaultInput
				placeholder="Nombre del lugar"
				value={this.state.placeName}
				onChangeText={this.placeNameChangedHandler}
			/>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	placeInput: {
		width: '70%',
	},
	placeButton: {
		width: '30%',
	},
});

export default PlaceInput;
