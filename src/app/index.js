import { useNavigation } from "expo-router";
import Componente01 from "../simulacro-parcial/Componente01";
import { useEffect } from "react";

export default function HomePage() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return <Componente01 />;
}
