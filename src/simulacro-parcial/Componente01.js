import { Input } from "@rneui/base";
import { Link } from "expo-router";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function Componente01() {
  const navegationList = [
    {
      id: 1,
      titulo: "Props02",
      href: {
        pathname: "/props02",
        params: {
          nombre: "Texto",
          estado: false,
        },
      },
    },
    {
      id: 2,
      titulo: "Axios03",
      href: {
        pathname: "/axios03",
      },
    },
    {
      id: 3,
      titulo: "AsyncStorage04",
      href: {
        pathname: "/asyncstorage04",
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Componente 01</Text>
      <Input
        placeholder="Ingrese su nombre"
        leftIcon={{ type: "font-awesome", name: "user" }}
      />

      <FlatList
        style={{ marginVertical: 20 }}
        data={navegationList}
        renderItem={({ item }) => (
          <Link href={item.href} style={styles.listItem}>
            {item.titulo}
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  textHeader: {
    fontSize: 40,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#2089dc",
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 16,
  },
});
export default Componente01;
