import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
            alert('Login realizado com sucesso!');
        } catch (error) {
            alert('Erro ao fazer login.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Faça seu Login</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.navigate('Registrar')}>
                    <Text style={[styles.buttonText, styles.registerButtonText]}>Não possui cadastro? Registre-se aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    formContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 15,
        elevation: 3, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
        paddingLeft: 8,
    },
    button: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        backgroundColor: '#6c757d',
    },
    registerButtonText: {
        color: '#fff',
    },
});
