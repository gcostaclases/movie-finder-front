//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList } from "react-native";
//#endregion ------------ IMPORTS ------------

const watchlist = [
	{
		id: 1,
		titulo: "Chainsaw Man – The Movie: Reze Arc",
		año: 2025,
		duracion: "100min",
		director: "Tatsuya Yoshihara",
		overview:
			"In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.",
	},
	{
		id: 2,
		titulo: "Superman",
		año: 2025,
		duracion: "100min",
		director: "James Gunn",
		overview:
			"Superman faces a new threat to Earth while struggling with his own identity and the expectations of being a hero.",
	},
	{
		id: 3,
		titulo: "Twilight",
		año: 2025,
		duracion: "100min",
		director: "Catherine Hardwicke",
		overview: "A teenage girl risks everything when she falls in love with a vampire.",
	},
	{
		id: 4,
		titulo: "Chainsaw Man – The Movie: Reze Arc",
		año: 2025,
		duracion: "100min",
		director: "Tatsuya Yoshihara",
		overview:
			"In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.",
	},
	{
		id: 5,
		titulo: "Superman",
		año: 2025,
		duracion: "100min",
		director: "James Gunn",
		overview:
			"Superman faces a new threat to Earth while struggling with his own identity and the expectations of being a hero.",
	},
];

const WatchlistItem = ({ titulo, año, duracion, director, overview }) => (
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

const PantallaWatchlistUsuario = () => {
	return (
		<FlatList
			data={watchlist}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => <WatchlistItem {...item} />}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			contentContainerStyle={styles.container}
		/>
	);
};

export default PantallaWatchlistUsuario;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "#d45d5dff",
		marginTop: 15,
		// marginVertical: 10,
		// paddingVertical: 10,
		// paddingTop: 10,
		// paddingBottom: 30,
	},
	row: {
		// backgroundColor: "#86d562ff",
		flexDirection: "row",
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	posterPlaceholder: {
		width: 70,
		height: 105, // 70 * 1.5 = 105 para relación 2:3
		borderRadius: 6,
		backgroundColor: "#ccc",
		marginRight: 14,
	},
	infoContainer: {
		// backgroundColor: "#62c4d5ff",
		flex: 1,
		justifyContent: "flex-start",
	},
	headerRow: {
		// backgroundColor: "#f4a261ff",
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
		// backgroundColor: "#e76f51ff",
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
		// backgroundColor: "#a99a8dff",
		fontSize: 13,
		color: "#222",
		marginBottom: 2,
	},
	overview: {
		// backgroundColor: "#6195f4ff",
		fontSize: 14,
		color: "#222",
		marginTop: 2,
	},
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
});

