# CMS-Backend

Backend para o sistema de gerenciamento de clientes da Facilita Jurídico, parte do projeto ClientManagementSystem.

## Configuração do Ambiente de Desenvolvimento

- Inicialização do projeto Node.js com npm.
- Definição das informações básicas no `package.json`, incluindo:
  - Nome do projeto: cms-backend
  - Versão: 1.0.0
  - Descrição: Backend para o sistema de gerenciamento de clientes da Facilita Jurídico.
  - Ponto de entrada: app.ts
  - Comando de teste: jest
  - Palavras-chave: nodejs, express, backend, client-management
  - Autor: Victor Gois Vieira
  - Licença: MIT

## Estruturação do Projeto

A estrutura do projeto foi definida da seguinte forma:

- **src/**
  - **core/** - Para entidades e casos de uso (useCases).
  - **impl/** - Para controllers e serviços.
  - **infra/** - Para gateways, repositórios e configurações de banco de dados.
- **tests/** - Diretório para armazenar testes.
- Arquivo inicial `app.ts` configurado para iniciar o servidor Express.

[← Voltar para a raiz do projeto](../README.md)
