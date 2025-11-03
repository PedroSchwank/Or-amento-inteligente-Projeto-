import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput, Text, Portal, Dialog, RadioButton } from 'react-native-paper';

export default function MetasScreen() {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('saida');
  const [mes, setMes] = useState('Janeiro');
  const [showTipoDialog, setShowTipoDialog] = useState(false);
  const [showMesDialog, setShowMesDialog] = useState(false);
  const [showHistoricoDialog, setShowHistoricoDialog] = useState(false);
  const [historicoMetas, setHistoricoMetas] = useState([]);

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const salvarMeta = async () => {
    if (!valor) {
      alert('Informe o valor da meta!');
      return;
    }

    const meta = { tipo, valor: parseFloat(valor), mes };
    const chave = 'metas';
    const existentes = await AsyncStorage.getItem(chave);
    const lista = existentes ? JSON.parse(existentes) : [];
    lista.push(meta);
    await AsyncStorage.setItem(chave, JSON.stringify(lista));

    setValor('');
    alert('Meta salva com sucesso!');
  };

  const carregarHistoricoMetas = async () => {
    const existentes = await AsyncStorage.getItem('metas');
    const lista = existentes ? JSON.parse(existentes) : [];
    setHistoricoMetas(lista);
    setShowHistoricoDialog(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Definir Meta</Text>

      <View style={styles.card}>
        <Button mode="outlined" onPress={() => setShowTipoDialog(true)} style={styles.button}>
          Tipo: {tipo === 'saida' ? 'Saídas' : 'Entradas'}
        </Button>

        <Button mode="outlined" onPress={() => setShowMesDialog(true)} style={styles.button}>
          Mês: {mes}
        </Button>

        <TextInput
          label="Valor da Meta"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
          style={styles.input}
        />

        <Button mode="contained" onPress={salvarMeta} style={styles.saveButton}>
          Salvar Meta
        </Button>

        <Button mode="contained" onPress={carregarHistoricoMetas} style={styles.historyButton}>
          Ver Histórico de Metas
        </Button>
      </View>

      {/* Dialog Tipo */}
      <Portal>
        <Dialog visible={showTipoDialog} onDismiss={() => setShowTipoDialog(false)}>
          <Dialog.Title>Selecione o Tipo</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group onValueChange={setTipo} value={tipo}>
              <RadioButton.Item label="Saídas" value="saida" />
              <RadioButton.Item label="Entradas" value="entrada" />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowTipoDialog(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Dialog Mês */}
      <Portal>
        <Dialog visible={showMesDialog} onDismiss={() => setShowMesDialog(false)}>
          <Dialog.Title>Selecione o Mês</Dialog.Title>
          <Dialog.Content>
            {meses.map((m) => (
              <Button key={m} onPress={() => { setMes(m); setShowMesDialog(false); }}>
                {m}
              </Button>
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>

      {/* Dialog Histórico Metas */}
      <Portal>
        <Dialog visible={showHistoricoDialog} onDismiss={() => setShowHistoricoDialog(false)}>
          <Dialog.Title>Histórico de Metas</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView style={{ padding: 10 }}>
              {historicoMetas.length > 0 ? (
                historicoMetas.map((item, index) => (
                  <View key={index} style={styles.historyCard}>
                    <Text style={styles.historyText}>Tipo: {item.tipo}</Text>
                    <Text style={styles.historyText}>Valor: R$ {item.valor.toFixed(2)}</Text>
                    <Text style={styles.historyText}>Mês: {item.mes}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.historyText}>Nenhuma meta registrada.</Text>
              )}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setShowHistoricoDialog(false)}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6f8' },
  banner: { width: '100%', height: 120, resizeMode: 'cover', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 10
  },
  input: { marginVertical: 10, backgroundColor: '#fff' },
  button: { marginVertical: 10 },
  saveButton: { marginTop: 20, backgroundColor: '#00bcd4' },
  historyButton: { marginTop: 10, backgroundColor: '#673ab7' },
  historyCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  historyText: { fontSize: 14, color: '#333' }
});