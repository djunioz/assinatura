# Gerador de Assinatura de E-mail

Uma aplicação web moderna para gerar assinaturas profissionais de e-mail para o Microsoft Outlook.

## 🎯 Funcionalidades

- ✅ Formulário com campos: Nome, E-mail, Telefone e Departamento
- ✅ Conversão automática de departamento para inglês
- ✅ Pré-visualização em tempo real da assinatura
- ✅ Geração de HTML formatado para o Outlook
- ✅ Cópia automática para a área de transferência
- ✅ Logotipo configurável centralmente
- ✅ Interface responsiva e profissional

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework UI moderno
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Estilização utilitária
- **Vite** - Build tool rápido e moderno

## 📦 Instalação

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔧 Configuração

### Alterar o Logotipo

Edite o arquivo `src/config/branding.ts`:

```typescript
export const brandingConfig = {
  logoUrl: 'https://seu-site.com/logo.png',  // ← Altere aqui
  company: 'Sua Empresa',
  // ... outras configurações
}
```

### Adicionar/Remover Departamentos

Edite `src/utils/departmentTranslations.ts` para adicionar novos departamentos e suas traduções para o inglês.

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes React
│   ├── SignatureForm.tsx
│   ├── SignaturePreview.tsx
│   └── App.tsx
├── config/            # Configurações centralizadas
│   └── branding.ts
├── utils/             # Funções utilitárias
│   ├── signatureGenerator.ts
│   └── departmentTranslations.ts
├── main.tsx
├── App.tsx
└── index.css
```

## 💡 Como Usar

1. Preencha todos os campos do formulário
2. Clique em "Gerar e Copiar Assinatura"
3. Abra o Microsoft Outlook
4. Vá em **File → Options → Mail → Signatures**
5. Cole a assinatura
6. Salve as alterações

## 🎨 Personalização

### Cores Corporativas

Edite `src/config/branding.ts`:

```typescript
export const brandingConfig = {
  primaryColor: '#003366',    // Cor principal
  accentColor: '#0066CC',     // Cor de destaque
  // ...
}
```

### Estilo da Assinatura

Modifique a função `generateSignatureHTML()` em `src/utils/signatureGenerator.ts`.

## 📝 Licença

Projeto desenvolvido para uso interno.
