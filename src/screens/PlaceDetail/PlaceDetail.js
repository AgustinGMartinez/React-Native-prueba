import React from 'react';
import {
	View,
	Image,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
	Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from '~/src/actions/places';
import { Navigation } from 'react-native-navigation';

class PlaceDetail extends React.Component {
	onItemDeleted = () => {
		this.props.deletePlace(this.props.selectedPlace.key);
		Navigation.pop(this.props.componentId);
	};

	render() {
		return (
			<View style={styles.continaer}>
				<View>
					<Image
						source={this.props.selectedPlace.image}
						style={styles.placeImage}
					/>
					<Text style={styles.placeName}>
						{this.props.selectedPlace.name}
					</Text>
				</View>
				<View>
					<TouchableOpacity onPress={this.onItemDeleted}>
						<View style={styles.deleteButton}>
							<Icon
								size={30}
								name={
									Platform.OS === 'andriod'
										? 'md-trash'
										: 'ios-trash'
								}
								color="red"
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	continaer: {
		margin: 22
	},
	placeImage: {
		width: '100%',
		height: 200
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28
	},
	deleteButton: {
		alignItems: 'center'
	}
});

export default connect(
	null,
	actions
)(PlaceDetail);
