//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from "react-native";
import { Rating } from "react-native-ratings";
import { FontAwesome5 } from "@expo/vector-icons";
import useUserReviews from "../hooks/useUserReviews";
import { useSelector } from "react-redux";
//#endregion ------------ IMPORTS ------------

const ReseñaItem = ({ movie, rating, comment }) => {
	const posterUrl = movie?.posterPath ? "https://image.tmdb.org/t/p/w500" + movie.posterPath : null;
	const year = movie?.releaseDate ? movie.releaseDate.slice(0, 4) : "?";
	const duration = movie?.duration ? `${movie.duration}min` : "?";
	const director = movie?.directors && movie.directors.length > 0 ? movie.directors[0].name : "Desconocido";

	return (
		<View style={styles.row}>
			{posterUrl ? (
				<Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
			) : (
				<View style={styles.poster} />
			)}
			<View style={styles.infoContainer}>
				<View style={styles.headerRow}>
					<Text style={styles.title} numberOfLines={1}>
						{movie?.title}
					</Text>
					<Rating
						type="custom"
						ratingCount={5}
						imageSize={20}
						readonly
						startingValue={rating}
						tintColor="#f3f3f3ff"
						ratingBackgroundColor="#ccc"
						style={styles.rating}
					/>
				</View>
				<View style={styles.metaRow}>
					<FontAwesome5 name="calendar" size={14} color="#555" />
					<Text style={styles.metaText}>{year}</Text>
					<FontAwesome5 name="clock" size={14} color="#555" style={{ marginLeft: 10 }} />
					<Text style={styles.metaText}>{duration}</Text>
				</View>
				<Text style={styles.director}>
					DIRECTOR: <Text style={{ fontWeight: "bold" }}>{director}</Text>
				</Text>
				<Text style={styles.review}>{comment}</Text>
			</View>
		</View>
	);
};

const PantallaReseniasUsuario = () => {
	const { loading, error } = useUserReviews();

	const reviews = useSelector((state) => state.user.reviews);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#27AAE1" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ color: "red" }}>{error}</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={reviews}
			keyExtractor={(item) => item._id?.toString()}
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
	poster: {
		width: 70,
		height: 105, // 70 * 1.5 = 105 para relación 2:3
		borderRadius: 5,
		marginRight: 14,
		backgroundColor: "#ccc", // Para el placeholder
	},
	infoContainer: {
		// backgroundColor: "#62c4d5ff",
		flex: 1,
		justifyContent: "flex-start",
		// gap: 4,
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
		// marginRight: 8,
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
		// gap: 2,
	},
	metaText: {
		// backgroundColor: "#2a9d8fff",
		fontSize: 13,
		color: "#555",
		marginLeft: 3,
		marginRight: 2,
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

