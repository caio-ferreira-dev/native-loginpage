import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [emailLabelOpacity] = useState(new Animated.Value(0));
  const [passwordLabelOpacity] = useState(new Animated.Value(0));

  async function animateLabelIn(component: "email" | "password") {
    switch (component) {
      case "email":
        Animated.parallel([
          Animated.timing(emailLabelOpacity, {
            toValue: 1,
            duration: 300, // Duração da animação (em milissegundos)
            useNativeDriver: true,
          }),
        ]).start();
        break;
      case "password":
        Animated.parallel([
          Animated.timing(passwordLabelOpacity, {
            toValue: 1,
            duration: 300, // Duração da animação (em milissegundos)
            useNativeDriver: true,
          }),
        ]).start();
        break;
      default:
        break;
    }
  }

  async function animateLabelOut(component: "email" | "password") {
    switch (component) {
      case "email":
        Animated.parallel([
          Animated.timing(emailLabelOpacity, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]).start();
        break;
      case "password":
        Animated.parallel([
          Animated.timing(passwordLabelOpacity, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]).start();
        break;
      default:
        break;
    }
  }

  async function handleFocus(component: "email" | "password") {
    switch (component) {
      case "email":
        setIsEmailFocused(true);
        animateLabelIn("email");
        break;
      case "password":
        setIsPassFocused(true);
        animateLabelIn("password");
        break;
      default:
        break;
    }
  }

  async function handleBlur(component: "email" | "password") {
    switch (component) {
      case "email":
        setIsEmailFocused(false);
        if (email === "") {
          animateLabelOut("email");
        }
        break;
      case "password":
        setIsPassFocused(false);
        if (password === "") {
          animateLabelOut("password");
        }
        break;
      default:
        break;
    }
  }

  async function handleForgotPass() {
    router.push("/home");
  }

  async function handleLogin(email: string, password: string) {
    try {
      /* 
      const response = await fetch(
        `https://seu-servidor.com/api/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(password)}`
      );

      if (!response.ok) {
        throw new Error("Erro ao fazer login. Verifique suas credenciais.");
      }

      const data = await response.json();
      */

      // Mock
      const response = {
        ok: "ok",
      };
      const data = {
        success: "success",
        message: "message",
      };

      if (!response.ok) {
        throw new Error("Erro ao fazer login. Verifique suas credenciais.");
      }

      // Simples verificação para ver se o login foi bem-sucedido
      if (data.success) {
        router.push("/home"); // Redireciona para a tela "Home"
      } else {
        throw new Error(data.message || "Erro desconhecido.");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message); // Exibe um pop-up de erro
    }
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
        />

        <View style={styles.inputContainer}>
          <Animated.Text
            style={[
              styles.inputLabel,
              {
                opacity: emailLabelOpacity,
                color: isEmailFocused ? "#c0aa89" : "#ccc",
              },
            ]}
          >
            Seu Email
          </Animated.Text>

          <TextInput
            style={[
              styles.input,
              {
                borderColor: isEmailFocused ? "#c0aa89" : "#b9ccd8",
              },
            ]}
            placeholder={isEmailFocused ? "" : "Seu email"}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
          />
        </View>

        <View style={styles.inputContainer}>
          <Animated.Text
            style={[
              styles.inputLabel,
              {
                opacity: passwordLabelOpacity,
                color: isPassFocused ? "#c0aa89" : "#ccc",
              },
            ]}
          >
            Sua Senha
          </Animated.Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: isPassFocused ? "#c0aa89" : "#b9ccd8",
              },
            ]}
            placeholder={isPassFocused ? "" : "Sua senha"}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
          />
        </View>

        <View style={styles.forgot}>
          <Text>Esqueceu sua senha?</Text>
          <TouchableOpacity onPress={handleForgotPass}>
            <Text style={styles.link}>Clique aqui</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin(email, password)}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.version}>v1.00.23.12.2024</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#293971",
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 30,
    flex: 1,
    alignItems: "center",
    padding: 40,
    backgroundColor: "#ffffff",
  },
  logo: {
    width: width * 0.8,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  inputContainer: {
    width: "100%",
    position: "relative", // Permite o posicionamento do texto dentro do campo
    marginBottom: 24,
  },
  inputLabel: {
    textAlign: "center",
    width: 70,
    position: "absolute",
    top: -10,
    left: 20,
    fontSize: 14,
    backgroundColor: "white", // Garante que o fundo fique visível
    zIndex: 1, // Mantém o texto acima do campo
    color: "#666", // Cor mais sutil
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingTop: 18, // Dá espaço para o texto no topo
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#293971",
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff",
  },
  forgot: {
    flexDirection: "row",
    fontSize: 16,
    marginRight: "auto",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 40,
  },
  link: {
    marginLeft: 5,
    color: "#4f96f3",
    textDecorationLine: "underline",
  },
  version: {
    position: "absolute",
    bottom: 20,
    right: 20,
    fontSize: 10,
    color: "#b9ccd8",
  },
});

export default LoginScreen;
