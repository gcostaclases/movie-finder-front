//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from "react-native";
import useUserReviews from "../hooks/useUserReviews";
import { useSelector } from "react-redux";
import UserReviewItem from "../components/user/UserReviewItem";
import useEditUserReview from "../hooks/useEditUserReview";
import useDeleteUserReview from "../hooks/useDeleteUserReview";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setReviewToEditId } from "../store/slices/userSlice";
import PantallaEditarReseniaPelicula from "./PantallaEditarReseniaPelicula";
import { useState } from "react";
//#endregion ------------ IMPORTS ------------

const PantallaReseniasUsuario = ({ activeTab }) => {
	const dispatch = useDispatch();

	// Custom hook para obtener las reseñas del usuario
	const { loading, error } = useUserReviews();

	// Custom hook para editar reseñas del usuario
	const { editReview, loading: loadingEdit, error: errorEdit, success: successEdit } = useEditUserReview();

	// Custom hook para eliminar reseñas del usuario
	const { deleteReview, loading: loadingDelete, error: errorDelete, success: successDelete } = useDeleteUserReview();

	// Estado para controlar la visibilidad del modal de edición
	const [modalEditVisible, setModalEditVisible] = useState(false);

	const reviews = useSelector((state) => state.user.reviews);

	const handleEdit = (item) => {
		dispatch(setReviewToEditId(item._id));
		setModalEditVisible(true);
	};

	const handleCloseEditModal = () => {
		setModalEditVisible(false);
	};

	const handleDelete = (item) => {
		Alert.alert("Eliminar", `¿Eliminar reseña de "${item.movie.title}"?`, [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Eliminar",
				style: "destructive",
				onPress: async () => {
					const ok = await deleteReview(item._id);
					if (ok) {
						Toast.show({ type: "success", text1: "Reseña eliminada" });
					}
				},
			},
		]);
	};

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
		<>
			<FlatList
				data={reviews}
				keyExtractor={(item) => item._id?.toString()}
				renderItem={({ item }) => (
					<UserReviewItem {...item} onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item)} />
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				contentContainerStyle={styles.container}
			/>

			<PantallaEditarReseniaPelicula visible={modalEditVisible} onClose={handleCloseEditModal} />
		</>
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
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
});

