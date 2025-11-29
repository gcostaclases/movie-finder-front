import { StyleSheet, Text, View, FlatList } from "react-native";
import MovieResultItem from "../components/search/MovieResultItem";
import StitchTriste from "../assets/img/Stitch-Triste.png";
import { Image } from "react-native";

function getCriterioBusqueda(filters) {
	const criterios = [];
	if (filters.title) criterios.push(`título: "${filters.title}"`);
	if (filters.actor) criterios.push(`actor: "${filters.actor}"`);
	if (filters.genre) criterios.push(`género: "${filters.genre}"`);
	if (filters.language) criterios.push(`idioma: "${filters.language}"`);
	if (filters.year) criterios.push(`año: "${filters.year}"`);
	if (criterios.length === 0) return "sin criterios";
	return criterios.join(", ");
}

const PantallaResultadosBusqueda = ({ route, navigation }) => {
	const { results = [], total = 0, filters = {} } = route.params;

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Resultados de búsqueda</Text>
				<Text style={styles.subTitle}>{total === 1 ? "1 resultado" : `${total} resultados`}</Text>
				<Text style={styles.criterio}>Buscaste por {getCriterioBusqueda(filters)}</Text>
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
						<Text style={styles.emptyText}>No se encontraron resultados</Text>
						<Text style={styles.emptySubText}>Prueba haciendo una búsqueda más genérica.</Text>
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
