//#region ----------- IMPORTS ------------
import {
	StyleSheet,
	Text,
	View,
	Modal,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
} from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonCloseModal from "../components/general/ButtonCloseModal";
import MovieAddRating from "../components/movie/MovieAddRating";
import MovieAddReview from "../components/movie/MovieAddReview";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import {
	setMovieRating,
	setMovieComment,
	resetMovieRating,
	resetMovieComment,
	resetReviewToEditId,
} from "../store/slices/userSlice";
import useEditUserReview from "../hooks/useEditUserReview";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
//#endregion ----------- IMPORTS ------------

const PantallaEditarReseniaPelicula = ({ visible, onClose }) => {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const reviewId = useSelector((state) => state.user.reviewToEditId);
	const review = useSelector((state) => state.user.reviews.find((r) => r._id === reviewId));
	const rating = useSelector((state) => state.user.movieReview.rating);
	const comment = useSelector((state) => state.user.movieReview.comment);
	// console.log("Comment en PantallaEditarReseniaPelicula:", comment);

	// console.log("PantallaEditarReseniaPelicula visible:", visible);
	// console.log("reviewToEditId:", reviewId);
	// console.log("review:", review);
	// console.log("rating:", rating);
	// console.log("comment:", comment);

	// Para saber si hubo cambios
	const hasChanges =
		review &&
		((rating !== undefined && rating !== review.rating) || (comment !== undefined && comment !== review.comment));

	// Custom hook para editar review
	const { editReview, loading, error, success } = useEditUserReview();

	// Cuando se abre la modal, seteo los valores de la review a editar
	useEffect(() => {
		if (visible && review) {
			dispatch(setMovieRating(review.rating));
			dispatch(setMovieComment(review.comment));
		}
	}, [visible, review, dispatch]);

	// Al cerrar, reseteo
	const handleClose = () => {
		dispatch(resetMovieRating());
		dispatch(resetMovieComment());
		dispatch(resetReviewToEditId());
		onClose();
	};

	const handleEdit = async () => {
		await editReview(review._id, { rating, comment });
	};

	// Toast de error
	useEffect(() => {
		if (error) {
			Toast.show({
				type: "error",
				text1: t("movies.reviews.edit.editing_error"),
				text2: error,
			});
		}
	}, [error]);

	// Toast de éxito
	useEffect(() => {
		if (success) {
			Toast.show({
				type: "success",
				text1: t("movies.reviews.edit.editing_success"),
			});
			handleClose();
		}
	}, [success]);

	if (!review) return null;

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.modalWrapper}
				keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					{/* <ScrollView
						contentContainerStyle={styles.scrollContent}
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}> */}
					<View style={styles.modalContainer}>
						{/* Botón cerrar */}
						<ButtonCloseModal onPress={handleClose} />

						{/* Puntaje */}
						<MovieAddRating />

						{/* Reseña */}
						<MovieAddReview />

						{/* Botón Editar Reseña */}
						<ButtonPrimary
							title={t("generic.edit")}
							onPress={handleEdit}
							style={{
								width: "80%",
								marginTop: 10,
								opacity: hasChanges ? 1 : 0.5,
							}}
							disabled={!hasChanges || loading}
						/>
					</View>
					{/* </ScrollView> */}
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</Modal>
	);
};

export default PantallaEditarReseniaPelicula;

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalContainer: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		paddingTop: 20,
		paddingBottom: 50,
		alignItems: "center",
		zIndex: 1,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: -5 },
		minHeight: 420,
		maxHeight: "80%",
	},
});

