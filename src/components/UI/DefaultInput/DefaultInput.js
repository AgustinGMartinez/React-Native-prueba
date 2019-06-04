import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function defaultInput(props) {
	return <TextInput {...props} style={[s.input, props.style]} />;
}

const s = StyleSheet.create({
	input: {
		width: '100%',
		borderColor: '#eee',
		borderWidth: 1,
		padding: 5,
		margin: 8,
	},
});

export default defaultInput;
