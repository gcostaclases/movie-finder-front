//#region ----------- IMPORTS ------------
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonSecondary from "../components/general/ButtonSecondary";
import ButtonCard from "../components/general/ButtonCard";
import PantallaReportarDisponibilidadPelicula from "./PantallaReportarDisponibilidadPelicula";
import PantallaAgregarReseniaPelicula from "./PantallaAgregarReseniaPelicula";
import useMovieDetail from "../hooks/useMovieDetail";
import MovieDetailInfo from "../components/movie/MovieDetailInfo";
import MovieDetailProviders from "../components/movie/MovieDetailProviders";
import MovieDetailRating from "../components/movie/MovieDetailRating";
import { useEffect, useState } from "react";
import StitchDesconfiado from "../assets/img/Stitch-Desconfiado.png";
import PantallaDebeEstarLogueado from "./PantallaDebeEstarLogueado";
import { useDispatch, useSelector } from "react-redux";
import useAddMovieToWatchlist from "../hooks/useAddMovieToWatchlist";
import useRemoveMovieFromWatchlist from "../hooks/useRemoveMovieFromWatchlist";
import Toast from "react-native-toast-message";
import Separator from "../components/general/Separator";
//#endregion ------------ IMPORTS ------------

const PantallaDetallePelicula = ({ navigation, route }) => {
	const movieId = route.params?.movieId;

	const dispatch = useDispatch();

	// Custom hook para obtener los detalles de la película
	const { movie, loading, error } = useMovieDetail(movieId);

	// Custom hook para agregar película a la watchlist
	const { addMovie, loading: loadingAdd, error: errorAdd, success } = useAddMovieToWatchlist();

	// Custom hook para quitar película de la watchlist
	const {
		removeMovie,
		loading: loadingRemove,
		error: errorRemove,
		success: successRemove,
	} = useRemoveMovieFromWatchlist();

	const isLogged = useSelector((state) => state.user.isLogged);
	const watchlist = useSelector((state) => state.user.watchlist);
	// console.log("Watchlist:", watchlist);
	const isInWatchlist = watchlist.some((item) => item._id === movie?.id);
	// console.log("isInWatchlist:", isInWatchlist);

	// Estados para controlar la visibilidad de las modales
	const [modalReportarDisponibilidadVisible, setModalReportarDisponibilidadVisible] = useState(false);
	const [modalAgregarReseniaVisible, setModalAgregarReseniaVisible] = useState(false);
	const [modalDebeEstarLogueadoVisible, setModalDebeEstarLogueadoVisible] = useState(false);
	// Estado para el mensaje de la modal de que se debe estar logueado
	const [mensajeDebeEstarLogueado, setMensajeDebeEstarLogueado] = useState("");

	// Navegar a las Reseñas de la película
	const irAResenias = () => {
		navigation.push("PantallaReseniasPelicula");
	};

	// Navegar a los Actores de la película
	const irAActores = () => {
		navigation.push("PantallaActoresPelicula");
	};

	const handleAbrirModalReportar = () => {
		if (!isLogged) {
			setMensajeDebeEstarLogueado("Debes estar logueado para reportar la disponibilidad.");
			setModalDebeEstarLogueadoVisible(true);
			return;
		}
		setModalReportarDisponibilidadVisible(true);
	};

	const handleAbrirModalResenia = () => {
		if (!isLogged) {
			setMensajeDebeEstarLogueado("Debes estar logueado para agregar una reseña.");
			setModalDebeEstarLogueadoVisible(true);
			return;
		}
		setModalAgregarReseniaVisible(true);
	};

	const handleAgregarWatchlist = async () => {
		if (!isLogged) {
			setMensajeDebeEstarLogueado("Debes estar logueado para agregar a la watchlist.");
			setModalDebeEstarLogueadoVisible(true);
			return;
		}
		if (!movie?.id) return;

		const res = await addMovie(movie.id);

		if (res && res.message) {
			Toast.show({
				type: "success",
				text1: "Agregado a la watchlist",
			});
		} else if (errorAdd) {
			Toast.show({
				type: "error",
				text1: errorAdd,
			});
		}
	};

	const handleQuitarWatchlist = async () => {
		try {
			const ok = await removeMovie(movie.id);
			if (ok) {
				Toast.show({
					type: "success",
					text1: "Quitado de la watchlist",
				});
			} else if (errorRemove) {
				Toast.show({
					type: "error",
					text1: errorRemove,
				});
			}
		} catch (e) {
			Toast.show({
				type: "error",
				text1: "No se pudo quitar de la watchlist",
			});
		}
	};

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#27AAE1" />
				<Text>Cargando...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
				<Image source={StitchDesconfiado} style={{ width: 180, height: 180, marginBottom: 24 }} resizeMode="contain" />
				<Text style={{ color: "#222", fontSize: 20, textAlign: "center", fontWeight: "500" }}>
					Hubo un error al cargar los datos de la película
				</Text>
			</View>
		);
	}

	return (
		<>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* Info principal de la película */}
				<MovieDetailInfo />

				{/* Contenedor */}
				<View style={styles.container}>
					{/* Botones principales */}
					<View style={styles.buttonsContainer}>
						{/* Botón reportar disponibilidad */}
						<ButtonPrimary title="Reportar disponibilidad" iconName="desktop" onPress={handleAbrirModalReportar} />
						{/* Botón agregar reseña */}
						<ButtonPrimary title="Agregar reseña" iconName="pen" onPress={handleAbrirModalResenia} />
						{/* Botón agregar a watchlist o quitar de la watchlist */}
						{isInWatchlist ? (
							<ButtonSecondary
								title="Quitar de la watchlist"
								iconName="eye-slash"
								color="#F7292D"
								onPress={handleQuitarWatchlist}
								disabled={loadingRemove}
							/>
						) : (
							<ButtonSecondary
								title={loadingAdd ? "Agregando..." : "Agregar a la watchlist"}
								iconName="eye"
								color="#1A7F37"
								onPress={handleAgregarWatchlist}
								disabled={loadingAdd}
							/>
						)}
					</View>
				</View>
				<Separator />

				{/* Puntaje */}
				<MovieDetailRating />
				<Separator />

				{/* Proveedores */}
				<MovieDetailProviders />
				<Separator />

				{/* Actores y Reseñas */}
				<View style={[styles.container, { borderBottomWidth: 0 }]}>
					<View style={styles.cardButtonContainer}>
						<ButtonCard iconName="users" text="Actores" onPress={irAActores} />
						<ButtonCard iconName="newspaper" text="Reseñas" onPress={irAResenias} />
					</View>
				</View>
			</ScrollView>

			{/* Modal Reportar Disponibilidad */}
			<PantallaReportarDisponibilidadPelicula
				visible={modalReportarDisponibilidadVisible}
				onClose={() => setModalReportarDisponibilidadVisible(false)}
			/>
			{/* Modal Agregar Reseña */}
			<PantallaAgregarReseniaPelicula
				visible={modalAgregarReseniaVisible}
				onClose={() => setModalAgregarReseniaVisible(false)}
			/>
			{/* Modal Debe estar logueado */}
			<PantallaDebeEstarLogueado
				visible={modalDebeEstarLogueadoVisible}
				onClose={() => setModalDebeEstarLogueadoVisible(false)}
				titulo={mensajeDebeEstarLogueado}
				onLogin={() => {
					setModalDebeEstarLogueadoVisible(false);
					navigation.navigate("AuthOrUserStack", {
						screen: "PantallaLogin",
						params: {
							returnStack: "MovieStack",
							returnScreen: "PantallaDetallePelicula",
							returnParams: { movieId },
						},
					});
				}}
				onRegister={() => {
					setModalDebeEstarLogueadoVisible(false);
					navigation.navigate("AuthOrUserStack", {
						screen: "PantallaRegistro",
					});
				}}
			/>
		</>
	);
};

export default PantallaDetallePelicula;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		// backgroundColor: "#e0acacff",
		// borderBottomColor: "#000000ff",
		// borderBottomWidth: 1,
	},
	scrollContent: {
		// padding: 16,
	},
	buttonsContainer: {
		gap: 15,
		// alignItems: "center",
		marginBottom: 15,
	},
	cardButtonContainer: {
		// backgroundColor: "#b0dab2ff",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 20,
	},
});

