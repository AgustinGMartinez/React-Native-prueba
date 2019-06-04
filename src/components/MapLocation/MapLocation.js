import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import imagePlaceholder from '~/src/assets/beautiful-place.jpg';

function MapLocation() {
	return (
		<>
			<View style={s.placeholder}>
				<Image source={imagePlaceholder} style={s.previewImage} />
			</View>
			<View style={s.button}>
				<Button
					title="Localizame"
					onPress={() => alert('MapLocation')}
				/>
			</View>
		</>
	);
}

const s = StyleSheet.create({
	placeholder: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '80%',
		height: 150,
	},
	button: {
		margin: 8,
	},
	previewImage: {
		width: '100%',
		height: '100%',
	},
});

export default MapLocation;
