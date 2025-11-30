//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { Rating } from "react-native-ratings";
import useMovieReviews from "../hooks/useMovieReviews";
import StitchExpectante from "../assets/img/Stitch-Expectante.png";
import StitchDesconfiado from "../assets/img/Stitch-Desconfiado.png";
import ButtonPrimary from "../components/general/ButtonPrimary";
import { useState, useEffect } from "react";
import PantallaAgregarReseniaPelicula from "./PantallaAgregarReseniaPelicula";
import PantallaEditarReseniaPelicula from "./PantallaEditarReseniaPelicula";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import useDeleteUserReview from "../hooks/useDeleteUserReview";
import {
	setReviewToEditId,
	setMovieRating,
	setMovieComment,
	resetMovieRating,
	resetMovieComment,
} from "../store/slices/userSlice";
import { useTranslation } from "react-i18next";
//#endregion ----------- IMPORTS ------------

const ReseñaItem = ({ user, rating, comment }) => (
	<View style={styles.itemContainer}>
		<View style={styles.userAndRating}>
			<Image
				source={user?.profileImage ? { uri: user.profileImage } : require("../assets/img/User-Placeholder.png")}
				style={styles.avatar}
			/>
			<Text style={styles.userName}>{user?.username}</Text>
			<View style={styles.stars}>
				<Rating
					type="custom"
					ratingCount={5}
					imageSize={25}
					readonly
					startingValue={rating}
					fractions={1}
					tintColor="#f3f3f3ff"
					ratingBackgroundColor="#ccc"
				/>
			</View>
		</View>
		<Text style={styles.review}>{comment}</Text>
	</View>
);

const PantallaReseniasPelicula = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	// Obtengo el ID de la película desde el store
	const movieId = useSelector((state) => state.movie.id);

	// Obtengo el título de la película desde el store
	const movieTitle = useSelector((state) => state.movie.title);

	// Custom hook que obtiene las reseñas de la película
	const { reviews, loading, error } = useMovieReviews(movieId);

	// Custom hook para eliminar la reseña del usuario
	const { deleteReview, loading: loadingDelete } = useDeleteUserReview();

	const userReviews = useSelector((state) => state.user.reviews);
	// console.log("userReviews:", userReviews);
	const myReview = userReviews.find((r) => r.movie._id === movieId);
	// console.log("myReview:", myReview);

	const [modalAgregarReseniaVisible, setModalAgregarReseniaVisible] = useState(false);
	const [modalEditarReseniaVisible, setModalEditarReseniaVisible] = useState(false);

	const handleAgregarResenia = () => {
		dispatch(resetMovieRating());
		dispatch(resetMovieComment());
		setModalAgregarReseniaVisible(true);
	};

	// console.log("Revisiones de la película:", reviews);
	// console.log("Mi reseña de la película:", myReview);

	const handleEditarResenia = () => {
		dispatch(setMovieRating(myReview.rating));
		dispatch(setMovieComment(myReview.comment));
		dispatch(setReviewToEditId(myReview._id));
		setModalEditarReseniaVisible(true);
	};

	const handleEliminarResenia = () => {
		Alert.alert(t("generic.delete"), t("user.reviews.delete_confirm", { title: movieTitle }), [
			{ text: t("generic.cancel"), style: "cancel" },
			{
				text: t("generic.delete"),
				style: "destructive",
				onPress: async () => {
					const ok = await deleteReview(myReview._id);
					if (ok) {
						Toast.show({ type: "success", text1: t("user.reviews.deleting_success") });
					}
				},
			},
		]);
	};

	useEffect(() => {
		if (error) {
			Toast.show({
				type: "error",
				text1: t("user.reviews.loading_reviews_error"),
				text2: error,
			});
		}
	}, [error]);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#27AAE1" />
				<Text>{t("user.reviews.loading_reviews")}</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
				<Image source={StitchDesconfiado} style={{ width: 180, height: 180, marginBottom: 24 }} resizeMode="contain" />
				<Text style={{ color: "#222", fontSize: 20, textAlign: "center", fontWeight: "500" }}>
					{t("movies.reviews.no_reviews_found")}
				</Text>
			</View>
		);
	}

	return (
		<>
			<FlatList
				data={reviews}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => <ReseñaItem {...item} />}
				contentContainerStyle={reviews.length === 0 ? { flex: 1, justifyContent: "center" } : null}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Image source={StitchExpectante} style={styles.emptyImage} resizeMode="contain" />
						<Text style={styles.emptyText}>{t("movies.reviews.no_reviews_found")}</Text>
						<Text style={styles.emptySubText}>{t("movies.reviews.add.add_review_question")}</Text>
						<ButtonPrimary
							title={t("movies.reviews.add.add_review_button")}
							iconName="edit"
							onPress={handleAgregarResenia}
							style={{ width: "85%", marginTop: 8 }}
						/>
					</View>
				}
			/>
			{/* FABs para agregar, editar y eliminar reseña */}
			{myReview ? (
				<View style={styles.fabColumn}>
					<TouchableOpacity
						style={[styles.fabAction, { backgroundColor: "#27AAE1", marginBottom: 12 }]}
						activeOpacity={0.7}
						onPress={handleEditarResenia}>
						<FontAwesome5 name="pen" size={22} color="#fff" solid />
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.fabAction, { backgroundColor: "#F7292D" }]}
						activeOpacity={0.7}
						onPress={handleEliminarResenia}
						disabled={loadingDelete}>
						<FontAwesome5 name="trash" size={22} color="#fff" solid />
					</TouchableOpacity>
				</View>
			) : (
				reviews.length > 0 && (
					<TouchableOpacity
						style={[styles.fab, { backgroundColor: "#27AE60" }]}
						activeOpacity={0.7}
						onPress={handleAgregarResenia}>
						<FontAwesome5 name="plus" size={24} color="#fff" solid />
					</TouchableOpacity>
				)
			)}

			<PantallaAgregarReseniaPelicula
				visible={modalAgregarReseniaVisible}
				onClose={() => setModalAgregarReseniaVisible(false)}
			/>
			<PantallaEditarReseniaPelicula
				visible={modalEditarReseniaVisible}
				onClose={() => setModalEditarReseniaVisible(false)}
			/>
		</>
	);
};

export default PantallaReseniasPelicula;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	itemContainer: {
		// backgroundColor: "#d23131ff",
		paddingVertical: 14,
		paddingHorizontal: 16,
	},
	userAndRating: {
		// backgroundColor: "#299e38ff",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 8,
	},
	userName: {
		// backgroundColor: "#f2f142ff",
		color: "#27AAE1",
		fontWeight: "bold",
		fontSize: 16,
		marginRight: 8,
	},
	stars: {
		flexDirection: "row",
		marginLeft: "auto",
	},
	review: {
		fontSize: 14,
		color: "#222",
		lineHeight: 18,
	},
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
	emptyContainer: {
		// backgroundColor: "#38bc45ff",
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
		marginBottom: 4,
	},
	emptySubText: {
		fontSize: 14,
		color: "#888",
		textAlign: "center",
		marginBottom: 16,
	},
	// fab: {
	// 	position: "absolute",
	// 	// right: 24,
	// 	// bottom: 32,
	// 	width: 56,
	// 	height: 56,
	// 	borderRadius: 28,
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	elevation: 5, // sombra Android
	// 	shadowColor: "#000", // sombra iOS
	// 	shadowOffset: { width: 0, height: 2 },
	// 	shadowOpacity: 0.3,
	// 	shadowRadius: 4,
	// 	zIndex: 10,
	// },
	// fabColumn: {
	// 	position: "absolute",
	// 	right: 24,
	// 	bottom: 32,
	// 	alignItems: "center",
	// 	justifyContent: "flex-end",
	// 	// height: 56 * 2 + 12, // opcional, para asegurar el espacio
	// 	zIndex: 10,
	// },
	fab: {
		position: "absolute",
		right: 24,
		bottom: 32,
		width: 56,
		height: 56,
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		zIndex: 10,
	},
	fabColumn: {
		position: "absolute",
		right: 24,
		bottom: 32,
		alignItems: "center",
		zIndex: 10,
	},
	fabAction: {
		width: 56,
		height: 56,
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		marginBottom: 0,
	},
});

