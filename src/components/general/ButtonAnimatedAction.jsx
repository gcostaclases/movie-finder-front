import { Text, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";

const ButtonAnimatedAction = ({ label, color, offset, onPress, progress }) => {
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
			<RectButton
				style={{
					justifyContent: "center",
					alignItems: "center",
					width: 80,
					height: "100%",
					backgroundColor: color,
				}}
				onPress={onPress}>
				<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>{label}</Text>
			</RectButton>
		</Animated.View>
	);
};

export default ButtonAnimatedAction;
