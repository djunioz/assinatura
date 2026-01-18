# Gerador de Assinatura de E-mail

## Como abrir no navegador

Você pode abrir o arquivo `index.html` diretamente no navegador, iniciar um servidor local simples, ou hospedar via GitHub Pages.

### Opção 1 — abrir o arquivo diretamente

1. Baixe o repositório (botão **Code** > **Download ZIP** no GitHub) e descompacte.
2. Abra o arquivo `index.html` com o navegador de sua preferência.

### Opção 2 — servidor local (recomendado)

1. Baixe o repositório (botão **Code** > **Download ZIP** no GitHub) e descompacte.
2. No terminal, dentro da pasta do projeto, execute:

```bash
python -m http.server 8000
```

3. Em seguida, acesse no navegador:

```
http://localhost:8000
```

### Opção 3 — hospedagem no GitHub Pages

1. No repositório do GitHub, vá em **Settings** > **Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch `main` (ou a branch em uso) e a pasta `/root`.
4. Salve e aguarde o link público gerado.
5. Acesse a URL exibida em **Pages** para ver a aplicação publicada.

#### Solução para erro 404 no GitHub Pages

Se aparecer a página 404 do GitHub Pages, confira:

1. **Arquivo `index.html` na raiz do repositório**: o GitHub Pages precisa desse arquivo na pasta configurada (ex.: `/root`).
2. **Branch correta**: em **Settings > Pages**, selecione exatamente a branch onde o `index.html` está.
3. **Pasta correta**: use `/root` (padrão) quando o `index.html` estiver na raiz.
4. **Tempo de publicação**: após salvar, pode levar alguns minutos até o link funcionar.
