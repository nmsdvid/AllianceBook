import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View>
                Oops! Millennium Falcon not found!
            </View>
        </>
    );
}
