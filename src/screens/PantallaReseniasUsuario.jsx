//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Rating } from "react-native-ratings";
//#endregion ------------ IMPORTS ------------

const reseñas = [
	{
		id: 1,
		titulo: "Chainsaw Man – The Movie",
		año: 2025,
		duracion: "100min",
		director: "Tatsuya Yoshihara",
		estrellas: 3,
		resena: "¡Está bastante bien!",
	},
	{
		id: 2,
		titulo: "Superman",
		año: 2025,
		duracion: "100min",
		director: "Tatsuya Yoshihara",
		estrellas: 5,
		resena:
			"Lorem ipsum dolor sit amet consectetur. Egestas nunc ut eros massa est massa. Volutpat sollicitudin hendrerit pulvinar non vestibulum sed eget habitant. Ipsum eros commodo amet diam. Volutpat volutpat eget pellentesque.",
	},
	{
		id: 3,
		titulo: "Twilight",
		año: 2025,
		duracion: "100min",
		director: "Tatsuya Yoshihara",
		estrellas: 1,
		resena:
			"Lorem ipsum dolor sit amet consectetur. Egestas nunc ut eros massa est massa. Volutpat sollicitudin hendrerit pulvinar non vestibulum sed eget habitant. Ipsum eros commodo amet diam. Volutpat volutpat eget pellentesque.",
	},
	{
		id: 4,
		titulo: "Chainsaw Man – The Movie",
		año: 2025,
		duracion: "100min",
		director: "Tatsuya Yoshihara",
		estrellas: 3,
		resena: "¡Está bastante bien!",
	},
	{
		id: 5,
		titulo: "Superman",
		año: 2025,
		duracion: "100min",
		director: "Tatsuya Yoshihara",
		estrellas: 5,
		resena:
			"Lorem ipsum dolor sit amet consectetur. Egestas nunc ut eros massa est massa. Volutpat sollicitudin hendrerit pulvinar non vestibulum sed eget habitant. Ipsum eros commodo amet diam. Volutpat volutpat eget pellentesque.",
	},
];

const ReseñaItem = ({ titulo, año, duracion, director, estrellas, resena }) => (
	<View style={styles.row}>
		<View style={styles.posterPlaceholder} />
		<View style={styles.infoContainer}>
			<View style={styles.headerRow}>
				<Text style={styles.title} numberOfLines={1}>
					{titulo}
				</Text>
				<Rating
					type="custom"
					ratingCount={5}
					imageSize={20}
					readonly
					startingValue={estrellas}
					tintColor="#f3f3f3ff"
					ratingBackgroundColor="#ccc"
					style={styles.rating}
				/>
			</View>
			<View style={styles.metaRow}>
				<Text style={styles.metaText}>{año}</Text>
				<Text style={styles.metaText}>·</Text>
				<Text style={styles.metaText}>{duracion}</Text>
			</View>
			<Text style={styles.director}>
				DIRECTOR: <Text style={{ fontWeight: "bold" }}>{director}</Text>
			</Text>
			<Text style={styles.review}>{resena}</Text>
		</View>
	</View>
);

const PantallaReseniasUsuario = () => {
	return (
		<FlatList
			data={reseñas}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => <ReseñaItem {...item} />}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			contentContainerStyle={styles.container}
		/>
	);
};

export default PantallaReseniasUsuario;

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
	rating: {
		alignSelf: "flex-end",
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
	review: {
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

