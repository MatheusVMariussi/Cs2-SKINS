MinhasSkins - Marketplace de Skins de Counter-Strike
Este projeto é um sistema web completo para anúncios de skins de Counter-Strike, implementado com React no frontend, Node.js com Express no backend e MySQL como banco de dados.

🚀 Deploy
[https://cs2-skins-matheusvmariussis-projects.vercel.app/]

✨ Funcionalidades
Listagem de anúncios de skins com paginação.

Filtragem por arma, raridade e faixa de preço.

Visualização detalhada de cada skin.

Cadastro de novas skins para venda.

Edição e exclusão de anúncios existentes.

🛠️ Tecnologias Utilizadas
Frontend
React

React Router

Axios

Tailwind CSS

Backend
Node.js

Express

MySQL2

CORS

Dotenv

⚙️ Como Executar Localmente

Pré-requisitos
Node.js (versão 14 ou superior)

npm

Um servidor MySQL rodando (localmente ou na nuvem).

Passos
Clone o repositório:

Bash

git clone https://github.com/MatheusVMariussi/Cs2-SKINS.git
cd Cs2-SKINS
Instale todas as dependências:
Na raiz do projeto, rode o comando abaixo. Ele instalará as dependências tanto do frontend quanto do backend.

Bash

npm install
Configure as Variáveis de Ambiente do Backend:
a. Navegue até a pasta do backend: cd backend.
b. Crie uma cópia do arquivo .env.example (se não existir, crie-o) e renomeie para .env.
c. Preencha o arquivo .env com as credenciais do seu banco de dados MySQL:

Snippet de código

# backend/.env

DB_HOST=seu_host_do_banco
DB_USER=seu_usuario_do_banco
DB_PASSWORD=sua_senha_do_banco
DB_NAME=minhas_skins
DB_SSL_CA=seu_certificado

d. Volte para a raiz do projeto: cd ..

Configure o Banco de Dados:
Importe o arquivo database/minhas_skins_anuncios.sql para o seu servidor MySQL para criar as tabelas e popular os dados iniciais.

Inicie a Aplicação (Frontend + Backend):
Na raiz do projeto, rode o comando:

Bash

npm run dev
Isso iniciará o frontend em http://localhost:3000 e o backend em http://localhost:3001 simultaneamente.

☁️ Deploy (Vercel)
Este projeto está configurado para deploy contínuo na Vercel.

Importe o projeto na Vercel a partir do seu repositório Git.

A Vercel usará o arquivo vercel.json na raiz para configurar os builds e o roteamento automaticamente.

Configure as Variáveis de Ambiente no painel da Vercel (Settings -> Environment Variables) com as mesmas chaves e valores do seu arquivo .env para conectar ao banco de dados em produção.

✒️ Autor
Matheus Vinicius Mariussi
