import React from 'react';
import { View, StyleSheet, Button, ScrollView, Image } from 'react-native';
import PlaceInput from '~/src/components/PlaceInput/PlaceInput';
import { connect } from 'react-redux';
import * as actions from '../../actions/places';
import { Navigation } from 'react-native-navigation';
import MainText from '~/src/components/UI/MainText/MainText';
import HeadingText from '~/src/components/UI/HeadingText/HeadingText';
import ImagePicker from '~/src/components/ImagePicker/ImagePicker';
import MapLocation from '~/src/components/MapLocation/MapLocation';

class SharePlace extends React.Component {
	state = {
		placeName: '',
	};

	componentDidMount() {
		this.navigationEventListener = Navigation.events().bindComponent(this);
	}

	componentWillUnmount() {
		// Not mandatory
		if (this.navigationEventListener) {
			this.navigationEventListener.remove();
		}
	}

	navigationButtonPressed({ buttonId }) {
		if (buttonId !== 'sideMenuButton') {
			return;
		}
		Navigation.mergeOptions('drawerMenu', {
			sideMenu: {
				left: {
					visible: true,
				},
			},
		});
	}

	addPlace = () => {
		const placeName = this.state.placeName;
		if (placeName.trim() !== '') this.props.addPlace(placeName.trim());
		else alert('Not empty name allowed');
	};

	render() {
		return (
			<ScrollView>
				<View style={s.container}>
					<MainText>
						<HeadingText>¡Compartí un lugar!</HeadingText>
					</MainText>
					<ImagePicker />
					<MapLocation />
					<PlaceInput
						subscribe={val => this.setState({ placeName: val })}
					/>
					<View style={s.button}>
						<Button
							title="¡Compartir lugar!"
							onPress={this.addPlace}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const s = StyleSheet.create({
	container: {
		margin: 20,
		flex: 1,
		alignItems: 'center',
	},
});

export default connect(
	null,
	actions
)(SharePlace);
