import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const FadeInView = ({ children }) => {
	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value = withTiming(1, { duration: 1000 });
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default FadeInView;
