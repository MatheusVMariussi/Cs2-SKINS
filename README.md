# MinhasSkins - Marketplace de Skins de Counter-Strike

Este projeto é um sistema web completo para anúncios de skins de Counter-Strike, implementado com React no frontend, Node.js com Express no backend e MySQL como banco de dados.

## 🚀 Deploy

**Link:** [https://cs2-skins-matheusvmariussis-projects.vercel.app/](https://cs2-skins-matheusvmariussis-projects.vercel.app/)

## ✨ Funcionalidades

-   Listagem de anúncios de skins com paginação.
-   Filtragem por arma, raridade e faixa de preço.
-   Visualização detalhada de cada skin.
-   Cadastro de novas skins para venda.
-   Edição e exclusão de anúncios existentes.

## 🛠️ Tecnologias Utilizadas

#### **Frontend**

-   React
-   React Router
-   Axios
-   Tailwind CSS

#### **Backend**

-   Node.js
-   Express
-   MySQL2
-   CORS
-   Dotenv

## ⚙️ Como Executar Localmente

### **Pré-requisitos**

-   **Node.js** (versão 14 ou superior)
-   **npm**
-   Um servidor **MySQL** rodando (localmente ou na nuvem).

### **Passos**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/MatheusVMariussi/Cs2-SKINS.git](https://github.com/MatheusVMariussi/Cs2-SKINS.git)
    cd Cs2-SKINS
    ```

2.  **Instale todas as dependências:**
    Na raiz do projeto, rode o comando abaixo. Ele instalará as dependências tanto do `frontend` quanto do `backend`.
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente do Backend:**
    a. Navegue até a pasta do backend: `cd backend`.
    b. Crie um arquivo `.env` e preencha com as credenciais do seu banco de dados MySQL:
    ```env
    # backend/.env
    DB_HOST=seu_host_do_banco
    DB_USER=seu_usuario_do_banco
    DB_PASSWORD=sua_senha_do_banco
    DB_NAME=minhas_skins
    DB_SSL_CA=`-----BEGIN CERTIFICATE-----\n...SEU_CERTIFICADO_AQUI...\n-----END CERTIFICATE-----`
    ```
    c. Volte para a raiz do projeto: `cd ..`

4.  **Configure o Banco de Dados:**
    Importe o arquivo `database/minhas_skins_anuncios.sql` para o seu servidor MySQL para criar as tabelas e popular com os dados iniciais.

5.  **Inicie a Aplicação (Frontend + Backend):**
    Na **raiz do projeto**, rode o comando:
    ```bash
    npm run dev
    ```
    Isso iniciará o frontend em `http://localhost:3000` e o backend em `http://localhost:3001` simultaneamente.

## ☁️ Deploy (Vercel)

Este projeto está configurado para deploy contínuo na [Vercel](https://vercel.com/).

1.  Importe o projeto na Vercel a partir do seu repositório Git.
2.  A Vercel usará o arquivo `vercel.json` na raiz para configurar os builds e o roteamento automaticamente.
3.  Configure as Variáveis de Ambiente no painel da Vercel (Settings -> Environment Variables) com as mesmas chaves e valores do seu arquivo `.env` para conectar ao banco de dados em produção.

## ✒️ Autor

Matheus Vinicius Mariussi
