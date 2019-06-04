import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function Link({ children, onPress, style, Icon }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={s.container}>
				{Icon && (
					<>
						<Icon />
						<View style={s.space} />
					</>
				)}
				<Text style={[s.text, style]}>{children}</Text>
			</View>
		</TouchableOpacity>
	);
}

const s = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	text: {
		color: 'blue',
		flex: 1,
	},
	space: {
		width: 10,
	},
});

export default Link;
