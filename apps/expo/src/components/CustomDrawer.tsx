import { Drawer } from 'expo-router/drawer';
import { AppDrawerContent } from '@rooots/app/components/AppDrawerContent';
// import type { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function CustomDrawer() {
  return (
    <Drawer />
    //   drawerContent={(props: DrawerContentComponentProps) => (
    //     <AppDrawerContent {...props} />
    //   )}
    //   screenOptions={{
    //     headerShown: true,
    //     drawerType: 'slide',
    //     drawerStyle: {
    //       width: '80%',
    //       maxWidth: 300,
    //     },
    //     headerLeft: () => null, // Hide default header left
    //   }}
    // >
    //   <Drawer.Screen
    //     name="(tabs)"
    //     options={{
    //       headerShown: false,
    //     }}
    //   />
    //   <Drawer.Screen
    //     name="modal"
    //     options={{
    //       presentation: 'modal',
    //     }}
    //   />
    // </Drawer>
  );
}
