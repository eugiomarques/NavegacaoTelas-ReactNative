import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcryptjs';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        return navigation.addListener('focus', () => {
            setUsername('');
            setPassword('');
        });
    }, [navigation]);

    const comparePassword = async (inputPassword, storedHash) => {
        return bcrypt.compareSync(inputPassword, storedHash);
    };

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                alert('Preencha todos os campos.');
                return;
            }

            const usersJSON = await AsyncStorage.getItem('users');
            let users = usersJSON ? JSON.parse(usersJSON) : [];
            const storedUser = users.find(user => user.username === username);

            if (!storedUser) {
                alert('Usuário não encontrado.');
                return;
            }

            const isMatch = await comparePassword(password, storedUser.password);
            if (!isMatch) {
                alert('Usuário ou senha incorretos.');
                return;
            }

            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('currentUser', username);
            navigation.navigate('Home');
            // O alerta foi movido para depois da navegação, como no código de registro
            alert('Login realizado com sucesso!');
        } catch (error) {
            alert('Erro ao fazer login.');
        }
    };

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
            <Button title="Entrar" onPress={handleLogin} />
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
