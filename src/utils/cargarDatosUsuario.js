import * as SecureStore from "expo-secure-store";
import { setUserWatchlist, setProviders, setUserReviews } from "../store/slices/userSlice";
import { getUserWatchlist, getUserProviders, getUserReviews } from "../services/userService";

export async function cargarDatosUsuario(dispatch) {
	const token = await SecureStore.getItemAsync("userToken");
	if (!token) return;

	try {
		// Watchlist
		const dataWatchlist = await getUserWatchlist();
		dispatch(setUserWatchlist(dataWatchlist.movies));
		// console.log("Watchlist cargada:", dataWatchlist);

		// Proveedores
		const dataProviders = await getUserProviders();
		dispatch(setProviders(dataProviders));
		// console.log("Proveedores cargados:", dataProviders);

		// Reseñas
		const dataReviews = await getUserReviews();
		dispatch(setUserReviews(dataReviews));
		// console.log("Reseñas cargadas:", dataReviews);
	} catch (e) {
		if (e.response?.status !== 401) {
			console.error("Error al cargar datos del usuario:", e);
		}
	}
}
