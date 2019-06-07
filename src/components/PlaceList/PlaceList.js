import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ListItem from '../ListItem/ListItem';
import { Navigation } from 'react-native-navigation';

function placeList(props) {
	return (
		<FlatList
			style={styles.listContainer}
			data={props.places}
			renderItem={info => (
				<ListItem
					placeName={info.item.name}
					placeImage={info.item.image}
					onItemPressed={() =>
						handlePlacePressed(info.item, props.componentId)
					}
					index={info.index}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		width: '100%',
	},
});

const handlePlacePressed = (item, componentId) => {
	Navigation.push(componentId, {
		component: {
			name: 'pruebarn.PlaceDetail',
			passProps: {
				selectedPlace: item,
			},
			options: {
				topBar: {
					title: {
						text: 'Detalles del lugar',
					},
				},
			},
		},
	});
};

export default placeList;
