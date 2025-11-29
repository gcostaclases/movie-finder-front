import { Modal, View, Text, StyleSheet, Platform } from "react-native";
import ButtonSecondary from "../components/general/ButtonSecondary";
import ButtonCloseModal from "../components/general/ButtonCloseModal";
import { useTranslation } from "react-i18next";

const PantallaSeleccionIdioma = ({ visible, onClose, onSelectLanguage }) => {
	const { t } = useTranslation();

	return (
		<Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
			<View style={styles.modalWrapper}>
				<View style={styles.modalContainer}>
					<ButtonCloseModal onPress={onClose} />
					<Text style={styles.titulo}>{t("user.profile.language.modal_title")}</Text>
					<View style={styles.buttons}>
						<ButtonSecondary
							title={t("language.es")}
							onPress={() => onSelectLanguage("es")}
							style={{ marginBottom: 15 }}
						/>
						<ButtonSecondary title={t("language.en")} onPress={() => onSelectLanguage("en")} />
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default PantallaSeleccionIdioma;

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalContainer: {
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		paddingTop: 50,
		paddingBottom: 55,
		alignItems: "center",
		zIndex: 1,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: -5 },
	},
	titulo: {
		fontSize: Platform.OS === "ios" ? 16 : 14,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 20,
		marginTop: 10,
		width: "85%",
		lineHeight: 25,
	},
	buttons: {
		width: "85%",
		marginTop: 10,
	},
});

