import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

function Link({ children, style, Icon, action }) {
	return (
		<TouchableOpacity onPress={action}>
			<View style={s.container}>
				{Icon && (
					<>
						<Icon style={s.common} />
						<View style={s.space} />
					</>
				)}
				<Text style={[s.text, s.common]}>{children}</Text>
			</View>
		</TouchableOpacity>
	);
}

const s = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		flex: 1,
	},
	space: {
		width: 20,
	},
	common: {
		fontSize: 20,
	},
});

export default Link;
