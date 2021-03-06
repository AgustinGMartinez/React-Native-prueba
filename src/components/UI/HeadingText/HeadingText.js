import React from 'react';
import { Text, StyleSheet } from 'react-native';

function HeadingText(props) {
	return (
		<Text {...props} style={s.textHeading}>
			{props.children}
		</Text>
	);
}

const s = StyleSheet.create({
	textHeading: {
		fontWeight: 'bold',
		fontSize: 28,
	},
});

export default HeadingText;
