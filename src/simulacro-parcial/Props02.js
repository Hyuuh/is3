import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Props02() {
  const { nombre, estado } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: `${nombre}` });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{nombre}</Text>
      <Text style={styles.texto}>{estado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
