import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  VirtualizedList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Button, ListItem, Text, Icon } from "@rneui/themed";

const AsyncStorage4 = () => {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [key, setKey] = useState("");
  const [dataList, setDataList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      setIsDisabled(false);
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      setDataList(
        items.map(([id, data]) => {
          const { nombre, cedula } = JSON.parse(data);
          return {
            id,
            nombre,
            cedula,
          };
        })
      );
      // setDataList(items.map(([id, nombre, cedula]) => ({ id, nombre, cedula })));
    } catch (error) {
      console.error("Error loading lista", error);
    }
  };

  const editar = async (id, nombre, cedula) => {
    setKey(id);
    setNombre(nombre);
    setCedula(cedula);
    setIsDisabled(true);
  };

  const guardar = async () => {
    try {
      if (nombre.trim() === "" || cedula.trim === "") {
        Alert.alert("Error", "Completa todos los campos");
        return;
      }
      if (key.trim() === "") {
        //Guardar
        const key = Math.random().toString(36).substring(2);
        await AsyncStorage.setItem(key, JSON.stringify({ nombre, cedula }));
        setNombre("");
        setCedula("");
        setKey("");
        listar();
        Alert.alert("Éxito", "Datos guardados");
      } else {
        //Actualizar
        actualizar();
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar los datos");
      console.error(error);
    }
  };

  const actualizar = async () => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify({ nombre, cedula }));
      setNombre("");
      setCedula("");
      setKey("");
      listar();
      Alert.alert("Éxito", "Datos actualizados");
    } catch (error) {
      Alert.alert("Error", "Error al actualizar los datos");
      console.error(error);
    }
  };

  const eliminar = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      setNombre("");
      setCedula("");
      setKey("");
      listar();
      Alert.alert("Éxito", "Datos eliminados");
    } catch (error) {
      Alert.alert("Error", "Error al eliminar los datos");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder="Código"
          disabled={isDisabled}
          value={key}
          style={styles.input}
        />
      </View>
      <View>
        <Input
          placeholder="Ingrese un nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
      </View>
      <View>
        <Input
          placeholder="Ingrese un C.I."
          keyboardType="numeric"
          value={cedula}
          onChangeText={setCedula}
          style={styles.input}
        />
      </View>
      <Button title={isDisabled ? "Actualizar" : "Guardar"} onPress={guardar} />
      <Text h4 style={styles.title}>
        Lista de Datos:
      </Text>
      <VirtualizedList
        style={{ marginVertical: 20, paddingHorizontal: 10 }}
        initialNumToRender={5}
        getItemCount={(data) => data.length}
        data={dataList}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, nombre, cedula } }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{nombre}</ListItem.Title>
              <ListItem.Title>{cedula}</ListItem.Title>
              <ListItem.Subtitle>{id}</ListItem.Subtitle>
            </ListItem.Content>
            <Pressable onPress={() => editar(id, nombre, cedula)}>
              <Icon name="edit" type="font-awesome-5" size={36} color="red" />
            </Pressable>
            <Pressable onPress={() => eliminar(id)}>
              <Icon name="trash" type="font-awesome-5" size={36} color="red" />
            </Pressable>
          </ListItem>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  title: {
    marginVertical: 10,
  },
  overlayContent: {
    width: "80%",
    padding: 20,
  },
});
export default AsyncStorage4;
