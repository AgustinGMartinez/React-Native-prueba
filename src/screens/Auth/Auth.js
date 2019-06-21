import React, { useState } from 'react';
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
import { connect } from 'react-redux';
import { tryAuth } from '~/src/actions/authActions';

const loginHandler = (props, email, password) => {
	props.onLogin({ email, password });
	initTabBasedNavigation();
};

let currentPassword = {
	value: undefined,
	label: 'contraseña',
};

const registrationHandler = (props, email, password) => {
	props.onRegistration({ email, password });
	initTabBasedNavigation();
};

function auth(props) {
	const [mode, setMode] = useState('login');
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
		autoCorrect: false,
		autoCapitalize: 'none',
		keyboardType: 'email-address',
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
		autoCorrect: false,
		autoCapitalize: 'none',
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
		autoCorrect: false,
		autoCapitalize: 'none',
	});

	currentPassword.value = password.value;

	const handleChangeText = (text = null, state, update, covalidate = null) => {
		let keepPure = false;
		// for covalidation we use its current value, because there is no new one
		if (text === null) {
			text = state.value;
			keepPure = true; // keep untouched if that's the case
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

	const allValidLogin = email.isValid && password.isValid;
	const allValidRegistration =
		email.isValid && password.isValid && confirmPassword.isValid;

	return (
		<ImageBackground source={BackgroundImage} style={s.container}>
			<HeadingText>
				Por favor, {mode === 'login' ? 'ingresá' : 'registrate'}
			</HeadingText>
			<Button
				title={mode === 'login' ? 'Cambiar a Registrarse' : 'Cambiar a Login'}
				onPress={() =>
					setMode(prev => (prev === 'login' ? 'registration' : 'login'))
				}
			/>
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
				{mode === 'registration' && (
					<DefaultInput
						style={s.input}
						{...confirmPassword}
						onChangeText={text =>
							handleChangeText(text, confirmPassword, setConfirmPassword)
						}
					/>
				)}
			</View>
			{mode === 'login' ? (
				<Button
					title="Ingresar"
					onPress={() => loginHandler(props, email, password)}
					// disabled={!allValidLogin}
				/>
			) : (
				<Button
					title="Registrarse"
					onPress={() => registrationHandler(props, email, password)}
					disabled={!allValidRegistration}
				/>
			)}
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

const mapDispatchToProps = dispatch => {
	return {
		onLogin: authData => dispatch(tryAuth(authData)),
		onRegistration: authData => null,
	};
};

export default connect(
	null,
	mapDispatchToProps
)(auth);
