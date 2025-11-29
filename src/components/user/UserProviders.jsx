//#region ----------- IMPORTS ------------
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useState } from "react";
import useUserProviders from "../../hooks/useUserProviders";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ButtonPrimary from "../general/ButtonPrimary";
import PantallaAgregarProveedorUsuario from "../../screens/PantallaAgregarProveedoresUsuario";
//#endregion ------------ IMPORTS ------------

const UserProviders = () => {
	const { loading, error } = useUserProviders();

	const { t } = useTranslation();

	const providers = useSelector((state) => state.user.providers);

	// Estados para controlar la visibilidad de la modal
	const [modalEditarProveedoresVisible, setModalEditarProveedoresVisible] = useState(false);

	if (loading) {
		return (
			<View style={{ alignItems: "center", marginVertical: 20 }}>
				<ActivityIndicator size="large" color="#27AAE1" />
				<Text style={{ marginTop: 10 }}>{t("user.profile.providers.loading")}</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ alignItems: "center", marginVertical: 20 }}>
				<Text style={{ color: "red" }}>{error}</Text>
			</View>
		);
	}

	return (
		<View style={styles.wrapper}>
			<Text style={styles.proveedoresTitulo}>{t("user.profile.providers.title")}:</Text>
			<View style={styles.proveedoresGrid}>
				{providers && providers.length > 0 ? (
					providers.map((prov) =>
						prov.logo ? (
							<Image key={prov._id} source={{ uri: prov.logo }} style={styles.proveedorImg} />
						) : (
							<View key={prov._id} style={styles.proveedorImg} />
						)
					)
				) : (
					<Text style={{ color: "#888", fontSize: 15 }}>{t("user.profile.providers.empty")}</Text>
				)}
			</View>

			{/* Botón editar proveedores */}
			<ButtonPrimary
				title={t("user.profile.providers.button")}
				onPress={() => setModalEditarProveedoresVisible(true)}
				iconName="edit"
				style={styles.button}
			/>

			{/* Modal agregar proveedor */}
			<PantallaAgregarProveedorUsuario
				visible={modalEditarProveedoresVisible}
				onClose={() => setModalEditarProveedoresVisible(false)}
			/>
		</View>
	);
};

export default UserProviders;

const styles = StyleSheet.create({
	wrapper: {
		// backgroundColor: "#41ca45ff",
		width: "100%",
		alignItems: "center",
		marginVertical: 10,
	},
	proveedoresTitulo: {
		// backgroundColor: "#c14848ff",
		width: "85%",
		textAlign: "center",
		marginBottom: 8,
		fontWeight: "bold",
		fontSize: 15,
		color: "#222",
		textTransform: "uppercase",
	},
	proveedoresGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 15,
		marginBottom: 20,
		// backgroundColor: "#c44949ff",
		width: "85%",
	},
	proveedorImg: {
		width: 50,
		height: 50,
		borderRadius: 5,
		resizeMode: "contain",
		backgroundColor: "#ccc",
		margin: 6,
	},
	button: {
		width: "85%",
		marginTop: 5,
	},
});

