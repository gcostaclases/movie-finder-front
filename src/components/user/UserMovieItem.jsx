//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import ButtonSlideIn from "../general/ButtonSlideIn";
import { useTranslation } from "react-i18next";
//#endregion ------------ IMPORTS ------------

const UserMovieItem = ({ movie, onDelete }) => {
	const { t } = useTranslation();

	const posterUrl = movie?.posterPath ? "https://image.tmdb.org/t/p/w500" + movie.posterPath : null;
	const year = movie?.releaseDate ? movie.releaseDate.slice(0, 4) : "?";
	const duration = movie?.duration ? `${movie.duration}min` : "?";
	const director = movie?.directors && movie.directors.length > 0 ? movie.directors[0].name : t("generic.unknown");

	const renderRightActions = (progress) => (
		<View style={{ flexDirection: "row", height: "100%" }}>
			<ButtonSlideIn
				label={t("generic.remove")}
				color="#F7292D"
				offset={80}
				onPress={onDelete}
				progress={progress}
				iconName="trash"
			/>
		</View>
	);

	return (
		<Swipeable renderRightActions={renderRightActions}>
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
					<Text style={styles.overview}>{movie?.overview}</Text>
				</View>
			</View>
		</Swipeable>
	);
};

export default UserMovieItem;

const styles = StyleSheet.create({
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
		backgroundColor: "#ccc",
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
	overview: {
		// backgroundColor: "#6195f4ff",
		fontSize: 14,
		color: "#222",
		marginTop: 2,
	},
});

