import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Conteudo1() {
    const [produtos, setProdutos] = useState([]);

    const fetchProdutos = useCallback(async () => {
        try {
            const produtosJSON = await AsyncStorage.getItem('produtos');
            if (produtosJSON !== null) {
                setProdutos(JSON.parse(produtosJSON));
            }
        } catch (error) {
            alert('Erro ao buscar os produtos.');
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchProdutos();
        }, [fetchProdutos])
    );

    const aumentarQuantidade = async (nomeProduto) => {
        const produtosAtualizados = produtos.map((produto) => {
            if (produto.nome === nomeProduto) {
                return { ...produto, quantidade: String(Number(produto.quantidade) + 1) };
            }
            return produto;
        });
        setProdutos(produtosAtualizados);
        await AsyncStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    };

    const diminuirQuantidade = async (nomeProduto) => {
        const produtosAtualizados = produtos.map((produto) => {
            if (produto.nome === nomeProduto && Number(produto.quantidade) > 0) {
                return { ...produto, quantidade: String(Number(produto.quantidade) - 1) };
            }
            return produto;
        });
        setProdutos(produtosAtualizados);
        await AsyncStorage.setItem('produtos', JSON.stringify(produtosAtualizados));
    };

    const removerProduto = async (nomeProduto) => {
        try {
            let produtos = await AsyncStorage.getItem('produtos');
            if (produtos !== null) {
                produtos = JSON.parse(produtos);
                const novoProdutos = produtos.filter(produto => produto.nome !== nomeProduto);
                await AsyncStorage.setItem('produtos', JSON.stringify(novoProdutos));
                setProdutos(novoProdutos); 
                alert('Produto removido com sucesso!');
            }
        } catch (error) {
            alert('Erro ao remover o produto.');
        }
    };

    const removerTodosProdutos = async () => {
        try {
            await AsyncStorage.removeItem('produtos');
            setProdutos([]); 
            alert('Todos os produtos foram removidos com sucesso!');
        } catch (error) {
            alert('Erro ao remover os produtos.');
        }
    };

    const enviarParaWhatsApp = () => {
        let mensagem = 'Produtos:\n\n';
        produtos.forEach(produto => {
            mensagem += `Nome: ${produto.nome}\nQuantidade: ${produto.quantidade}\nValidade: ${produto.validade}\n\n`;
        });
        mensagem += `Data e hora do envio: ${new Date().toLocaleString()}`;
        Linking.openURL(`whatsapp://send?text=${encodeURIComponent(mensagem)}`);
    };

    const checkExpiryDate = (validade) => {
        const today = new Date();
        const expiryDate = new Date(validade.split('/').reverse().join('-'));

        if (expiryDate.getFullYear() === today.getFullYear() && expiryDate.getMonth() === today.getMonth()) {
            return '⚠️ Produto vence este mês!';
        }

        return '';
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={[styles.cell, styles.header]}>Nome do Produto</Text>
                <Text style={[styles.cell, styles.header]}>Validade</Text>
                <Text style={[styles.cell, styles.header]}>Vencimento</Text>
                <Text style={[styles.cell, styles.header]}>Quantidade</Text>
            </View>
            <FlatList
                data={produtos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.nome}</Text>
                        <Text style={styles.cell}>{item.validade}</Text>
                        <Text style={styles.cell}>{checkExpiryDate(item.validade)}</Text>
                        <Button title="+" onPress={() => aumentarQuantidade(item.nome)} />
                        <Text style={styles.cell}>{item.quantidade}</Text>
                        <Button title="-" onPress={() => diminuirQuantidade(item.nome)} />
                        <Button title="Remover Produto" onPress={() => removerProduto(item.nome)} />
                    </View>
                )}
            />
            <Button title="Remover Todos Produtos" onPress={removerTodosProdutos} />
            <Button title="Enviar para WhatsApp" onPress={enviarParaWhatsApp} />
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
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    cell: {
        flex: 1,
        fontSize: 16,
        textAlign: 'left',
        paddingLeft: 10, 
    },
    header: {
        fontWeight: 'bold',
        paddingLeft: 10, 
    },
});