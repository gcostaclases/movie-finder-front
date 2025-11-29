import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const MovieResultItem = ({ movie, onPress }) => {
	const { t } = useTranslation();

	const posterUrl = movie?.posterPath ? "https://image.tmdb.org/t/p/w500" + movie.posterPath : null;
	const year = movie?.releaseDate ? movie.releaseDate.slice(0, 4) : "?";
	const duration = movie?.duration ? `${movie.duration}min` : "?";
	const director = movie?.directors && movie.directors.length > 0 ? movie.directors[0].name : t("generic.unknown");

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
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
					</View>
					<View style={styles.metaRow}>
						<FontAwesome5 name="calendar" size={14} color="#555" />
						<Text style={styles.metaText}>{year}</Text>
						<FontAwesome5 name="clock" size={14} color="#555" style={{ marginLeft: 10 }} />
						<Text style={styles.metaText}>{duration}</Text>
					</View>
					<Text style={styles.director}>
						{t("user.reviews.movies.director").toUpperCase() + ": "}
						<Text style={{ fontWeight: "bold" }}>{director}</Text>
					</Text>
					<Text style={styles.overview} numberOfLines={3}>
						{movie?.overview}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default MovieResultItem;

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	poster: {
		width: 70,
		height: 105,
		borderRadius: 5,
		marginRight: 14,
		backgroundColor: "#ccc",
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
		color: "#222",
	},
	metaRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 2,
	},
	metaText: {
		fontSize: 13,
		color: "#555",
		marginLeft: 3,
		marginRight: 2,
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
});
