//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList } from "react-native";
import MovieResultItem from "../components/search/MovieResultItem";
import StitchTriste from "../assets/img/Stitch-Triste.png";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";
//#endregion ----------- IMPORTS ------------

function getCriterioBusqueda(filters, t) {
	const criterios = [];
	if (filters.title) criterios.push(`${t("search.title").toLowerCase()}: "${filters.title}"`);
	if (filters.actor) criterios.push(`${t("search.actor").toLowerCase()}: "${filters.actor}"`);
	if (filters.genre) criterios.push(`${t("search.genre").toLowerCase()}: "${filters.genre}"`);
	if (filters.language) criterios.push(`${t("search.original_language").toLowerCase()}: "${filters.language}"`);
	if (filters.year) criterios.push(`${t("search.release_year").toLowerCase()}: "${filters.year}"`);
	if (criterios.length === 0) return t("search.results.no_criteria");
	return criterios.join(", ");
}

const PantallaResultadosBusqueda = ({ route, navigation }) => {
	const { t } = useTranslation();

	const { results = [], total = 0, filters = {} } = route.params;

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>{t("search.results.title")}</Text>
				<Text style={styles.subTitle}>{t("search.results.many_results", { count: total })}</Text>
				<Text style={styles.criterio}>
					{t("search.results.criteria_prefix")} {getCriterioBusqueda(filters, t)}
				</Text>
			</View>
			<FlatList
				data={results}
				keyExtractor={(item) => item._id?.toString() || item.id?.toString()}
				renderItem={({ item }) => (
					<MovieResultItem
						movie={item}
						onPress={() =>
							navigation.navigate("MovieStack", {
								screen: "PantallaDetallePelicula",
								params: { movieId: item._id || item.id },
							})
						}
					/>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				contentContainerStyle={results.length === 0 ? { flex: 1, justifyContent: "center" } : styles.container}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Image source={StitchTriste} style={styles.emptyImage} resizeMode="contain" />
						<Text style={styles.emptyText}>{t("search.results.no_results")}</Text>
						<Text style={styles.emptySubText}>{t("search.results.try_generic")}</Text>
					</View>
				}
			/>
		</View>
	);
};

export default PantallaResultadosBusqueda;

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#fff",
		paddingVertical: 18,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#222",
		marginBottom: 6,
	},
	subTitle: {
		fontSize: 18,
		fontWeight: "500",
		color: "#222",
	},
	criterio: {
		fontSize: 16,
		color: "#222",
		marginTop: 6,
		// marginBottom: 2,
	},
	container: {
		marginTop: 0,
	},
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
	emptyContainer: {
		// backgroundColor: "#bc5c5cff",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyImage: {
		width: 180,
		height: 180,
		marginBottom: 20,
	},
	emptyText: {
		fontSize: 18,
		color: "#222",
		textAlign: "center",
		fontWeight: "500",
		marginBottom: 6,
	},
	emptySubText: {
		fontSize: 14,
		color: "#888",
		textAlign: "center",
		marginBottom: 30,
	},
});

