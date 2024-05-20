import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça seu Login ou registre-se.</Text>
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
            <Button title="Entrar" onPress={() => navigation.navigate('Home')} />
            <Button title="Não possui cadastro? Registre-se aqui" onPress={() => navigation.navigate('Registrar')} color="blue" />
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
