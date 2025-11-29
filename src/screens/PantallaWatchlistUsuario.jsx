//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, Alert } from "react-native";
import useUserWatchlist from "../hooks/useUserWatchlist";
import useRemoveMovieFromWatchlist from "../hooks/useRemoveMovieFromWatchlist";
import UserMovieItem from "../components/user/UserMovieItem";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import StitchTriste from "../assets/img/Stitch-Triste.png";
import Toast from "react-native-toast-message";
//#endregion ------------ IMPORTS ------------

const PantallaWatchlistUsuario = ({ activeTab }) => {
	// Custom hook para obtener watchlist
	const { movies, loading, error } = useUserWatchlist();

	// Custom hook para remover película de watchlist
	const { removeMovie, loading: loadingRemove, error: errorRemove } = useRemoveMovieFromWatchlist();

	const watchlist = useSelector((state) => state.user.watchlist);

	const { t } = useTranslation();

	const handleDelete = (item) => {
		Alert.alert(t("generic.remove"), t("user.watchlist.delete_confirm", { title: item.title }), [
			{
				text: t("generic.cancel"),
				style: "cancel",
			},
			{
				text: t("generic.remove"),
				style: "destructive",
				onPress: async () => {
					const ok = await removeMovie(item._id);
					if (ok) {
						Toast.show({
							type: "success",
							text1: t("user.watchlist.deleting_success"),
						});
					} else if (errorRemove) {
						Toast.show({
							type: "error",
							text1: errorRemove,
						});
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

	if (watchlist.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Image source={StitchTriste} style={styles.emptyImage} resizeMode="contain" />
				<Text style={styles.emptyText}>{t("user.watchlist.no_movies")}</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={watchlist}
			keyExtractor={(item) => item._id?.toString()}
			renderItem={({ item }) => <UserMovieItem movie={item} onDelete={() => handleDelete(item)} />}
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
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
	emptyContainer: {
		// backgroundColor: "#c45f5fff",
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
		fontSize: 20,
		color: "#222",
		textAlign: "center",
		fontWeight: "500",
		marginBottom: 40, // Para subir un poco todo por el menu de arriba que da la sensación que no está centrado
	},
});

