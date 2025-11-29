//#region ----------- IMPORTS ------------
import { useState, useEffect } from "react";
import { getUserWatchlist } from "../services/userService";
import { useDispatch } from "react-redux";
import { setUserWatchlist } from "../store/slices/userSlice";
//#endregion ------------ IMPORTS ------------

export default function useUserWatchlist() {
	const dispatch = useDispatch();

	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchWatchlist = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getUserWatchlist();
				dispatch(setUserWatchlist(data.movies));
				setMovies(data.movies);
			} catch (e) {
				// Uso el error del backend sino uno genérico
				if (e.response?.data?.message) {
					setError(e.response.data.message);
				} else {
					setError("ERROR: No se pudo cargar tu watchlist");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchWatchlist();
	}, [dispatch]);

	return { movies, loading, error };
}

