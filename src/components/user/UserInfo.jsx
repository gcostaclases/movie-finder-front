//#region ----------- IMPORTS ------------
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useUserProfile from "../../hooks/useUserProfile";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import useUploadProfileImage from "../../hooks/useUploadProfileImage";
import FadeInView from "../animations/FadeInView";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
//#endregion ------------ IMPORTS ------------

const USER_PLACEHOLDER = require("../../assets/img/User-Placeholder.png");

const UserInfo = () => {
	const { loading, error } = useUserProfile();
	const { uploadImage, loading: loadingUpload, error: errorUpload, success } = useUploadProfileImage();

	const { t } = useTranslation();

	const username = useSelector((state) => state.user.username);
	const email = useSelector((state) => state.user.email);
	const profileImage = useSelector((state) => state.user.profileImage);

	useEffect(() => {
		if (errorUpload) {
			Toast.show({
				type: "error",
				text1: errorUpload,
			});
		}
		if (success) {
			Toast.show({
				type: "success",
				text1: t("user.profile.picture.editing_success"),
			});
		}
	}, [errorUpload, success, t]);

	const handlePickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Permiso denegado", "Se requieren permisos para acceder a la galería.");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});
		if (!result.canceled && result.assets && result.assets.length > 0) {
			const image = result.assets[0];
			await uploadImage(image.uri);
		}
	};

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#27AAE1" style={{ marginVertical: 20 }} />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.centered}>
				<Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
			</View>
		);
	}

	return (
		<View>
			{/* Imágen de perfil y botón para cambiarla */}
			<TouchableOpacity onPress={handlePickImage} disabled={loadingUpload} activeOpacity={0.8}>
				<FadeInView>
					<Image source={profileImage ? { uri: profileImage } : USER_PLACEHOLDER} style={styles.avatar} />
				</FadeInView>
			</TouchableOpacity>

			{/* Botón Editar Foto */}
			<TouchableOpacity onPress={handlePickImage} disabled={loadingUpload}>
				<Text style={styles.editarFoto}>
					{loadingUpload
						? t("user.profile.picture.loading_profile_picture")
						: t("user.profile.picture.edit_profile_picture")}
				</Text>
			</TouchableOpacity>

			{/* Información de usuario */}
			<View style={styles.infoWrapper}>
				{/* Usuario */}
				<View style={styles.infoRow}>
					<View style={styles.iconAndLabelWrapper}>
						<FontAwesome5 name="user" size={20} color="#222" style={styles.icon} solid />
						<Text style={styles.infoLabel}>{t("user.profile.info.username") + ":"}</Text>
					</View>
					<Text style={styles.infoValue}>{username}</Text>
				</View>
				{/* Email */}
				<View style={styles.infoRow}>
					<View style={styles.iconAndLabelWrapper}>
						<FontAwesome5 name="envelope" size={20} color="#222" style={styles.icon} solid />
						<Text style={styles.infoLabel}>{t("user.profile.info.email") + ":"}</Text>
					</View>
					<Text style={styles.infoValue}>{email}</Text>
				</View>
			</View>
		</View>
	);
};

export default UserInfo;

const styles = StyleSheet.create({
	avatar: {
		width: 160,
		height: 160,
		borderRadius: 80,
		marginBottom: 10,
		// marginTop: 10,
		alignSelf: "center",
		// backgroundColor: "#eee",
	},
	editarFoto: {
		color: "#27AAE1",
		fontSize: 15,
		marginBottom: 18,
		textAlign: "center",
		textDecorationLine: "underline",
	},
	infoWrapper: {
		// backgroundColor: "#f4a261ff",
		width: "85%",
	},
	infoRow: {
		// backgroundColor: "#e45757ff",
		width: "100%",
		flexDirection: "row",
		// alignItems: "center",
		marginBottom: 8,
		// marginLeft: 10,
		justifyContent: "center",
		gap: 10,
	},
	iconAndLabelWrapper: {
		// flex: 0.5,
		// backgroundColor: "#7af461ff",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	icon: {
		marginRight: 10,
	},
	infoLabel: {
		// backgroundColor: "#2a9d8fff",
		fontWeight: "bold",
		fontSize: 17,
		color: "#222",
		textTransform: "uppercase",
	},
	infoValue: {
		flex: 1,
		fontWeight: "normal",
		fontSize: 16,
		color: "#222",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
});

