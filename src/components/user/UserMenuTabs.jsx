//#region ----------- IMPORTS ------------
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
//#endregion ------------ IMPORTS ------------

const SECCIONES = [
	{ key: "profile", label: "user.tab_menu.profile" },
	{ key: "reviews", label: "user.tab_menu.reviews" },
	{ key: "watchlist", label: "user.tab_menu.watchlist" },
];

const UserMenuTabs = ({ active, onChange }) => {
	const { t } = useTranslation();

	return (
		<View style={styles.tabsContainer}>
			{SECCIONES.map((section) => (
				<TouchableOpacity
					key={section.key}
					style={[styles.tab, active === section.key && styles.tabActive]}
					onPress={() => onChange(section.key)}
					activeOpacity={0.8}>
					<Text style={[styles.tabText, active === section.key && styles.tabTextActive]}>{t(section.label)}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default UserMenuTabs;

const styles = StyleSheet.create({
	tabsContainer: {
		flexDirection: "row",
		alignSelf: "center",
		// marginBottom: 20,
		borderRadius: 5,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#27AAE1",
		// marginVertical: 15,
		// backgroundColor: "#66cbb4ff",
	},
	tab: {
		paddingVertical: 8,
		paddingHorizontal: 18,
		width: 115,
		alignItems: "center",
		justifyContent: "center",
	},
	tabActive: {
		backgroundColor: "#27AAE1",
	},
	tabText: {
		color: "#27AAE1",
		fontWeight: "500",
		fontSize: 15,
	},
	tabTextActive: {
		color: "#fff",
	},
});

