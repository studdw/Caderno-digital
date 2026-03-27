## 🚀 Executando o projeto localmente

**Pré-requisitos:** Node.js, conta no Supabase

1. Instale as dependências:

   ```
   npm install
   ```

2. Configure o Supabase:

   * Crie um projeto em: https://supabase.com
   * Vá em **Settings > API** para pegar sua URL e chave anônima
   * Crie um arquivo `.env.local` na raiz do projeto com:

     ```
     VITE_SUPABASE_URL=https://seu-projeto.supabase.co
     VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
     GEMINI_API_KEY=sua-chave-gemini-aqui
     ```

3. Configure o banco de dados:

   * Acesse o Supabase > **SQL Editor**
   * Execute o script localizado em:

     ```
     src/database/schema.sql
     ```
   * Isso criará as tabelas e regras de segurança (RLS)

4. Rode o projeto:

   ```
   npm run dev
   ```

---

## ⚠️ Observações importantes

* **Sem configurar o Supabase**: o app exibirá uma mensagem de configuração (não ficará em branco)
* **Banco obrigatório**: execute o script SQL antes de testar autenticação
* **Verificação de email**: o Supabase exige confirmação para novos usuários

---

## 🔐 Autenticação

O projeto utiliza **Supabase Auth**, com suporte a:

* Cadastro de usuários com verificação de email
* Login e logout
* Rotas protegidas
* Perfis de usuário com usernames únicos

---

## 🗄️ Estrutura do banco de dados

* `auth.users`: gerenciado automaticamente pelo Supabase
* `user_profiles`: tabela customizada com username e timestamps

