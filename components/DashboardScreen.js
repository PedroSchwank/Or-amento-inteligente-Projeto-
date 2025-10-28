import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

export default function DashboardScreen() {
  const [dadosGrafico, setDadosGrafico] = useState({ labels: [], datasets: [{ data: [] }] });

  const carregarDados = async () => {
    const existentes = await AsyncStorage.getItem('transacoes');
    const lista = existentes ? JSON.parse(existentes) : [];

    const agrupado = {};
    lista.forEach(t => {
      if (!agrupado[t.mes]) agrupado[t.mes] = { entradas: 0, gastos: 0 };
      if (t.tipo === 'entrada') agrupado[t.mes].entradas += t.valor;
      if (t.tipo === 'gasto') agrupado[t.mes].gastos += t.valor;
    });

    const labels = Object.keys(agrupado);
    const saldos = labels.map(m => agrupado[m].entradas - agrupado[m].gastos);

    setDadosGrafico({ labels, datasets: [{ data: saldos }] });
  };

  useFocusEffect(React.useCallback(() => { carregarDados(); }, []));

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/Sifrao')} style={styles.banner} />
      <Text style={styles.title}>Histórico de Saldos</Text>
      <View style={styles.card}>
        {dadosGrafico.labels.length > 0 ? (
          <LineChart
            data={dadosGrafico}
            width={Dimensions.get('window').width - 40}
            height={250}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#f4f6f8',
              backgroundGradientTo: '#f4f6f8',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 188, 212, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{ borderRadius: 16 }}
          />
        ) : (
          <Text style={styles.emptyText}>Nenhuma transação registrada ainda.</Text>
        )}
      </View>
      <Button mode="contained" style={styles.button} onPress={carregarDados}>
        Atualizar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  banner: { width: '100%', height: 120, resizeMode: 'cover', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  emptyText: { textAlign: 'center', color: '#999', fontSize: 16 },
  button: { margin: 20, backgroundColor: '#00bcd4' },
});
