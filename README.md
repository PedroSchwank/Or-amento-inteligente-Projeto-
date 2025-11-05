📊 Orçamento Mensal Inteligente
Este projeto é um aplicativo React Native para controle financeiro pessoal, permitindo gerenciar entradas, saídas, metas mensais e acompanhar alertas quando os gastos ultrapassam os limites definidos. Ele também apresenta um dashboard com gráfico de saldos mensais.
Apresentaçao do codigo no YT: https://youtu.be/bjSunoczfIE
✅ Funcionalidades Principais


Dashboard:

Exibe um gráfico de linha com o histórico de saldos (Entradas - Saídas) por mês.
Atualização manual dos dados com botão "Atualizar".



Metas:

Definição de metas mensais para entradas ou saídas.
Histórico de metas salvas.
Interface com seleção de tipo, mês e valor.



Transações:

Registro de entradas e gastos com categoria, valor e mês.
Histórico detalhado das transações.
Feedback visual (vibração) ao salvar.



Alertas:

Verificação automática se os gastos ultrapassaram a meta definida para o mês.
Exibição de alertas com mensagem e destaque visual.




🗂 Estrutura de Pastas
Project/
├── assets/
│   └── SIFRAO.png          # Imagem usada como banner
├── components/
│   ├── DashboardScreen.js  # Tela do gráfico de saldos
│   ├── MetasScreen.js      # Tela para definir metas
│   ├── TransacoesScreen.js # Tela para registrar transações
│   └── AlertasScreen.js    # Tela para exibir alertas
├── App.js                  # Configuração principal do app e navegação
└── package.json            # Dependências do projeto


🛠 Tecnologias Utilizadas

React Native
React Navigation (@react-navigation/native, @react-navigation/bottom-tabs)
React Native Paper (componentes estilizados)
AsyncStorage (@react-native-async-storage/async-storage) para persistência local
react-native-chart-kit para gráficos
react-native-vector-icons para ícones
react-native-svg (dependência do chart-kit)


⚙️ Instalação e Configuração
1. Clone o repositório
Shellgit clone <URL_DO_REPOSITORIO>cd ProjectMostrar mais linhas
2. Instale as dependências
Shellnpm install# ouyarn installMostrar mais linhas
3. Execute o projeto
Shellnpx react-native run-android# ounpx react-native run-iosMostrar mais linhas

📦 Dependências Principais (package.json)
JSON{  "dependencies": {    "react-native-svg": "15.12.1",    "react-native-paper": "^5.0.0",    "react-native-screens": "~4.16.0",    "react-native-chart-kit": "*",    "@react-navigation/native": "^6.1.6",    "react-native-vector-icons": "10.3.0",    "@react-navigation/bottom-tabs": "^6.5.7",    "react-native-safe-area-context": "~5.6.0",    "@react-native-async-storage/async-storage": "2.2.0"  }}Mostrar mais linhas

🔍 Como Funciona Cada Tela
1. DashboardScreen

Carrega transações do AsyncStorage.
Agrupa por mês e calcula saldo (Entradas - Saídas).
Renderiza gráfico com react-native-chart-kit.

2. MetasScreen

Permite definir metas para entradas ou saídas.
Salva metas no AsyncStorage.
Exibe histórico de metas em um modal.

3. TransacoesScreen

Registra transações com tipo, categoria, valor e mês.
Salva no AsyncStorage.
Exibe histórico detalhado com data e categoria.

4. AlertasScreen

Verifica se os gastos ultrapassaram a meta definida.
Exibe alertas com destaque visual.


🖼 Interface

Navegação por Bottom Tab Navigator.
Ícones intuitivos para cada aba:

Dashboard → chart-line
Metas → target
Transações → currency-usd
Alertas → alert-circle




🚀 Possíveis Melhorias Futuras

Implementar autenticação para múltiplos usuários.
Exportar relatórios em PDF ou Excel.
Adicionar notificações push para alertas.
Suporte a sincronização com nuvem.


📌 Observações

Todos os dados são armazenados localmente via AsyncStorage.
O app é totalmente offline.
Ideal para controle financeiro pessoal simples.

🔍 Detalhamento das Lógicas e Implementações
1. DashboardScreen.js
Objetivo: Exibir um gráfico com o histórico de saldos mensais (Entradas - Saídas).
Principais Lógicas:

Carregamento de dados do AsyncStorage:
JavaScriptconst existentes = await AsyncStorage.getItem('transacoes');const lista = existentes ? JSON.parse(existentes) : [];Mostrar mais linhas

Busca todas as transações salvas localmente.


Agrupamento por mês:
JavaScriptlista.forEach(t => {  if (!agrupado[t.mes]) agrupado[t.mes] = { entradas: 0, gastos: 0 };  if (t.tipo === 'entrada') agrupado[t.mes].entradas += t.valor;  if (t.tipo === 'gasto') agrupado[t.mes].gastos += t.valor;});Mostrar mais linhas

Cria um objeto com somatório de entradas e gastos por mês.


Cálculo do saldo:
JavaScriptconst saldos = Object.keys(agrupado).map(m => agrupado[m].entradas - agrupado[m].gastos);Mostrar mais linhas

Renderização do gráfico:

Usa react-native-chart-kit para exibir os saldos.


Atualização automática:

Implementada com useFocusEffect para recarregar dados ao voltar para a tela.




2. AlertasScreen.js
Objetivo: Mostrar alertas quando os gastos ultrapassam a meta definida.
Principais Lógicas:

Busca de transações e metas:
JavaScriptconst transacoesData = await AsyncStorage.getItem('transacoes');const metasData = await AsyncStorage.getItem('metas');Mostrar mais linhas

Verificação de metas excedidas:
JavaScriptmetas.forEach(meta => {  if (meta.tipo === 'saida') {    const gastosMes = transacoes      .filter(t => t.tipo === 'gasto' && t.mes === meta.mes)      .reduce((sum, t) => sum + t.valor, 0);    if (gastosMes > meta.valor) {      novosAlertas.push({ mensagem: `Você ultrapassou a meta...` });    }  }});Mostrar mais linhas

Filtra transações do mês e soma os gastos.
Compara com a meta e gera alerta se excedido.


Exibição:

Usa Card do react-native-paper para mostrar alertas com destaque visual.




3. MetasScreen.js
Objetivo: Permitir definir metas mensais para entradas ou saídas.
Principais Lógicas:

Salvar meta:
JavaScriptconst meta = { tipo, valor: parseFloat(valor), mes };const existentes = await AsyncStorage.getItem('metas');const lista = existentes ? JSON.parse(existentes) : [];lista.push(meta);await AsyncStorage.setItem('metas', JSON.stringify(lista));Mostrar mais linhas

Converte valor para número e salva no AsyncStorage.


Histórico de metas:

Carregado via carregarHistoricoMetas() e exibido em um Dialog.


Seleção dinâmica:

Usa RadioButton.Group para tipo (entrada/saída).
Usa botões para escolher mês.




4. TransacoesScreen.js
Objetivo: Registrar entradas e gastos com categoria, valor e mês.
Principais Lógicas:

Validação:

Verifica se valor foi informado.
Se tipo for gasto, exige categoria.


Salvar transação:
JavaScriptconst transacao = {  tipo,  categoria: tipo === 'gasto' ? categoria : null,  valor: parseFloat(valor),  mes,  data: new Date().toLocaleString(),Mostrar mais linhas

Adiciona data e converte valor para número.


Persistência:

Salva no AsyncStorage e vibra para feedback (Vibration.vibrate(300)).


Histórico:

Exibe todas as transações salvas em um Dialog com scroll.




5. App.js
Objetivo: Configurar navegação e tema.
Principais Lógicas:

Bottom Tab Navigator:

Quatro abas: Dashboard, Metas, Transações, Alertas.


Ícones:

Usa react-native-vector-icons/MaterialCommunityIcons.


Tema:

react-native-paper para estilização consistente.




🔐 Persistência de Dados

AsyncStorage é usado para armazenar:

transacoes: lista de transações.
metas: lista de metas.


Todos os dados são salvos como JSON.


🔄 Fluxo Geral do App

Usuário registra transações → Salvas no AsyncStorage.
Usuário define metas → Salvas no AsyncStorage.
Dashboard lê transações → Calcula saldos → Exibe gráfico.
Alertas lê metas e transações → Verifica excedentes → Exibe alertas.
