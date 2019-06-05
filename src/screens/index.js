import React from 'react';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import rn from 'react-native';

const store = configureStore();

const withRedux = Component => props => {
	return (
		<Provider store={store}>
			<Component {...props} />
		</Provider>
	);
};

export function registerScreens() {
	Navigation.registerComponent('pruebarn.Auth', () =>
		withRedux(require('./Auth/Auth').default)
	);
	Navigation.registerComponent('pruebarn.SideDrawer', () =>
		withRedux(require('./SideDrawer/SideDrawer').default)
	);
	Navigation.registerComponent('pruebarn.FindPlace', () =>
		withRedux(require('./FindPlace/FindPlace').default)
	);
	Navigation.registerComponent('pruebarn.SharePlace', () =>
		withRedux(require('./SharePlace/SharePlace').default)
	);
	Navigation.registerComponent('pruebarn.PlaceDetail', () =>
		withRedux(require('./PlaceDetail/PlaceDetail').default)
	);
}

export function initTabBasedNavigation() {
	Navigation.setDefaultOptions({
		bottomTabs: {
			titleDisplayMode: 'alwaysHide',
			elevation: 16
		},
		topBar: {
			backButton: {
				color: 'blue'
			},
			leftButtonColor: 'blue'
		}
	});

	Promise.all([
		Icon.getImageSource(
			rn.Platform.OS === 'android' ? 'md-map' : 'ios-map',
			30
		),
		Icon.getImageSource(
			rn.Platform.OS === 'android' ? 'md-share-alt' : 'ios-share',
			30
		),
		Icon.getImageSource(
			rn.Platform.OS === 'android' ? 'md-menu' : 'ios-menu',
			30
		)
	]).then(([icon1, icon2, icon3]) => {
		Navigation.setRoot({
			root: {
				sideMenu: {
					left: {
						component: {
							name: 'pruebarn.SideDrawer',
							id: 'drawerMenu'
						}
					},
					center: {
						// tabs
						bottomTabs: {
							children: [
								// each child here, can be a stack, a new tab navigation, or a single component
								// the first child is the current selected
								{
									// stack navigation on this tab
									stack: {
										// stacks, the last one is the current page for this stack
										children: [
											{
												component: {
													name: 'pruebarn.FindPlace',
													options: {
														topBar: {
															title: {
																text:
																	'Explorar Lugar'
															},
															leftButtons: [
																{
																	id:
																		'sideMenuButton',
																	icon: icon3,
																	iconColor:
																		'blue'
																}
															]
														}
													}
												}
											}
										],
										// tab options such as text and icon
										options: {
											bottomTab: {
												text: 'Find Place',
												icon: icon1,
												selectedIconColor: 'blue'
											}
										}
									}
								},
								{
									stack: {
										// stacks, the last one is the current page for this stack
										children: [
											{
												component: {
													name: 'pruebarn.SharePlace',
													options: {
														topBar: {
															title: {
																text:
																	'Compartir Lugar'
															},
															leftButtons: [
																{
																	id:
																		'sideMenuButton',
																	icon: icon3
																}
															]
														}
													}
												}
											}
										],
										// tab options such as text and icon
										options: {
											bottomTab: {
												text: 'Share Place',
												icon: icon2,
												selectedIconColor: 'blue'
											}
										}
									}
								}
							]
						}
					}
				}
			}
		});
	});
}
