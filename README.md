# MinhasSkins - Marketplace de Skins de CS2

Este projeto é um sistema web completo para anúncios de skins de Counter-Strike 2. Ele utiliza uma arquitetura **Monorepo** moderna, combinando um frontend rápido em **React + Vite** com um backend serverless em **Node.js**, utilizando **Supabase** para banco de dados (PostgreSQL) e autenticação.

## 🚀 Deploy

**Acesse o projeto online:**
[https://cs2-skins-nine.vercel.app](https://cs2-skins-nine.vercel.app)

## ✨ Funcionalidades

  * **Autenticação Segura:** Sistema de Login e Cadastro utilizando Supabase Auth.
  * **Gestão de Anúncios:**
      * Listagem pública de skins com paginação e filtros (Arma, Raridade, Preço).
      * Criação de anúncios (Apenas usuários logados).
      * Edição e Exclusão (Protegido: apenas o dono do anúncio pode alterar).
  * **Segurança de Dados:** Uso de RLS (Row Level Security) no banco de dados para garantir que usuários só modifiquem seus próprios dados.
  * **Interface Responsiva:** Design moderno construído com Tailwind CSS.

## 🛠️ Tecnologias Utilizadas

### Frontend

  * **React 18** (Migrado de CRA para Vite para maior performance).
  * **Vite** (Build tool e servidor de desenvolvimento).
  * **Tailwind CSS** (Estilização).
  * **Supabase JS Client** (Integração com Auth).

### Backend & Dados

  * **Node.js & Express** (API RESTful).
  * **Supabase (PostgreSQL)** (Banco de dados relacional e Autenticação).
  * **Vercel Serverless Functions** (Hospedagem do Backend).

### Arquitetura (Monorepo)

O projeto segue uma estrutura de Monorepo para facilitar o deploy unificado na Vercel:

```text
/
├── frontend/     # Aplicação React (Vite)
├── backend/      # API Node.js (Express)
└── vercel.json   # Configuração de roteamento (Rewrites)
```

## ☁️ Deploy na Vercel

O projeto possui um arquivo `vercel.json` configurado para direcionar o tráfego:

  * Rotas `/api/*` → Redirecionadas para o Backend (Serverless).
  * Outras rotas → Servidas pelo Frontend (Static Build).

## ✒️ Autor

**Matheus Vinicius Mariussi**