import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, PRIMARY, ACCENT } from "@/styles/authStyles";

import { registerSchema, RegisterFormData } from "@/lib/validation";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [secureText, setSecureText] = useState(true);
  const [secureConfirmText, setSecureConfirmText] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSignUp = async (dados: RegisterFormData) => {
    setLoading(false);
    setNotification(null);
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.password,
    });

    if (authError) {
      setLoading(false);

      if (authError.message.includes("User already registered")) {
        setNotification("Este e-mail já está cadastrado.\nTente outro ou faça login.");
      } else {
        setNotification("Ops! Algo deu errado.\nTente novamente mais tarde.");
      }

      return;
    }

    if (authData?.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: authData.user.id,
            username: dados.username,
          },
        ]);

      setLoading(false);

      if (authData.session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {notification && (
        <View style={styles.notificationBanner}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoCircle}>
                <Image
                  source={require("@/assets/images/jovem-investe-logo.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text style={styles.title}>Junte-se a nós!</Text>
            <Text style={styles.subtitle}>Crie sua conta agora mesmo</Text>

            <Text style={styles.label}>Nome de usuário:</Text>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputContainer, errors.username && styles.inputError]}>
                  <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.icon} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Ex.: Maria Aparecida"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                  />
                </View>
              )}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}

            <Text style={styles.label}>E-mail:</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.icon} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Ex.: maria123@gmail.com"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Text style={styles.label}>Senha:</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.icon} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={secureText}
                    autoComplete="password"
                    textContentType="password"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setSecureText(!secureText)}
                  >
                    <Ionicons
                      name={secureText ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <Text style={styles.label}>Confirmação de senha:</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.icon} />
                  <TextInput
                    style={styles.inputText}
                    placeholder="Confirme sua senha"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={secureConfirmText}
                    autoComplete="off"
                    textContentType="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setSecureConfirmText(!secureConfirmText)}
                  >
                    <Ionicons
                      name={secureConfirmText ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, loading && styles.disabledButton]}
              onPress={handleSubmit(handleSignUp)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textButton}>Criar conta</Text>
              )}
            </TouchableOpacity>

            <View style={styles.linkRow}>
              <Text style={styles.linkText}>Já tem uma conta? </Text>
              <Link href="/login" style={styles.linkAction}>
                Faça login
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}