/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
import { registerScreens, initAuthNavigation } from './src/screens';

registerScreens();

// Inicializamos este tipo de navegacion
Navigation.events().registerAppLaunchedListener(() => {
	initAuthNavigation();
});
