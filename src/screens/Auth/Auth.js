import React, { useState, useRef } from 'react';
import {
	View,
	Button,
	StyleSheet,
	Dimensions,
	ImageBackground,
} from 'react-native';
import { initTabBasedNavigation } from '../index';
import DefaultInput from '~/src/components/UI/DefaultInput/DefaultInput';
import HeadingText from '~/src/components/UI/HeadingText/HeadingText';
import BackgroundImage from '~/src/assets/background.jpg';

const loginHandler = () => initTabBasedNavigation();
let currentPassword = {
	value: undefined,
	label: 'contraseña',
};

function auth() {
	const [email, setEmail] = useState({
		value: '',
		isValid: false,
		touched: false,
		placeholder: 'Email',
		type: 'text',
		error: null,
		rules: {
			isEmail: true,
		},
	});
	const [password, setPassword] = useState({
		value: '',
		isValid: false,
		touched: false,
		placeholder: 'Contraseña',
		type: 'password',
		error: null,
		rules: {
			minLength: 6,
		},
		secureTextEntry: true,
	});
	const [confirmPassword, setConfirmPassword] = useState({
		value: '',
		isValid: false,
		touched: false,
		placeholder: 'Confirmar contraseña',
		type: 'password',
		error: null,
		rules: {
			equals: currentPassword,
		},
		secureTextEntry: true,
	});

	currentPassword.value = password.value;

	const handleChangeText = (text = null, state, update, covalidate = null) => {
		let keepPure = false;
		// for covalidation we use its current value, not a new one
		if (text === null) {
			text = state.value;
			keepPure = true;
		}
		if (covalidate) {
			setTimeout(() => handleChangeText(null, covalidate[0], covalidate[1]));
		}

		const commonUpdates = {
			...state,
			value: text,
			touched: state.touched || !keepPure, // true si ya estaba tocado o si lo estamos tocando sin covalidar
			rules: { ...state.rules },
		};
		if (state.rules.isEmail) {
			const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
			if (!regex.test(text)) {
				return update({
					...commonUpdates,
					error: 'Email inválido',
					isValid: false,
				});
			}
		}
		if (state.rules.minLength) {
			if (text.length < state.rules.minLength) {
				return update({
					...commonUpdates,
					error: 'Demasiado corto',
					isValid: false,
				});
			}
		}
		if ('equals' in state.rules) {
			let isValid = state.rules.equals.value === text;
			if (!isValid)
				return update({
					...commonUpdates,
					error: 'Debe coincidir con ' + state.rules.equals.label,
					isValid: false,
				});
		}
		return update({ ...commonUpdates, isValid: true, error: null });
	};

	const allValid = email.isValid && password.isValid && confirmPassword.isValid;

	return (
		<ImageBackground source={BackgroundImage} style={s.container}>
			<HeadingText>Por favor, ingresar</HeadingText>
			<Button title="Registrarse" />
			<View style={s.inputContainer}>
				<DefaultInput
					style={s.input}
					{...email}
					onChangeText={text => handleChangeText(text, email, setEmail)}
				/>
				<DefaultInput
					style={s.input}
					{...password}
					onChangeText={text =>
						handleChangeText(text, password, setPassword, [
							confirmPassword,
							setConfirmPassword,
						])
					}
				/>
				<DefaultInput
					style={s.input}
					{...confirmPassword}
					onChangeText={text =>
						handleChangeText(text, confirmPassword, setConfirmPassword)
					}
				/>
			</View>
			<Button title="Ingresar" onPress={loginHandler} disabled={!allValid} />
		</ImageBackground>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	inputContainer: {
		width: '80%',
	},
	input: {
		borderColor: '#ddd',
		backgroundColor: '#eee',
	},
});

export default auth;
