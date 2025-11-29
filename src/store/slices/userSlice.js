import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	email: "",
	profileImage: null,
	providers: [],
	watchlist: [],
	reviews: [],
	isLogged: false,
	selectedProviders: [],
	movieReview: {
		rating: 0,
		comment: "",
	},
	reviewToEditId: "",
	movieAvailability: {
		selectedProvider: null,
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.isLogged = true;
			state.username = action.payload.username;
			state.profileImage = action.payload.profileImage;
		},
		logoutUser: (state) => {
			Object.assign(state, initialState); // Vuelvo todo al estado inicial
		},
		setProviders: (state, action) => {
			state.providers = action.payload;
		},
		setUserWatchlist: (state, action) => {
			state.watchlist = action.payload;
		},
		addMovieToWatchlist: (state, action) => {
			state.watchlist.unshift(action.payload); // La agrego al principio
		},
		removeMovieFromWatchlist: (state, action) => {
			state.watchlist = state.watchlist.filter(
				(movie) => movie._id !== action.payload // (action.payload es el _id de la película)
			);
		},
		addUserReview: (state, action) => {
			state.reviews.unshift(action.payload); // La agrego al principio
		},
		setUserReviews: (state, action) => {
			state.reviews = action.payload;
		},
		updateUserReview: (state, action) => {
			const idx = state.reviews.findIndex((r) => r._id === action.payload._id);
			if (idx !== -1) {
				state.reviews[idx] = action.payload;
			}
		},
		removeUserReview: (state, action) => {
			state.reviews = state.reviews.filter((r) => r._id !== action.payload);
		},
		setMovieRating: (state, action) => {
			state.movieReview.rating = action.payload;
		},
		resetMovieRating: (state) => {
			state.movieReview.rating = 0;
		},
		setMovieComment: (state, action) => {
			state.movieReview.comment = action.payload;
		},
		resetMovieComment: (state) => {
			state.movieReview.comment = "";
		},
		setReviewToEditId: (state, action) => {
			state.reviewToEditId = action.payload;
		},
		resetReviewToEditId: (state) => {
			state.reviewToEditId = "";
		},
		setSelectedProviders: (state, action) => {
			state.selectedProviders = action.payload;
		},
		resetSelectedProviders: (state) => {
			state.selectedProviders = [];
		},
		setSelectedProviderForMovie: (state, action) => {
			state.movieAvailability.selectedProvider = action.payload;
		},
		resetSelectedProviderForMovie: (state) => {
			state.movieAvailability.selectedProvider = null;
		},
		updateProfileInfo: (state, action) => {
			state.username = action.payload.username;
			state.email = action.payload.email;
			state.profileImage = action.payload.profileImage;
		},
		updateProfileImage: (state, action) => {
			state.profileImage = action.payload;
		},
	},
});

export const {
	loginUser,
	logoutUser,
	setProviders,
	setUserWatchlist,
	addMovieToWatchlist,
	removeMovieFromWatchlist,
	addUserReview,
	setUserReviews,
	updateUserReview,
	removeUserReview,
	setMovieRating,
	resetMovieRating,
	setMovieComment,
	resetMovieComment,
	setReviewToEditId,
	resetReviewToEditId,
	setSelectedProviders,
	resetSelectedProviders,
	setSelectedProviderForMovie,
	resetSelectedProviderForMovie,
	setPendingAction,
	updateProfileInfo,
	updateProfileImage,
} = userSlice.actions;

export default userSlice.reducer;

