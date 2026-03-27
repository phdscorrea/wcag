# Guia de Boas Práticas em Design Instrucional Acessível na EaD

Projeto estruturado e otimizado para máxima manutenibilidade, acessibilidade e performance.

---

## 📁 Estrutura do Projeto

```
wcag-main/
├── index.html              # Arquivo HTML principal (estrutura semântica)
├── styles.css              # Estilos CSS (responsivo, otimizado)
├── script.js               # JavaScript (funcionalidades e interatividade)
├── config.json             # Configurações do site (metadados, navegação, cores)
├── README.md               # Este arquivo (documentação)
├── images/                 # Pasta para imagens (a criar conforme necessário)
│   ├── acessibilidade_design_visual.png
│   ├── contraste_cores.png
│   ├── fontes_legiveis.png
│   └── espacamento_visual.jpg
└── docs/                   # Documentação adicional (opcional)
```

---

## ✨ Características Principais

✅ **Separação de Responsabilidades**: HTML (estrutura), CSS (estilo), JS (comportamento)
✅ **Responsivo**: Compatível com todas as resoluções (desktop, tablet, mobile)
✅ **Acessível**: WCAG 2.1 AA - navegação por teclado, contraste, semântica
✅ **Otimizado**: Variáveis CSS, código modular, performance
✅ **Configurável**: Arquivo JSON centralizando configurações
✅ **Manutenível**: Código limpo, comentado e bem organizado

---

## 🎯 Guia de Uso

### Abrir o Site
1. Abra o arquivo `index.html` em um navegador
2. Navegue usando os links do menu superior
3. Use a navegação por teclado (Tab, Enter, Setas)

### Estrutura do HTML

O HTML está organizado em seções semânticas:
- `<header>` - Cabeçalho com título
- `<nav>` - Navegação principal (sticky e responsiva)
- `<main>` - Conteúdo principal
- `<section>` - Seções de conteúdo (7 seções temáticas)
- `<footer>` - Rodapé com informações

### Variáveis CSS

As cores, espaçamento e outras propriedades estão centralizadas em `:root`:

```css
:root {
    --color-primary: #667eea;
    --color-secondary: #764ba2;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* ... mais variáveis */
}
```

Para alterar a paleta de cores, modifique apenas estas variáveis.

### Arquivo JSON (config.json)

Contém todas as configurações:
- Informações do site (título, autor, ano)
- Estructura da navegação
- Cores e tipografia
- Pontos de quebra responsiva (breakpoints)
- Features habilitadas/desabilitadas

**Uso futuro**: Este arquivo pode ser consumido por JavaScript para dinâmica de navegação.

### Funcionalidades JavaScript

O arquivo `script.js` gerencia:

1. **Navegação Sticky com Hide/Show**: Barra de navegação desaparece ao rolar para baixo
2. **Menu Mobile**: Toggle responsivo para dispositivos pequenos
3. **Link Ativo**: Destaca a seção atual no menu
4. **Scroll Suave**: Navegação com scroll suave entre seções
5. **Acessibilidade**: Suporte total a teclado e leitores de tela

---

## 🎨 Personalização

### Alterar Cores
Edite `styles.css` - seção `:root`:
```css
--color-primary: #667eea;      /* Azul */
--color-secondary: #764ba2;    /* Roxo */
```

### Adicionar Novas Seções
1. Adicione no `config.json` em `navigation.sections`
2. Crie a seção no HTML com `id` correspondente
3. As funcionalidades JS funcionarão automaticamente

### Modificar Layout
- **Largura máxima**: `--container-max-width: 1200px` em `:root`
- **Espaçamento**: Ajuste `--section-padding`, `--card-padding`, etc.
- **Breakpoints**: Modifique em `@media` queries

---

## 📱 Responsividade

O projeto suporta 3 breakpoints:

| Dispositivo | Largura | Comportamento |
|-------------|---------|---|
| **Desktop** | > 768px | Menu horizontal, layout completo |
| **Tablet** | 768px | Menu mobile (toggle) |
| **Móvel** | < 480px | Fonte reduzida, espaçamento ajustado |

---

## ♿ Acessibilidade

### WCAG 2.1 AA Implementado

✅ **Contraste**: Mínimo 4.5:1 para texto normal
✅ **Navegação por Teclado**: Todos os elementos são acessíveis via Tab
✅ **Foco Visível**: Indicador azul de foco em elementos interativos
✅ **Semântica**: Uso correto de `<header>`, `<nav>`, `<main>`, `<section>`
✅ **Imagens**: Atributos `alt` descritivos em todas as imagens
✅ **Tabelas**: Estrutura correta com `<thead>` e `<tbody>`
✅ **Cores**: Não é a única forma de transmitir informação
✅ **Text-Resize**: Suporte a zoom até 200%

### Testar Acessibilidade

1. **Navegação por teclado**: Use Tab, Shift+Tab, Enter
2. **Leitor de tela**: Teste com NVDA (free) ou JAWS
3. **Verificador WAVE**: https://wave.webaim.org/
4. **Verificador de Contraste**: https://webaim.org/resources/contrastchecker/

---

## 🚀 Performance

### Otimizações Implementadas

✅ **CSS Minificado**: Pronto para minificação em produção
✅ **JavaScript Modular**: Objeto `app` centraliza lógica
✅ **Sem Dependências Externas**: Apenas HTML, CSS, JS vanilla
✅ **Lazy Loading**: Preparado para adicionar carregamento lento de imagens
✅ **Smooth Scrolling**: Usa `scroll-behavior: smooth`

### Dicas de Performance

1. Minifique `styles.css` e `script.js` antes de deploy
2. Comprima imagens (use WebP com fallback PNG)
3. Use cache de navegador para arquivos estáticos
4. Considere usar um CDN para distribuição global

---

## 📐 Componentes Reutilizáveis

### Cards
```html
<div class="card">
    <h4>Título</h4>
    <p>Conteúdo do card</p>
</div>
```

### Tabelas
```html
<div class="table-container">
    <table>
        <thead><tr><th>Cabeçalho</th></tr></thead>
        <tbody><tr><td>Dados</td></tr></tbody>
    </table>
</div>
```

### Botões
```html
<button class="btn">Clique aqui</button>
<a href="#" class="btn">Link como botão</a>
```

### Listas Estilizadas
```html
<ul class="styled-list">
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
```

### Destaque
```html
<div class="highlight-section">
    <h3>Título importante</h3>
    <p>Conteúdo em destaque</p>
</div>
```

---

## 🔧 Manutenção

### Adicionar Novas Imagens
1. Salve em pasta `images/`
2. Use em HTML: `<img src="images/nome.jpg" alt="descrição">`
3. Adicione comentário de descrição no `config.json` se relevante

### Atualizar Conteúdo
1. Edite o `index.html` diretamente
2. Use elementos semânticos (`<h2>`, `<h3>`, `<p>`)
3. Mantenha a estrutura das seções

### Debugging
- Abra DevTools (F12) e verifique Console
- Use `inspect element` para debug de CSS
- Teste com Firefox, Chrome e Safari

---

## 📋 Checklist de Deploy

Antes de publicar:

- [ ] Verificar se todas as imagens estão presentes
- [ ] Testar navegação em mobile
- [ ] Validar HTML (validator.w3.org)
- [ ] Testar links internos e externos
- [ ] Verificar acessibilidade (wave.webaim.org)
- [ ] Minificar CSS e JS
- [ ] Otimizar imagens
- [ ] Testar em navegadores antigos (IE11+)
- [ ] Verificar performance (pagespeed.web.dev)

---

## 📚 Recursos Úteis

### Acessibilidade
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM: https://webaim.org/
- WAVE Tool: https://wave.webaim.org/

### Performance
- Google PageSpeed: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/

### Validação
- HTML Validator: https://validator.w3.org/
- CSS Validator: https://jigsaw.w3.org/css-validator/

### Design
- Color Blindness Simulator: https://www.color-blindness.com/coblis-color-blindness-simulator/
- Responsive Design Tester: https://responsively.app/

---

## 👤 Informações do Projeto

- **Título**: Guia de Boas Práticas em Design Instrucional Acessível na EaD
- **Objetivo**: Promover inclusão e qualidade no ensino a distância
- **Origem**: Dissertação de Mestrado - UFAM
- **Ano**: 2024
- **Padrão**: WCAG 2.1 AA

---

## 📝 Licença

Projeto educacional da Universidade Federal do Amazonas (UFAM).

---

## 🤝 Contribuições e Sugestões

Para melhorias ou sugestões:
1. Verifique se a mudança não quebra acessibilidade
2. Mantenha a separação de responsabilidades (HTML/CSS/JS)
3. Atualize este README se necessário
4. Teste em múltiplos navegadores e dispositivos

---

**Última atualização**: Março de 2024  
**Versão**: 2.0 (Refatorada e Otimizada)
