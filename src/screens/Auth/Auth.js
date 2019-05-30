import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { initTabBasedNavigation } from '../index';

const loginHandler = () => initTabBasedNavigation();

const auth = () => {
	return (
		<View>
			<Text>Auth Screen</Text>
			<Button title="Ingresar" onPress={loginHandler} />
		</View>
	);
};

export default auth;
