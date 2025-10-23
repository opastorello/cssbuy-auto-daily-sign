// ==UserScript==
// @name         CSSBuy Auto Daily Sign
// @namespace    https://github.com/opastorello
// @version      1.0
// @description  Registra automaticamente a presença diária no CSSBuy assim que a página carrega.
// @author       Nícolas Pastorello
// @match        https://www.cssbuy.com/*
// @icon         https://www.cssbuy.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const log = (msg, type = 'info') => {
        const styles = {
            info: 'color:#2196f3;font-weight:bold;',
            success: 'color:#4caf50;font-weight:bold;',
            warn: 'color:#ff9800;font-weight:bold;',
            error: 'color:#f44336;font-weight:bold;'
        };
        console.log('%c[CSSBUY]%c ' + msg, styles[type] || styles.info, 'color:inherit;');
    };

    const toast = (msg, bg = '#2196f3') => {
        let cont = document.getElementById('toastContainer');
        if (!cont) {
            cont = document.createElement('div');
            cont.id = 'toastContainer';
            Object.assign(cont.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                zIndex: '99999'
            });
            document.body.appendChild(cont);
        }
        const box = document.createElement('div');
        box.textContent = msg;
        Object.assign(box.style, {
            background: bg,
            color: '#fff',
            padding: '12px 18px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            opacity: '0',
            transform: 'translateY(-10px)',
            transition: 'opacity 0.5s, transform 0.5s'
        });
        cont.appendChild(box);
        requestAnimationFrame(() => {
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(-10px)';
            setTimeout(() => box.remove(), 500);
        }, 4000);
    };

    function registrarPresenca() {
        const now = new Date();
        const ano = now.getFullYear();
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const data = new URLSearchParams({ year: ano, month: mes });

        fetch('https://www.cssbuy.com/web/usersign/sign', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-requested-with': 'XMLHttpRequest'
            },
            body: data.toString()
        })
        .then(async res => {
            const text = await res.text();
            let json = {};
            try { json = JSON.parse(text); } catch {}

            if (json && json.success === false) {
                log('A presença de hoje já foi registrada anteriormente.', 'warn');
            } else if (json && json.success === true) {
                log('Presença diária registrada com sucesso!', 'success');
                toast('Presença diária confirmada com sucesso!', '#4caf50');
            } else {
                log('Resposta inesperada do servidor.', 'warn');
                toast('Resposta inesperada, verifique o console (F12).', '#9c27b0');
            }
        })
        .catch(err => {
            log('Erro ao registrar presença: ' + err.message, 'error');
            toast('Erro ao registrar presença.', '#f44336');
        });
    }

    window.addEventListener('load', () => {
        log('Presença Diária iniciado.', 'success');
        registrarPresenca();
    });

    log('Presença Diária Automática – Script by Nícolas Pastorello (@opastorello)', 'info');
})();
