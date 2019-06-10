import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';

function defaultInput(props) {
	return (
		<>
			{props.touched && props.error && (
				<Text style={s.error}>{props.error}</Text>
			)}
			<TextInput {...props} style={[s.input, props.style]} />
		</>
	);
}

const s = StyleSheet.create({
	input: {
		width: '100%',
		borderColor: '#eee',
		borderWidth: 1,
		padding: 5,
		margin: 8,
	},
	error: {
		color: 'red',
		fontSize: 16,
		margin: 8,
		fontWeight: 'bold',
		backgroundColor: 'black',
		padding: 5,
	},
});

export default defaultInput;
