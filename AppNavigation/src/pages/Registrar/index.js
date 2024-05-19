import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Registrar({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleRegister = () => {
        // Aqui você pode implementar a lógica de registro
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça seu Registro ou entre no seu login.</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome de usuário"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Registrar" onPress={handleRegister} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} color="blue" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
});
