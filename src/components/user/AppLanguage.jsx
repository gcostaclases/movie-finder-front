//#region ----------- IMPORTS ------------
import { View, Text, StyleSheet } from "react-native";
import ButtonPrimary from "../general/ButtonPrimary";
import { useTranslation } from "react-i18next";
import PantallaSeleccionIdioma from "../../screens/PantallaSeleccionIdioma";
import { useState } from "react";
//#endregion ------------ IMPORTS ------------

const AppLanguage = () => {
	const { t, i18n } = useTranslation();

	// Estados para controlar la visibilidad de la modal
	const [modalSeleccionarIdiomaVisible, setModalSeleccionarIdiomaVisible] = useState(false);

	const handleSelectLanguage = (lang) => {
		i18n.changeLanguage(lang);
		setModalSeleccionarIdiomaVisible(false);
	};

	return (
		<View style={styles.wrapper}>
			{/* <Text style={styles.idiomaTitulo}>{t("user.profile.language.title")}</Text> */}

			{/* Botón seleccionar idioma */}
			<ButtonPrimary
				title={t("user.profile.language.button")}
				onPress={() => setModalSeleccionarIdiomaVisible(true)}
				iconName="globe"
				style={styles.button}
			/>

			{/* Modal cambiar idioma */}
			<PantallaSeleccionIdioma
				visible={modalSeleccionarIdiomaVisible}
				onClose={() => setModalSeleccionarIdiomaVisible(false)}
				onSelectLanguage={handleSelectLanguage}
			/>
		</View>
	);
};

export default AppLanguage;

const styles = StyleSheet.create({
	wrapper: {
		// backgroundColor: "#41ca45ff",
		width: "100%",
		alignItems: "center",
		marginVertical: 10,
	},
	idiomaTitulo: {
		// backgroundColor: "#c14848ff",
		width: "85%",
		textAlign: "center",
		marginBottom: 8,
		fontWeight: "bold",
		fontSize: 15,
		color: "#222",
		textTransform: "uppercase",
	},
	button: {
		width: "85%",
		marginTop: 5,
	},
});

