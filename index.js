/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens();

// Inicializamos este tipo de navegacion
Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							name: 'pruebarn.Auth',
							options: {
								topBar: {
									title: {
										text: 'Ingresar'
									}
								}
							}
						}
					}
				]
			}
		}
	});
});
