import { StyleSheet, View, VirtualizedList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text as TextBase } from "@rneui/base";

export default function Axios03() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setData(response.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <VirtualizedList
        style={{ marginVertical: 20, paddingHorizontal: 10 }}
        initialNumToRender={5}
        getItemCount={(data) => data.length}
        data={data}
        getItem={(data, index) => data[index]}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <Card containerStyle={{ borderColor: "black", borderRadius: 10 }}>
            <Card.Title h2>{item.name}</Card.Title>
            <Card.Divider />
            <TextBase h4>Usuario: {item.username}</TextBase>
            <TextBase h4>Email: {item.username}</TextBase>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
});
