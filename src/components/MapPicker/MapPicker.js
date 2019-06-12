import React, { useState } from 'react';
import { StyleSheet, View, Button, Image, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

function MapPicker() {
	const [mapState, setMapState] = useState({
		latitude: -34.605013,
		longitude: -58.381781,
		latitudeDelta: 0.0122,
		longitudeDelta:
			(Dimensions.get('window').width / Dimensions.get('window').height) *
			0.0122,
	});
	return (
		<>
			<MapView
				initialRegion={mapState}
				provider={PROVIDER_GOOGLE}
				style={s.map}
			/>
			<View style={s.button}>
				<Button title="Localizame" onPress={() => alert('MapPicker')} />
			</View>
		</>
	);
}

const s = StyleSheet.create({
	map: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '100%',
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

export default MapPicker;
