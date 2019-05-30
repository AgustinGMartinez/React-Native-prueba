import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

class SideDrawer extends React.Component {
	render() {
		return (
			<View style={[s.container]}>
				<Text>SideDrawer screen</Text>
			</View>
		);
	}
}

const s = StyleSheet.create({
	container: {
		paddingTop: 22,
		backgroundColor: 'white',
		width: Dimensions.get('window').width * 0.9,
		flex: 1
	}
});

export default SideDrawer;
