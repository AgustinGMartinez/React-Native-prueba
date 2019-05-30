import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function defaultInput(props) {
	return (
		<TextInput {...props} style={[s.textHeading, props.style || {}]}>
			{props.children}
		</TextInput>
	);
}

const s = StyleSheet.create({
	textHeading: {
		fontWeight: 'bold',
		fontSize: 28
	}
});

export default defaultInput;
