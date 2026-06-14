import { StyleSheet } from "react-native";

export const PRIMARY = "#031eca";
export const ACCENT = "#FFC400";

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: PRIMARY },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },
  notificationBanner: {
    position: "absolute",
    top: 50, left: 24, right: 24,
    backgroundColor: "#ef4444",
    padding: 16, borderRadius: 8,
    zIndex: 20, elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, shadowRadius: 3.84,
  },
  notificationText: {
    color: "#fff", fontSize: 14,
    fontWeight: "600", textAlign: "center", lineHeight: 20,
  },
  card: {
    backgroundColor: "#fff", borderRadius: 24,
    paddingHorizontal: 24, paddingTop: 64, paddingBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 12, elevation: 6,
  },
  logoWrapper: {
    position: "absolute", top: -56,
    left: 0, right: 0, alignItems: "center", zIndex: 10,
  },
  logoCircle: {
    width: 112, height: 112, borderRadius: 56,
    backgroundColor: "#fff", borderWidth: 4, borderColor: "#fff",
    alignItems: "center", justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, shadowRadius: 6, elevation: 5,
  },
  logoImage: { width: "100%", height: "100%" },
  title: {
    fontSize: 26, fontWeight: "800",
    textAlign: "center", color: PRIMARY, marginTop: 4,
  },
  subtitle: {
    fontSize: 14, fontWeight: "700",
    color: ACCENT, textAlign: "center",
    marginTop: 4, marginBottom: 10,
  },
  label: {
    fontSize: 14, fontWeight: "600",
    color: PRIMARY, marginTop: 10, marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#fff", borderWidth: 1.5,
    borderColor: PRIMARY, borderRadius: 12, paddingHorizontal: 12,
  },
  icon: { marginRight: 8 },
  inputText: { flex: 1, paddingVertical: 13, fontSize: 15, color: "#1f2937" },
  eyeButton: { paddingHorizontal: 8, justifyContent: "center", alignItems: "center" },
  inputError: { borderColor: "#ef4444" },
  errorText: { color: "#ef4444", fontSize: 12, marginTop: 2 },
  button: {
    backgroundColor: PRIMARY, borderRadius: 12,
    paddingVertical: 16, alignItems: "center", marginTop: 22,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  disabledButton: { opacity: 0.6 },
  textButton: { color: "#fff", fontSize: 16, fontWeight: "700" },
  linkRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  linkText: { color: PRIMARY, fontSize: 14 },
  linkAction: {
    color: PRIMARY, fontSize: 14,
    fontWeight: "700", textDecorationLine: "underline",
  },
});
