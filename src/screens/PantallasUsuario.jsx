//#region ----------- IMPORTS ------------
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import UserMenuTabs from "../components/user/UserMenuTabs";
import PantallaPerfilUsuario from "./PantallaPerfilUsuario";
import PantallaReseniasUsuario from "./PantallaReseniasUsuario";
import PantallaWatchlistUsuario from "./PantallaWatchlistUsuario";
//#endregion ------------ IMPORTS ------------

const PantallasUsuario = () => {
	const [activeScreen, setActiveScreen] = useState("profile");

	return (
		<View style={styles.container}>
			<UserMenuTabs active={activeScreen} onChange={setActiveScreen} />
			{activeScreen === "profile" ? (
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<PantallaPerfilUsuario activeTab={activeScreen} />
				</ScrollView>
			) : activeScreen === "reviews" ? (
				<PantallaReseniasUsuario activeTab={activeScreen} />
			) : (
				<PantallaWatchlistUsuario activeTab={activeScreen} />
			)}
		</View>
	);
};

export default PantallasUsuario;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		marginTop: 20,
	},
	scroll: {
		// flex: 1,
		// width: "100%",
	},
	scrollContent: {
		// minWidth: "100%",
		// paddingBottom: 40,
	},
});

