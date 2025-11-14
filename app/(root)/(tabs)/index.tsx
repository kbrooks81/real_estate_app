import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center"
    >
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="./properties/1">Property</Link>
    </View>
  );
}
