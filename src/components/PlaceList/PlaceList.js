import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';
import { Navigation } from 'react-native-navigation';

const placeList = props => {
	const handlePlacePressed = item => {
		Navigation.push(props.componentId, {
			component: {
				name: 'pruebarn.PlaceDetail',
				passProps: {
					selectedPlace: item
				},
				options: {
					topBar: {
						title: {
							text: 'Place Details'
						}
					}
				}
			}
		});
	};

	return (
		<FlatList
			style={styles.listContainer}
			data={props.places}
			renderItem={info => (
				<ListItem
					placeName={info.item.name}
					placeImage={info.item.image}
					onItemPressed={() => handlePlacePressed(info.item)}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		width: '100%'
	}
});

export default placeList;
