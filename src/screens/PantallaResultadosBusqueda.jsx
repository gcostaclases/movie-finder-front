import { StyleSheet, Text, View, FlatList } from "react-native";

// Simulación de resultados de búsqueda
const resultados = [
	{
		id: 1,
		titulo: "Chainsaw Man – The Movie: Reze Arc",
		año: 2025,
		duracion: "100min",
		director: "Tatsuya Yoshihara",
		overview:
			"In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.",
	},
	// ...otros resultados
];

const ResultadoItem = ({ titulo, año, duracion, director, overview }) => (
	<View style={styles.row}>
		<View style={styles.posterPlaceholder} />
		<View style={styles.infoContainer}>
			<View style={styles.headerRow}>
				<Text style={styles.title} numberOfLines={1}>
					{titulo}
				</Text>
			</View>
			<View style={styles.metaRow}>
				<Text style={styles.metaText}>{año}</Text>
				<Text style={styles.metaText}>·</Text>
				<Text style={styles.metaText}>{duracion}</Text>
			</View>
			<Text style={styles.director}>
				DIRECTOR: <Text style={{ fontWeight: "bold" }}>{director}</Text>
			</Text>
			<Text style={styles.overview}>{overview}</Text>
		</View>
	</View>
);

const PantallaResultadosBusqueda = ({ route }) => {
	const criterio = route?.params?.criterio || "título y actor...";

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Resultados de búsqueda</Text>
				<Text style={styles.subTitle}>Buscaste por {criterio}</Text>
			</View>
			<FlatList
				data={resultados}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <ResultadoItem {...item} />}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				contentContainerStyle={styles.container}
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
	container: {
		marginTop: 0,
	},
	row: {
		flexDirection: "row",
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	posterPlaceholder: {
		width: 70,
		height: 105, // Relación 2:3
		borderRadius: 6,
		backgroundColor: "#ccc",
		marginRight: 14,
	},
	infoContainer: {
		flex: 1,
		justifyContent: "flex-start",
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 2,
	},
	title: {
		fontWeight: "bold",
		fontSize: 16,
		flex: 1,
		marginRight: 8,
		color: "#222",
	},
	metaRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 2,
		gap: 2,
	},
	metaText: {
		fontSize: 13,
		color: "#555",
		marginRight: 6,
	},
	director: {
		fontSize: 13,
		color: "#222",
		marginBottom: 2,
	},
	overview: {
		fontSize: 14,
		color: "#222",
		marginTop: 2,
	},
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
});

