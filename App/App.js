import {
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
  TouchableHighlight,
  Pressable,
} from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import * as localAuthentication from "expo-local-authentication";
import io from "socket.io-client";

export const App = () => {
  const socket = io("ws://172.30.99.139:3003");

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [id, setId] = useState(2);
  const [currentId, setCurrentId] = useState(0);

  // For face detection or fingerprint scan
  useEffect(() => {
    (async () => {
      const compatible = await localAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().isConnected());
    });

    socket.on("id", () => {
      setId(currentId);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  const fallbackToDefaultAuth = () => {
    console.log("Fall back to password authentication");
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const Authenticated = () => {
    Alert.alert(
      "Your package is authenticated",
      "The delivery guy will be right there!",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
    setCurrentId(id);
    socket.emit("authentication", currentId);
  };

  const handleBiometricAuth = async () => {
    // Check if hardware supports biometric authentication
    const isBiometricAvailable = await localAuthentication.hasHardwareAsync();

    // Fallback to default authentication (password) if biometric authentication is not available
    if (!isBiometricAvailable) {
      return alertComponent(
        "please Enter your password",
        "Biometric authentication is not available",
        "OK",
        () => fallbackToDefaultAuth()
      );
    }

    // Check biomtric types available(fingerprint, facial recognition, iris recognition)
    let supportedBiomertricTypes;

    if (isBiometricAvailable) {
      supportedBiomertricTypes =
        await localAuthentication.supportedAuthenticationTypesAsync();
    }

    // Check biometrics are saved locally in user's device
    const savedBiometrics = await localAuthentication.isEnrolledAsync();

    if (!savedBiometrics) {
      return alertComponent(
        "Biometric record not found",
        "Please login with password",
        "OK",
        () => fallbackToDefaultAuth()
      );
    }

    // Authenticate with biometric
    const biometricAuth = await localAuthentication.authenticateAsync({
      promptMessage: "Please authenticate yourself",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    // Log the user in on succes
    if (!biometricAuth.success) {
      return alertComponent(
        "Authentication failed",
        "Please login with password",
        "OK",
        () => fallbackToDefaultAuth()
      );
    } else {
      Authenticated();
      console.log({ isBiometricAvailable });
      console.log({ supportedBiomertricTypes });
      console.log({ savedBiometrics });
      console.log({ biometricAuth });
    }
  };

  return (
    <SafeAreaView className="h-full bg-cyan-400 justify-center">
      <View className=" items-center">
        <Text className="text-2xl font-bold">
          {isBiometricSupported
            ? "Your device is compatible with biometrics"
            : "Face or Fingerprint is available on this device"}
        </Text>
        <TouchableHighlight className="mt-8">
          <Button
            title="Login with biometrics"
            color="black"
            onPress={handleBiometricAuth}
          />
        </TouchableHighlight>
        {id == 1 && handleBiometricAuth()}
        <Text className="text-2xl mt-4">Connected: {"" + isConnected}</Text>
        <Text className="mt-4">Last pong: {lastPong || "-"}</Text>
        <Pressable
          className="bg-black rounded-lg mt-2 hover:bg-white hover:border border-white"
          onPress={sendPing}
        >
          <Text className="text-white py-3 px-8 hover:text-black">Ping</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default App;
