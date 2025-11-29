//#region ----------- IMPORTS ------------
import { StyleSheet, ScrollView } from "react-native";
import ButtonSecondary from "../components/general/ButtonSecondary";
import { useDispatch } from "react-redux";
import { cerrarSesion } from "../utils/cerrarSesion";
import UserInfo from "../components/user/UserInfo";
import UserProviders from "../components/user/UserProviders";
import { useTranslation } from "react-i18next";
import AppLanguage from "../components/user/AppLanguage";
//#endregion ------------ IMPORTS ------------

const PantallaPerfilUsuario = ({ activeTab }) => {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const handleCerrarSesion = () => {
		cerrarSesion(dispatch);
	};

	return (
		<>
			<ScrollView contentContainerStyle={styles.container}>
				{/* Info de usuario */}
				<UserInfo />

				{/* Proveedores del usuario */}
				<UserProviders />

				{/* Sección seleccionar idioma */}
				<AppLanguage />

				{/* Botón cerrar sesión */}
				<ButtonSecondary
					title={t("user.profile.logout")}
					onPress={handleCerrarSesion}
					iconName="power-off"
					color="#F7292D"
					style={{ width: "85%", marginVertical: 10 }}
				/>
			</ScrollView>
		</>
	);
};

export default PantallaPerfilUsuario;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "#19ae2aff",
		flex: 1,
		alignItems: "center",
		paddingTop: 20,
		// paddingBottom: 40,
	},
});

