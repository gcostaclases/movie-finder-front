//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from "react-native";
import useUserReviews from "../hooks/useUserReviews";
import { useSelector } from "react-redux";
import UserReviewItem from "../components/user/UserReviewItem";
//#endregion ------------ IMPORTS ------------

const PantallaReseniasUsuario = ({ activeTab }) => {
	const { loading, error } = useUserReviews();

	const reviews = useSelector((state) => state.user.reviews);

	const handleEdit = (item) => {
		Alert.alert("Editar", `Editar reseña de "${item.movie.title}"`);
	};

	const handleDelete = (item) => {
		Alert.alert("Eliminar", `Eliminar reseña de "${item.movie.title}"`);
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
		<FlatList
			data={reviews}
			keyExtractor={(item) => item._id?.toString()}
			renderItem={({ item }) => (
				<UserReviewItem {...item} onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item)} />
			)}
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
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
});

