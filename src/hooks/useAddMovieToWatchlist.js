//#region ----------- IMPORTS ------------
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovieToWatchlist } from "../store/slices/userSlice";
import { addMovieToWatchlistService } from "../services/userService";
//#endregion ------------ IMPORTS ------------

export default function useAddMovieToWatchlist() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const addMovie = async (movieId) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const data = await addMovieToWatchlistService(movieId);
			dispatch(addMovieToWatchlist(data.movie));
			setSuccess(true);
			return data;
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: No se pudo agregar la película a la watchlist");
			}
		} finally {
			setLoading(false);
		}
	};

	return { addMovie, loading, error, success };
}

