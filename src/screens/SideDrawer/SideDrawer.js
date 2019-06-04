import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Link from '~/src/components/UI/Link/Link';
import Icon from 'react-native-vector-icons/Ionicons';

const LogoutIcon = () => (
	<Icon name={'ios-log-out'} size={20} color={'black'} />
);

class SideDrawer extends React.Component {
	render() {
		return (
			<View style={[s.container]}>
				<Link Icon={LogoutIcon}>Cerrar sesión</Link>
			</View>
		);
	}
}

const s = StyleSheet.create({
	container: {
		paddingTop: 22,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: 'white',
		width: Dimensions.get('window').width * 0.9,
		flex: 1,
	},
});

export default SideDrawer;
