import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import { Navigation } from 'react-native-navigation';

class FindPlace extends React.Component {
	state = {
		isLoaded: false
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
					visible: true
				}
			}
		});
	}

	onPlacesSearchHandle = () => {
		this.setState({ isLoaded: true });
	};

	render() {
		const { componentId, places } = this.props;
		const { isLoaded } = this.state;

		let content;

		if (!isLoaded) {
			content = (
				<TouchableOpacity onPress={this.onPlacesSearchHandle}>
					<View style={s.searchButton}>
						<Text style={s.searchText}>Encontrar Lugares</Text>
					</View>
				</TouchableOpacity>
			);
		} else
			content = <PlaceList places={places} componentId={componentId} />;

		return (
			<View style={isLoaded ? null : s.buttonContainer}>{content}</View>
		);
	}
}

const s = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchButton: {
		borderColor: 'orange',
		borderWidth: 3,
		borderRadius: 50,
		padding: 20
	},
	searchText: {
		fontSize: 26,
		color: 'orange',
		textAlign: 'center'
	}
});

const mapStateToProps = state => ({
	places: state.places.places
});

export default connect(mapStateToProps)(FindPlace);
