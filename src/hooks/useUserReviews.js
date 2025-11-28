//#region ----------- IMPORTS ------------
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserReviews } from "../services/userService";
import { setUserReviews } from "../store/slices/userSlice";
//#endregion ------------ IMPORTS ------------

export default function useUserReviews() {
	const dispatch = useDispatch();

	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchReviews = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getUserReviews();
				dispatch(setUserReviews(data));
				setReviews(data);
			} catch (e) {
				// Uso el error del backend sino uno genérico
				if (e.response?.data?.message) {
					setError(e.response.data.message);
				} else {
					setError("ERROR: No se pudieron cargar tus reseñas");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchReviews();
	}, [dispatch]);

	return { reviews, loading, error };
}

