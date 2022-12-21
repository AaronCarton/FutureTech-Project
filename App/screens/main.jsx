import {
  View,
  Text,
  SafeAreaView,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useState, useEffect } from "react";
import * as localAuthentication from "expo-local-authentication";

export const mainStackNavigation = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // for face detection or fingerprint scan
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
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

  const twoButtonAlert = () => {
    Alert.alert("Welcome to app", "Please authenticate yourself", [
      {
        text: "Back",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
    ]);
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
      promptMessage: "Login with biometrics",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    // Log the user in on succes
    if (biometricAuth) {
      twoButtonAlert();
      console.log({ isBiometricAvailable });
      console.log({ supportedBiomertricTypes });
      console.log({ savedBiometrics });
      console.log({ biometricAuth });
    }
  };
  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">
          {isBiometricSupported
            ? "Your device is compatible with biometrics"
            : "Face or Fingerprint is available on this device"}
        </Text>
        <TouchableHighlight className="h-16 mt-52">
          <Button
            title="Login with biometrics"
            color="black"
            onPress={handleBiometricAuth}
          />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
