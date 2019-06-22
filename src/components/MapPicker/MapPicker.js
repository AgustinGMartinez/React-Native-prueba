import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Button,
	Dimensions,
	PermissionsAndroid,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import sharePlaceActions from '../../actions/sharePlaceActions';

function MapPicker(props) {
	// ----------------------------- VARS AND STATES --------------------------------

	let mapRef = useRef();
	const [mapState, setMapState] = useState({
		latitude: -34.605013,
		longitude: -58.381781,
		latitudeDelta: 0.0122,
		longitudeDelta:
			(Dimensions.get('window').width / Dimensions.get('window').height) *
			0.0122,
		centerUser: false,
	});

	// ----------------------------- FUNCTIONS --------------------------------

	function handleRegionChange(e) {
		setMapState({ ...mapState, ...e });
	}

	async function centerUser() {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Preuba rn permisos de localización',
					message: 'Prueba rn necesita acceso a tu localización',
					buttonNeutral: 'Preguntarme después',
					buttonNegative: 'Cancelar',
					buttonPositive: 'OK',
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				navigator.geolocation.getCurrentPosition(
					pos => {
						setMapState({
							...mapState,
							...pos.coords,
						});
						mapRef.current.animateToRegion({ ...mapState, ...pos.coords });
					},
					err => {
						console.warn(err);
						alert('No podemos establecer tu ubicación, elígela manualmente.');
					}
				);
			} else {
				alert('No podemos establecer tu ubicación, elígela manualmente.');
			}
		} catch (err) {
			console.warn(err);
			alert('No podemos establecer tu ubicación, elígela manualmente.');
		}
	}

	// ----------------------------- EFFECTS --------------------------------

	useEffect(() => {
		props.saveLocation({
			latitude: mapState.latitude,
			longitude: mapState.longitude,
			latitudeDelta: mapState.latitudeDelta,
			longitudeDelta: mapState.longitudeDelta,
		});
	}, [mapState]);

	// ----------------------------- RENDER --------------------------------
	return (
		<>
			<MapView
				initialRegion={mapState}
				provider={PROVIDER_GOOGLE}
				style={s.map}
				onRegionChange={handleRegionChange}
				loadingEnabled
				ref={mapRef}
			>
				<MapView.Marker coordinate={mapState} />
			</MapView>
			<View style={s.button}>
				<Button title="Localizame" onPress={centerUser} />
			</View>
		</>
	);
}

const s = StyleSheet.create({
	map: {
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

export default connect(
	null,
	sharePlaceActions
)(MapPicker);
