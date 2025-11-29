import { StyleSheet, Text, View } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import SearchField from "../components/search/SearchField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "../forms/search.schema";
import useMovieSearch from "../hooks/useMovieSearch";
import { useState } from "react";

const PantallaBuscar = ({ route, navigation }) => {
	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(searchSchema),
		mode: "onChange",
		criteriaMode: "all",
		defaultValues: {
			title: null,
			actor: null,
			genre: null,
			language: null,
			year: null,
		},
	});

	const { results, total, loading, error, searchMovies } = useMovieSearch();

	const [searching, setSearching] = useState(false);

	const onSubmit = async (data) => {
		setSearching(true);
		const res = await searchMovies(data);
		setSearching(false);
		navigation.navigate("PantallaResultadosBusqueda", {
			results: res?.movies || [],
			total: res?.total || 0,
			filters: data,
		});
		reset();
	};

	return (
		<View style={styles.content}>
			<Text style={styles.title}>Buscar películas por...</Text>

			{/* Título */}
			<Controller
				control={control}
				name="title"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label="Título"
						placeholder="Ej: Chainsaw Man..."
						value={value}
						onChangeText={onChange}
						error={!!errors.title}
					/>
				)}
			/>
			{errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

			{/* Actor */}
			<Controller
				control={control}
				name="actor"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label="Actor"
						placeholder="Ej: Kikunosuke Toya..."
						value={value}
						onChangeText={onChange}
						error={!!errors.actor}
					/>
				)}
			/>
			{errors.actor && <Text style={styles.error}>{errors.actor.message}</Text>}

			{/* Género */}
			<Controller
				control={control}
				name="genre"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label="Género"
						placeholder="Ej: Animación..."
						value={value}
						onChangeText={onChange}
						error={!!errors.genre}
					/>
				)}
			/>
			{errors.genre && <Text style={styles.error}>{errors.genre.message}</Text>}

			{/* Idioma original */}
			<Controller
				control={control}
				name="language"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label="Idioma original"
						placeholder="Ej: en, es..."
						value={value}
						onChangeText={onChange}
						error={!!errors.language}
						autoCapitalize="none"
					/>
				)}
			/>
			{errors.language && <Text style={styles.error}>{errors.language.message}</Text>}

			{/* Año de lanzamiento */}
			<Controller
				control={control}
				name="year"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label="Año de lanzamiento"
						placeholder="Ej: 2025..."
						value={value}
						onChangeText={onChange}
						keyboardType="numeric"
						error={!!errors.year}
					/>
				)}
			/>
			{errors.year && <Text style={styles.error}>{errors.year.message}</Text>}

			{/* Error global del schema */}
			{errors[""] && <Text style={styles.error}>{errors[""].message}</Text>}

			{/* Botón */}
			<ButtonPrimary
				title={searching ? "Buscando..." : "Buscar"}
				style={styles.button}
				onPress={handleSubmit(onSubmit)}
				disabled={!isValid || searching}
			/>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default PantallaBuscar;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 18,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 18,
		color: "#222",
	},
	button: {
		marginTop: 24,
		width: "100%",
	},
	error: {
		color: "red",
		fontSize: 13,
		marginBottom: 4,
		marginLeft: 4,
	},
});

