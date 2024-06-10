import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
            <Text onPress={()=>navigation.navigate('Perfil')}>Perfil</Text>
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
            <Button title="Cadastrar Produto" onPress={handleRegister} />
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
