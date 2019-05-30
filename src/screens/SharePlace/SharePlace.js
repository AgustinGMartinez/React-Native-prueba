import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlaceInput from '~/src/components/PlaceInput/PlaceInput';
import { connect } from 'react-redux';
import * as actions from '../../actions/places';
import { Navigation } from 'react-native-navigation';

class SharePlace extends React.Component {
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
	render() {
		return (
			<View style={s.container}>
				<PlaceInput onPlaceAdded={this.props.addPlace} />
			</View>
		);
	}
}

const s = StyleSheet.create({
	container: {
		margin: 20
	}
});

export default connect(
	null,
	actions
)(SharePlace);
