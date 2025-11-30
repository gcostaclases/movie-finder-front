//#region ----------- IMPORTS ------------
import { createStackNavigator } from "@react-navigation/stack";
import PantallaBuscar from "../screens/PantallaBuscar";
import { LinearGradient } from "expo-linear-gradient";
import PantallaResultadosBusqueda from "../screens/PantallaResultadosBusqueda";
import ButtonGoBack from "../components/general/ButtonGoBack";
import { useTranslation } from "react-i18next";
//#endregion ----------- IMPORTS ------------

const Stack = createStackNavigator();

const SearchStack = () => {
	const { t } = useTranslation();

	return (
		<Stack.Navigator
			initialRouteName="PantallaBuscar"
			screenOptions={{
				headerStyle: { height: 120 },
				headerTitleStyle: {
					color: "#FFFFFF",
					fontSize: 22,
					fontWeight: "600",
					marginLeft: 15,
				},
				headerTitleAlign: "left",
				headerBackground: () => (
					<LinearGradient colors={["#345780", "#1A2E46"]} start={[0.5, 0]} end={[0.5, 1]} style={{ flex: 1 }} />
				),
			}}>
			{/* Pantallas relacionadas a la búsqueda de películas */}
			<Stack.Screen
				name="PantallaBuscar"
				component={PantallaBuscar}
				options={({ route, navigation }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="PantallaResultadosBusqueda"
				component={PantallaResultadosBusqueda}
				options={({ route, navigation }) => ({
					// headerTitle: route.params?.movieTitle || "Detalle",
					// headerTitle: `${movieTitle || "Detalle"}`,
					headerTitle: t("navigation.search_stack.header_title"),
					headerLeft: () => <ButtonGoBack navigation={navigation} size={28} />,
				})}
			/>
		</Stack.Navigator>
	);
};

export default SearchStack;

