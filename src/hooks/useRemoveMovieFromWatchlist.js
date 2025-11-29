//#region ----------- IMPORTS ------------
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeMovieFromWatchlist } from "../store/slices/userSlice";
import { removeMovieFromWatchlistService } from "../services/userService";
//#endregion ------------ IMPORTS ------------

export default function useRemoveMovieFromWatchlist() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const removeMovie = async (movieId) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			await removeMovieFromWatchlistService(movieId);
			dispatch(removeMovieFromWatchlist(movieId));
			setSuccess(true);
			return true;
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: No se pudo quitar la película de la watchlist");
			}
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { removeMovie, loading, error, success };
}

