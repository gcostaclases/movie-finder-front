//#region ----------- IMPORTS ------------
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MovieFinderLogoWhite from "../assets/logo/MovieFinderLogoWhite";
import AuthStack from "./AuthStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MovieStack from "./MovieStack";
import UserStack from "./UserStack";
import { useSelector } from "react-redux";
import SearchStack from "./SearchStack";
import { useTranslation } from "react-i18next";
//#endregion ----------- IMPORTS ------------

const Tab = createBottomTabNavigator();

const Menu = () => {
	const insets = useSafeAreaInsets();
	// const tabBarHeight = 70 + insets.bottom;
	const tabBarHeight = Platform.OS === "ios" ? 95 : 85;

	const { t } = useTranslation();

	const isLogged = useSelector((state) => state.user.isLogged);

	const tabBarStyleWithSafeArea = {
		backgroundColor: "#CCDEE5",
		height: tabBarHeight + (Platform.OS === "android" ? insets.bottom : 0),
		paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
	};

	return (
		<Tab.Navigator
			initialRouteName="MovieStack"
			screenOptions={({ route }) => ({
				// Icono para cada tab del menu
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "AuthOrUserStack") {
						iconName = "user";
					} else if (route.name === "MovieStack") {
						iconName = "film";
					} else if (route.name === "SearchStack") {
						iconName = "search";
					}
					return <FontAwesome5 name={iconName} size={40} color={color} solid />;
				},
				tabBarStyle: {
					backgroundColor: "#CCDEE5",

					// Respeta safe area en Android
					height: tabBarHeight + (Platform.OS === "android" ? insets.bottom : 0),
					paddingBottom: Platform.OS === "android" ? insets.bottom : 0,

					/*
					// Respeta safe area en Android y iOS
					height: tabBarHeight + insets.bottom,
					paddingBottom: insets.bottom,
					*/
				},
				tabBarItemStyle: {
					// backgroundColor: "#2a96c1ff",

					// Respeta safe area en Android
					height: tabBarHeight + (Platform.OS === "android" ? insets.bottom : 0),
					paddingBottom: Platform.OS === "android" ? insets.bottom : 0,

					/*
					// Respeta safe area en Android y iOS
					height: tabBarHeight + insets.bottom,
					paddingBottom: insets.bottom,
					*/
				},
				tabBarIconStyle: {
					// flex: 1,
					width: "100%",
					height: "70%",
					alignItems: "center",
					justifyContent: "center",
					// backgroundColor: "#79b780ff",
				},
				tabBarLabelStyle: {
					width: "100%",
					// backgroundColor: "#bf81bbff",
					fontSize: 13,
					fontWeight: "500",
					// paddingBottom: 20,
				},
				tabBarLabelPosition: "below-icon",
				tabBarActiveTintColor: "#FFFFFF",
				tabBarInactiveTintColor: "#656565",
				tabBarActiveBackgroundColor: "#345780",
				// headerShown: false,
				headerStyle: { height: 140 },
				headerBackground: () => (
					<LinearGradient colors={["#345780", "#1A2E46"]} start={[0.5, 0]} end={[0.5, 1]} style={{ flex: 1 }} />
				),
				headerTitle: () => <MovieFinderLogoWhite />,
				headerTitleAlign: "center",
				headerTitleContainerStyle: {
					paddingBottom: Platform.OS === "ios" ? 15 : 0,
				},
				animation: "fade",
			})}>
			<Tab.Screen
				name="AuthOrUserStack"
				component={isLogged ? UserStack : AuthStack}
				options={({ route }) => {
					// Con esto detecto la pantalla activa y si es Login o Registro oculto el tab bar
					const routeName = getFocusedRouteNameFromRoute(route);
					const hideTabBar = routeName === "PantallaLogin" || routeName === "PantallaRegistro";
					// Si está logueado muestro el header, sino no
					return {
						tabBarLabel: t("tab_menu.user"),
						headerShown: isLogged,
						tabBarStyle: hideTabBar ? { display: "none" } : tabBarStyleWithSafeArea,
					};
				}}
			/>
			<Tab.Screen
				name="MovieStack"
				component={MovieStack}
				options={({ route }) => {
					// Con esto detecto la pantalla activa y si es el Detalle las Reseñas o los Actores oculto el tab bar
					const routeName = getFocusedRouteNameFromRoute(route);
					const hideTabHeader =
						routeName === "PantallaDetallePelicula" ||
						routeName === "PantallaReseniasPelicula" ||
						routeName === "PantallaActoresPelicula";
					return {
						tabBarLabel: t("tab_menu.movies"),
						headerShown: !hideTabHeader,
					};
				}}
			/>
			<Tab.Screen
				name="SearchStack"
				component={SearchStack}
				options={({ route }) => {
					// Con esto detecto la pantalla activa y si es los Resultados de la Busqueda oculto el tab bar
					const routeName = getFocusedRouteNameFromRoute(route);
					const hideTabHeader = routeName === "PantallaResultadosBusqueda";
					return {
						tabBarLabel: t("tab_menu.search"),
						headerShown: !hideTabHeader,
					};
				}}
			/>
		</Tab.Navigator>
	);
};

export default Menu;

