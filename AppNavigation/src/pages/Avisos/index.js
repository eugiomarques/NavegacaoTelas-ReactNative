import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Avisos() {
    const [produtos, setProdutos] = useState([]);

    const fetchProdutos = useCallback(async () => {
        try {
            const produtosJSON = await AsyncStorage.getItem('produtos');
            if (produtosJSON !== null) {
                let produtosArray = JSON.parse(produtosJSON);
                produtosArray.sort((a, b) => new Date(a.validade.split('/').reverse().join('-')) - new Date(b.validade.split('/').reverse().join('-')));
                setProdutos(produtosArray);
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Avisos</Text>
            <View style={styles.row}>
                <Text style={[styles.cell, styles.header]}>Nome do Produto</Text>
                <Text style={[styles.cell, styles.header]}>Quantidade</Text>
                <Text style={[styles.cell, styles.header]}>Validade</Text>
            </View>
            <FlatList
                data={produtos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.nome}</Text>
                        <Text style={styles.cell}>{item.quantidade}</Text>
                        <Text style={styles.cell}>{item.validade}</Text>
                    </View>
                )}
            />
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
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    cell: {
        flex: 1,
        fontSize: 16,
    },
    header: {
        fontWeight: 'bold',
    },
});
