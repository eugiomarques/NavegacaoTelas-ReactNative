import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidadeProduto, setQuantidadeProduto] = useState('');
    const [validadeProduto, setValidadeProduto] = useState('');

    const handleRegister = async () => {
        if (!nomeProduto || !quantidadeProduto || !validadeProduto) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const produto = {
            nome: nomeProduto,
            quantidade: quantidadeProduto,
            validade: validadeProduto,
        };

        try {
            const existingProducts = JSON.parse(await AsyncStorage.getItem('produtos')) || [];
            existingProducts.push(produto);
            await AsyncStorage.setItem('produtos', JSON.stringify(existingProducts));
            alert('Produto cadastrado com sucesso!');
            setNomeProduto('');
            setQuantidadeProduto('');
            setValidadeProduto('');
        } catch (error) {
            alert('Erro ao cadastrar o produto.');
        }
    };

    const handleDateChange = (text) => {
        let newText = '';
        let index = 0;
        for (let i = 0; i < text.length; i++) {
            if (index === 2 || index === 4) {
                newText = newText + '/';
            }
            newText = newText + text[i];
            index++;
        }
        setValidadeProduto(newText);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, styles.profileButton]}
                onPress={() => navigation.navigate('Perfil')}
            >
                <Text style={styles.buttonText}>Acessar meu perfil</Text>
            </TouchableOpacity>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Cadastro de Produtos</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do produto"
                    value={nomeProduto}
                    onChangeText={setNomeProduto}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantidade do produto"
                    value={quantidadeProduto}
                    onChangeText={(text) => {
                        setQuantidadeProduto(text.replace(/[^0-9]/g, ''));
                    }}
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Validade do produto"
                    value={validadeProduto}
                    onChangeText={(text) => {
                        handleDateChange(text.replace(/[^0-9]/g, ''));
                    }}
                    maxLength={10}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Cadastrar Produto</Text>
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
    button: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    profileButton: {
        backgroundColor: '#6c757d', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
});
