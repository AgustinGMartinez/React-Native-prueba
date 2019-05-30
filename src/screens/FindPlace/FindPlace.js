import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import { Navigation } from 'react-native-navigation';

class FindPlace extends React.Component {
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
		const { componentId, places } = this.props;
		return (
			<View>
				<PlaceList places={places} componentId={componentId} />
			</View>
		);
	}
}

const mapStateToProps = state => ({
	places: state.places.places
});

export default connect(mapStateToProps)(FindPlace);
