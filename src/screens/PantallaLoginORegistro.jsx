import { StyleSheet, Text, View } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonSecondary from "../components/general/ButtonSecondary";
import { useTranslation } from "react-i18next";

const PantallaLoginORegistro = ({ navigation }) => {
	const { t } = useTranslation();

	// Navegar al Registro
	const irARegistro = () => {
		navigation.push("PantallaRegistro");
	};

	// Navegar al Login
	const irALogin = () => {
		navigation.push("PantallaLogin");
	};

	return (
		<View style={styles.container}>
			<MovieFinderLogoBlack />

			<View style={styles.buttonContainer}>
				{/* Botón primario sin ícono */}
				<ButtonPrimary title={t("auth.register_button")} onPress={irARegistro} />

				{/* Botón secundario sin ícono */}
				<ButtonSecondary title={t("auth.login_button")} color="#27AE60" onPress={irALogin} />
			</View>
		</View>
	);
};

export default PantallaLoginORegistro;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		gap: 50,
	},
	buttonContainer: {
		// backgroundColor: "#c91616ff",
		width: "85%",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},
});

// {/* Botón con ícono */}
// 	<ButtonPrimary
// 		title="Agregar reseña"
// 		iconName="pencil" // Ícono de Font Awesome
// 		onPress={() => alert("Ir a agregar reseña")}
// 	/>

