import React from 'react';
import { Text, StyleSheet } from 'react-native';

function HeadingText(props) {
	return (
		<Text {...props} style={s.mainText}>
			{props.children}
		</Text>
	);
}

const s = StyleSheet.create({
	mainText: {
		color: 'black',
	},
});

export default HeadingText;
