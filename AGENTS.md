# AGENTS.md

Guia rapido para agentes de codigo neste repositorio MatriX.

## Escopo do projeto
- Monorepo com duas apps separadas:
- `backend/`: API Node.js + Express (CommonJS), porta padrao `5000`.
- `frontend/`: Vite + React + Bootstrap.

## Comandos essenciais
- Backend:
- `cd backend && npm install`
- `cd backend && npm run dev`
- Frontend:
- `cd frontend && npm install`
- `cd frontend && npm run dev`
- `cd frontend && npm run build`
- `cd frontend && npm run lint`

## Arquitetura e limites
- API backend inicial em `backend/src/server.js`.
- Config de banco MySQL em `backend/src/config/db.js` via variaveis de ambiente (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`).
- Cliente HTTP frontend centralizado em `frontend/src/services/api.js` (baseURL `http://localhost:5000`).
- UI principal em `frontend/src/App.jsx` e componentes em `frontend/src/components/`.

## Convencoes praticas
- Preserve o estilo atual por arquivo (sem reformatacao ampla).
- Em React, mantenha componentes funcionais e evite mudancas estruturais grandes sem pedido explicito.
- Ao alterar integracao API, prefira ajustar primeiro `frontend/src/services/api.js` e depois pontos de consumo.

## Regra obrigatoria de commit deste repositorio
- Sempre que o usuario pedir para "realizar commit", interprete como:
- Fazer `git commit` e em seguida `git push` para o remoto.
- Fornecer a descricao do commit em portugues e com letras minusculas.

## Observacoes
- `backend/index.js` existe, mas o servidor atual roda por `backend/src/server.js` no script `dev`.
- Nao ha suite de testes configurada no backend no momento.