//#region ----------- IMPORTS ------------
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Separator from "../general/Separator";
import { useTranslation } from "react-i18next";
//#endregion ------------ IMPORTS ------------

const MovieDetailProviders = () => {
	const { t } = useTranslation();

	const availability = useSelector((state) => state.movie.availability);
	// console.log("Disponibilidad de proveedores:", availability);
	const userProviders = useSelector((state) => state.user.providers);
	const isLogged = useSelector((state) => state.user.isLogged);

	if (!availability || availability.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={styles.sectionTitle}>{t("movies.availability.providers.providers")}</Text>
				<Text style={styles.providerText}>{t("movies.availability.providers.no_providers")}</Text>
			</View>
		);
	}

	if (!isLogged) {
		// Usuario no logueado: solo muestro todos los proveedores
		return (
			<View style={styles.container}>
				<Text style={styles.sectionTitle}>{t("movies.availability.providers.providers")}</Text>
				<View style={styles.providersRow}>
					{availability.map((prov) => (
						<View key={prov.providerId} style={styles.providerBox}>
							<Image source={{ uri: prov.providerLogo }} style={styles.providerImg} />
							<Text style={styles.providerText}>{prov.percentage}%</Text>
						</View>
					))}
				</View>
			</View>
		);
	}

	// Usuario logueado: muestro "Tus proveedores" y "Otros proveedores"
	const userProviderIds = userProviders.map((prov) => prov._id);
	const tusProveedores = availability.filter((prov) => userProviderIds.includes(prov.providerId));
	const otrosProveedores = availability.filter((prov) => !userProviderIds.includes(prov.providerId));

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>{t("movies.availability.providers.your_providers")}</Text>
			<View style={styles.providersRow}>
				{tusProveedores.length === 0 ? (
					<Text style={styles.providerText}>{t("movies.availability.providers.your_providers_none")}</Text>
				) : (
					tusProveedores.map((prov) => (
						<View key={prov.providerId} style={styles.providerBox}>
							<Image source={{ uri: prov.providerLogo }} style={styles.providerImg} />
							<Text style={styles.providerText}>{prov.percentage}%</Text>
						</View>
					))
				)}
			</View>
			<Separator style={{ marginHorizontal: -15, marginTop: 20 }} />
			<Text style={[styles.sectionTitle, { marginTop: 20 }]}>{t("movies.availability.providers.other_providers")}</Text>
			<View style={styles.providersRow}>
				{otrosProveedores.length === 0 ? (
					<Text style={styles.providerText}>{t("movies.availability.providers.other_providers_none")}</Text>
				) : (
					otrosProveedores.map((prov) => (
						<View key={prov.providerId} style={styles.providerBox}>
							<Image source={{ uri: prov.providerLogo }} style={styles.providerImg} />
							<Text style={styles.providerText}>{prov.percentage}%</Text>
						</View>
					))
				)}
			</View>
		</View>
	);
};

export default MovieDetailProviders;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		// backgroundColor: "#e0acacff",
		// borderBottomColor: "#000000ff",
		// borderBottomWidth: 1,
	},
	sectionTitle: {
		fontWeight: "500",
		fontSize: 15,
		marginBottom: 15,
		textTransform: "uppercase",
	},
	providersRow: {
		// backgroundColor: "#2b2fa4ff",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 20,
		// paddingVertical: 20,
	},
	providerBox: {
		width: 50,
		height: 70,
		// backgroundColor: "#b3eceaff",
		// borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 6,
	},
	providerImg: {
		width: 50,
		height: 50,
		borderRadius: 5,
		resizeMode: "contain",
		marginBottom: 5,
	},
	providerText: {
		fontSize: 14,
		color: "#555",
		textAlign: "center",
	},
});

