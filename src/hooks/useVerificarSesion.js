import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser, setUserWatchlist, setProviders, setUserReviews } from "../store/slices/userSlice";
import { getUserWatchlist, getUserProviders, getUserReviews } from "../services/userService";
import { cargarDatosUsuario } from "../utils/cargarDatosUsuario";

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

	// 2. Cuando la sesión está verificada, cargo watchlist, proveedores y reseñas del usuario
	useEffect(() => {
		if (!isLoading) {
			cargarDatosUsuario(dispatch);
		}
	}, [isLoading, dispatch]);

	return isLoading;
}
