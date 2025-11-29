//#region ----------- IMPORTS ------------
import { StyleSheet, Text, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
//#endregion ------------ IMPORTS ------------

const ButtonSlideIn = ({ label, color, offset, onPress, progress, iconName }) => {
	const trans = progress.interpolate({
		inputRange: [0, 1],
		outputRange: [offset, 0],
	});

	const animatedStyle = {
		transform: [{ translateX: trans }],
		opacity: progress,
	};

	return (
		<Animated.View style={animatedStyle}>
			<RectButton style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
				{iconName && <FontAwesome5 name={iconName} size={18} color="#fff" style={styles.icon} solid />}
				<Text style={styles.buttonText}>{label}</Text>
			</RectButton>
		</Animated.View>
	);
};

export default ButtonSlideIn;

const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		alignItems: "center",
		width: 80,
		height: "100%",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	icon: {
		// marginRight: 6,
		marginBottom: 8,
	},
});

