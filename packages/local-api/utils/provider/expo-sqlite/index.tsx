import { View, Text } from "react-native";
import { useMigrationHelper } from "@rooots/db/utils";


export const ExpoSQLiteProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const { success, error } = useMigrationHelper()
  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }
  return (
    <>{children}</>
  )
}