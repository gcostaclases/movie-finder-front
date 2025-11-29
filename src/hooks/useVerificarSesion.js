import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser, setUserWatchlist, setProviders } from "../store/slices/userSlice";
import { getUserWatchlist, getUserProviders } from "../services/userService";

/*
  Cuando el usuario se loguea, guardo el token en el SecureStore y hago el dispatch en la pantalla de login.
	
  Cuando el usuario cierra y vuelve a abrir la app, el estado de Redux se reinicia, así que leo el token desde el SecureStore para restaurar el estado global.
*/

export default function useVerificarSesion() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	// 1. Verifico sesión y logueo/deslogueo al usuario
	useEffect(() => {
		const verificarSesion = async () => {
			try {
				const token = await SecureStore.getItemAsync("userToken");
				const userProfileString = await SecureStore.getItemAsync("userProfile");
				const userProfile = JSON.parse(userProfileString);

				if (token && userProfile) {
					dispatch(
						loginUser({
							username: userProfile.username,
							email: userProfile.email,
							profileImage: userProfile.profileImage,
						})
					);
				} else {
					dispatch(logoutUser());
				}
			} catch (error) {
				dispatch(logoutUser());
			} finally {
				setIsLoading(false);
			}
		};
		verificarSesion();
	}, [dispatch]);

	// 2. Cuando la sesión está verificada, cargo watchlist y proveedores del usuario
	useEffect(() => {
		const cargarDatosUsuario = async () => {
			const token = await SecureStore.getItemAsync("userToken");
			if (!token) return; // Si no hay token, no hago nada

			try {
				// Watchlist
				const dataWatchlist = await getUserWatchlist();
				dispatch(setUserWatchlist(dataWatchlist.movies));

				// Proveedores
				const dataProviders = await getUserProviders();
				dispatch(setProviders(dataProviders));
			} catch (e) {
				// Si da 401, el interceptor ya desloguea y limpia el store
				if (e.response?.status !== 401) {
					console.error("Error al cargar datos del usuario:", e);
				}
			}
		};
		if (!isLoading) {
			cargarDatosUsuario();
		}
	}, [isLoading, dispatch]);

	return isLoading;
}
