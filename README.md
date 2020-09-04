# App-React-Empresas
App-React-Empresas
## Estrutura
 - assets: Para armazenar os recursos do proejto. Ex: Imagens.
 - components: Pasta onde foram colocados os componentes reutilizáveis da aplicação. Ex: Botões e Cards
 - services: Onde axios foi configurado, através dele foram feitas as requisiçãoes HTTPs. 
 - theme: Onde foram configuradas algumas constante relacionas ao estilo do app. Ex: tamanhos de fonte padrão e cores.
 - views: Onde foram criadas as telas do sistema. Ex: Login e Home.

## Bibliotecas
- @react-native-community/async-storage: Para armazenar as informações como access_token localmente.
- react-navigation: Para prover a navegação entre telas e sistema de rotas do app.
- axios: Cliente HTTP usado para fazer requisições na API disponibilizada.
- debounce: Usado para dar o intervalo na busca, para evitar que seja feita uma requisição na API a cada letra digitada.
- react-native-vector-icons: Biblioteca de ícones usada na aplicação desenvolvida.

## Configuração de Ambiente e Execução do Projeto
 Para configurar o ambiente no windows ou ubuntu, recomendo este tutorial: https://medium.com/@pedroaugusto466/configurando-ambiente-de-desenvolvimento-para-react-native-4049709654ed
 
 Para rodar o projetoa, navegue até a pasta raiz do projeto (Empresas)
 
  - Execute o comando **yarn** para instalar as dependencias do projeto.
  - Execute o comando **react-native run-android** para rodar o projeto no android.
	
