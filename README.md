Smart Inventory
Smart Inventory é uma plataforma integrada (Web e Mobile) para gestão preventiva de
estoque, focada na redução de desperdício de alimentos através do monitoramento inteligente
de datas de validade e lotes.
O que é?
Como regra da instituição, este TCC foi desenvolvido para resolver uma necessidade real de
mercado. Identificamos que a perda de produtos por vencimento é um problema crítico em
pequenos e médios mercados, representando cerca de 24% das perdas no varejo brasileiro
(ABRAPPE/KPMG).
O projeto foi concebido para transformar a gestão de estoque manual e falha em um processo
automatizado, garantindo que nenhum produto passe da validade na prateleira por falta de
visibilidade.
Identificamos que era necessário um sistema que tenha:
● Controle de Lotes: Vincular itens a datas de fabricação e vencimento.
● Prevenção de Perdas: Identificar antecipadamente produtos próximos ao vencimento.
● Cálculo de Risco: Saber exatamente o valor financeiro em risco no estoque.
● Agilidade no Registro: Cadastrar produtos via código de barras para evitar erros
manuais.

Depois de discussões sobre como resolveriamos essas necessidades, fizemos os
prímeiro protótipo:
https://smart-inventory-p5oe.vercel.app/

Demonstração
Funcionalidade:
● O sistema deve permitir o cadastro de um administrador que terá acesso a relatórios e
cadastro de colaboradores
● O colaborador terá acesso a operações CRUD e Vendas de produtos.
● O sistema deve permitir o cadastro automatizado de produtos por meio da leitura via
webcam ou dispositivo móvel, realizando o preenchimento automático do SKU, a fim de
reduzir erros manuais e agilizar o processo de registro.
● O sistema deve possibilitar a vinculação entre item e lote, incluindo obrigatoriamente as
datas de fabricação e vencimento, garantindo rastreabilidade e controle adequado do
estoque.
● O sistema deve aplicar o método FEFO (First Expire, First Out), priorizando a baixa de
produtos com vencimento mais próximo, independentemente da ordem de entrada no
estoque.

● O sistema deve apresentar alertas visuais para indicar a proximidade do vencimento dos
produtos.
● O sistema deve disponibilizar um painel de controle que calcule o risco financeiro
associado aos produtos críticos, por meio da soma da quantidade multiplicada pelo custo
unitário.
● O sistema deve sugerir automaticamente a aplicação de descontos para lotes
classificados como críticos, com o objetivo de reduzir perdas por vencimento.
● O sistema deve gerar relatórios contendo o histórico de produtos cujo vencimento foi
evitado por meio de ações preventivas, contribuindo para práticas sustentáveis alinhadas
ao ODS 12.
● Gráfico interativo visual com demonstração estatística situacional dos produtos.
● Listagem resumida de produtos com nível de prioridade, dívidas em “críticas” e em
“alerta”.
● Rápido acesso ao estoque através de ícone interativo na listagem de produtos do
dashboard inicial.
Operacional
● Cadastro Automatizado: Leitura de SKU via webcam ou dispositivo móvel (ZXing).
● Regra de Consistência (RN01): Bloqueio de cadastros com data de vencimento
retroativa.
● Gráficos Interativos: Demonstração estatística da situação real dos produtos.
Quais tecnologias foram usadas?
TypeScript e Tailwind CSS (Interface responsiva e tipagem segura),
Node.js (Processamento escalável de regras de negócio),
Axios (Consumo de APIs) e ZXing (Scan de códigos de barras).
Como executar o projeto?

O módulo next/font otimiza automaticamente suas fontes e remove requisições de rede
externas para melhorar a privacidade e o desempenho.
Ele inclui auto-hospedagem integrada para qualquer arquivo de fonte. Isso significa que você
pode carregar fontes da web de forma otimizada e sem mudanças de layout (Layout Shift).
Para começar a usar o next/font, importe-o de next/font/local ou next/font/google, chame-o
como uma função com as opções apropriadas e defina a className do elemento ao qual você
deseja aplicar a fonte
As fontes são aderadas ao componente em que são usadas. Para aplicar uma fonte a todo o
seu aplicativo, adicione-a ao Layout Raiz.
Você pode auto-hospedar automaticamente qualquer Fonte do Google. As fontes são incluídas
armazenadas como ativos estáticos e servidas a partir do mesmo domínio que sua

implantação, o que significa que nenhuma solicitação é enviada ao Google pelo navegador
quando o usuário visita seu site.
Para começar a usar uma fonte do Google, importe a fonte escolhida do next/font/google.
Recomendamos o uso de fontes variáveis para o melhor desempenho e flexibilidade. Mas se
você não puder usar uma fonte variável, precisará especificar um peso. Para usar uma fonte
local, importe a função localFont de next/font/local e especifique o src do seu arquivo de fonte
local. O caminho é resolvido de forma relativa ao arquivo onde o localFont é chamado. As
fontes podem ser armazenadas em qualquer lugar do projeto, incluindo a pasta public ou
localizadas dentro da pasta app. Por exemplo, para usar uma fonte armazenada em app/fonts.
Github: https://github.com/cnrnival/smart-inventory

Avisos
1. Esse projeto não está 100% completo, portanto não use-o em produção sem ter
feito uma boa revisão.
2. Todos os dados disponíveis aqui são para fins de testes e não refletem
informações reais ou válidas propositalmente.