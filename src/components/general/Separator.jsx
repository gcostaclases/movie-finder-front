import { StyleSheet, Text, View } from "react-native";

const Separator = ({ style }) => {
	return <View style={[styles.separator, style]} />;
};

export default Separator;

const styles = StyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
		// marginVertical: 15
	},
});
