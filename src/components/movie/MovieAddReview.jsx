//#region ----------- IMPORTS ------------
import { StyleSheet, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setMovieComment } from "../../store/slices/userSlice";
import { useTranslation } from "react-i18next";
//#endregion ----------- IMPORTS ------------

const MovieAddReview = () => {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const comment = useSelector((state) => state.user.movieReview.comment);
	// console.log("MovieAddReview comment:", comment);

	const handleReview = (text) => {
		//Para que no me manden espacios vacíos al inicio
		const trimmed = text.trimStart();
		dispatch(setMovieComment(trimmed));
		// console.log("Review:", trimmed);
	};

	return (
		<>
			{/* Título reseña */}
			<Text style={styles.titulo}>{t("movies.reviews.add.review_title")}</Text>

			{/* Campo de texto */}
			<TextInput
				style={styles.textInput}
				multiline
				placeholder={t("movies.reviews.add.review_placeholder")}
				value={comment}
				onChangeText={handleReview}
				maxLength={400}
			/>
		</>
	);
};

export default MovieAddReview;

const styles = StyleSheet.create({
	titulo: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 18,
		marginTop: 10,
	},
	textInput: {
		width: 320,
		height: 170,
		backgroundColor: "#D9E7EF",
		borderRadius: 10,
		padding: 12,
		fontSize: 15,
		color: "#222",
		textAlignVertical: "top",
		marginBottom: 18,
	},
});

