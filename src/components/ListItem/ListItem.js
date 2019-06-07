import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Animated,
} from 'react-native';

function listItem(props) {
	const [listAppearingAnimation] = React.useState(new Animated.Value(0));

	React.useEffect(() => {
		Animated.timing(listAppearingAnimation, {
			duration: 300,
			toValue: 1,
			useNativeDriver: true,
			delay: props.index * 200,
		}).start();
	}, []);

	return (
		<Animated.View
			style={{
				opacity: listAppearingAnimation,
				transform: [
					{
						translateY: listAppearingAnimation.interpolate({
							inputRange: [0, 1],
							outputRange: [20, 0],
						}),
					},
				],
			}}
		>
			<TouchableOpacity onPress={props.onItemPressed}>
				<View style={styles.listItem}>
					<Image
						resizeMode="cover"
						source={props.placeImage}
						style={styles.placeImage}
					/>
					<Text>{props.placeName}</Text>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	listItem: {
		width: '100%',
		marginBottom: 5,
		padding: 10,
		backgroundColor: '#eee',
		flexDirection: 'row',
		alignItems: 'center',
	},
	placeImage: {
		marginRight: 8,
		height: 30,
		width: 30,
	},
});

export default listItem;
