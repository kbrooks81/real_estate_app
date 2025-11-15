import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center"
    >
      <Text className="text-xl font-rubik-medium">My Name is Kris!</Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="./properties/1">Property</Link>
    </View>
  );
}
