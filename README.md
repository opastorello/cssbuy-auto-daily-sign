# CSSBuy Auto Daily Sign

Registra automaticamente a presença diária no CSSBuy assim que a página carrega.

- **Autor:** Nícolas Pastorello ([@opastorello](https://github.com/opastorello))
- **Versão:** 1.0
- **Compatível com:** [Tampermonkey](https://www.tampermonkey.net/)/[Greasemonkey](https://www.greasespot.net/)
- **URL alvo:** `https://www.cssbuy.com/web/user*`

> ⚠️ É necessário estar logado no CSSBuy. O script apenas dispara o endpoint oficial de “sign” da própria plataforma após o `load` da página.

## Instalação

1. Instale a extensão:
   - **Tampermonkey** (recomendado) para Chrome/Edge/Brave/Firefox.
2. Clique em **Criar novo script** no Tampermonkey.
3. Cole o conteúdo do arquivo [`cssbuy-auto-daily-sign.user.js`](./cssbuy-auto-daily-sign.user.js) e salve.
4. Acesse `https://www.cssbuy.com/web/user` já **logado**.  
   Você verá toasts e logs no console confirmando o resultado.

## Como funciona

- Ao carregar a página, o script:
  1. Calcula `year` e `month` atuais.
  2. Envia `POST` para `https://www.cssbuy.com/web/usersign/sign` com `application/x-www-form-urlencoded`.
  3. Exibe toasts de sucesso/aviso/erro e logs no console.

### Respostas tratadas
- `success: true` → **Presença confirmada** ✅  
- `success: false` → **Já registrado hoje** ⚠️  
- Outras respostas → **Inesperada** (checar console) 🧐

## Desenvolvimento

- Abra o DevTools (F12) para ver os logs com prefixo `[CSSBUY]`.
- O sistema de **toast** é simples e não intrusivo (remove-se sozinho após alguns segundos).
- Ajustes visuais: edite as cores em `toast(msg, bg)`.

## Segurança & Privacidade

- O script roda **somente** em `https://www.cssbuy.com/web/user*`.
- As requisições usam `credentials: 'same-origin'` (cookies do seu navegador).

## Licença

Este projeto está licenciado sob a [MIT License](./LICENSE).
