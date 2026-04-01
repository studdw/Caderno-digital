## GUIA DE TESTES - Caderno Digital

### ✅ Problemas Corrigidos

1. **Erro SubjectView ao clickar matéria** 
   - ❌ Antes: Página em branco, erro "Cannot read properties of null (Reading 'id')"
   - ✅ Depois: Adicionado loading state e validação para subject null

2. **Dashboard não sincroniza matérias criadas**
   - ❌ Antes: Dashboard mostra matérias antigas dos constants
   - ✅ Depois: Dashboard agora busca matérias do Supabase do usuário logado

3. **SQL SUBJECTS incompleto**
   - ✅ Disponível em: `src/database/migrations/004_create_subjects_table.sql`

---

### 🧪 ROTEIRO DE TESTES

#### TESTE 1: Criar Matéria e Sincronizar no Dashboard
1. Inicie a aplicação (`npm run dev`)
2. Faça login com um usuário
3. Clique em "Nova Matéria" na Sidebar esquerda
4. Preencha:
   - Nome: "Estrutura de Dados"
   - Descrição: "Estudo de listas, árvores e grafos"
   - Ícone: "database"
   - Cor: azul (#3b82f6)
5. Clique "Criar Matéria"
6. **✅ Esperado:**
   - A matéria aparece na Sidebar
   - A matéria aparece no Dashboard
   - Ambas são sincronizadas

#### TESTE 2: Abrir Matéria e Criar Nota
1. Clique em "Estrutura de Dados" na Sidebar
2. **✅ Esperado:**
   - Página carrega normalmente (sem erro 404)
   - Banner com nome da matéria aparece
   - "Total Lessons" mostra 0 notas

3. Clique em "+ New Class/Note"
4. Preencha:
   - Título: "Arrays e Listas Ligadas"
   - Conteúdo: "Diferenças entre arrays e listas ligadas, implementação em Typescript"
   - Tags: "Arrays", "LinkedList"
5. Clique "Save Note"
6. **✅ Esperado:**
   - Modal fecha
   - Nota aparece na página
   - "Total Lessons" se atualiza para 1

#### TESTE 3: Múltiplos Usuários
1. Crie um novo usuário (botão Register)
2. Faça login com o novo usuário
3. Crie uma matéria diferente (ex: "Algoritmos")
4. **✅ Esperado:**
   - Novo usuário vê apenas suas matérias (não vê "Estrutura de Dados")
   - Dashboard mostra apenas as matérias do novo usuário
   - Quando volta ao primeiro usuário, vê suas matérias originais

#### TESTE 4: Deletar Nota
1. Na matéria, hover sobre uma nota
2. Clique no ícone de lixeira ❌
3. **✅ Esperado:**
   - Nota desaparece
   - "Total Lessons" diminui

#### TESTE 5: Verificar Persistência
1. Refresh a página (F5)
2. **✅ Esperado:**
   - Matérias continuam visíveis
   - Notas continuam visíveis
   - Dados estão salvos no Supabase

---

### ⚙️ PASSO A PASSO SE HOUVER ERRO 404

Se ao clicar na matéria ainda receber erro 404:

1. Verifique se a tabela `subjects` existe no Supabase
2. Se não existir, execute no SQL Editor do Supabase:

```sql
-- COPIE E COLE NO SQL EDITOR DO SUPABASE

CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own subjects" ON public.subjects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subjects" ON public.subjects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subjects" ON public.subjects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own subjects" ON public.subjects
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger to update updated_at
CREATE TRIGGER set_updated_at_subjects
  BEFORE UPDATE ON public.subjects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
```

3. Clique "Run"
4. Refresh a aplicação e tente novamente

---

### 📊 CHECKLIST FINAL

- [ ] SubjectView abre sem erro de null
- [ ] Dashboard mostra matérias criadas (não as antigas)
- [ ] Notas são salvas no Supabase
- [ ] Notas aparecem na matéria correta
- [ ] Cada usuário vê apenas suas matérias
- [ ] Dados persistem após refresh
- [ ] Sidebar sincroniza com banco de dados
- [ ] Botões de criar/deletar funcionam

---

### 🚀 PRÓXIMAS FEATURES (Opcional)

- [ ] Editar matérias
- [ ] Editar notas
- [ ] Categorias/tags para matérias
- [ ] Busca de notas
- [ ] Importar/exportar notas
