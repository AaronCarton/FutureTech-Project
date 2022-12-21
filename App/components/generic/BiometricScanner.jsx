import { View, Text, SafeAreaView, Button, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as localAuthentication from "expo-local-authentication";
import io from "socket.io-client";

export const BiometricScanner = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // For face detection or fingerprint scan
  useEffect(() => {
    (async () => {
      const compatible = await localAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

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

  return <View></View>;
};
