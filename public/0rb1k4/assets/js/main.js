// Função para construir a URL com base nos valores iniciais
    function buildURL(baseURL, params) {
        const url = new URL(baseURL);
        if (params && typeof params === 'object') {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    url.searchParams.append(key, params[key]);
                }
            });
        }
        url.searchParams.append('read', 'Y');
        return url;
    }

    // Função para atualizar os elementos da página
    function updateProgress(data, config) {
        const percentual = data.percentual;
        const atual = data.atual;
        const restante = data.restante;

        // Função auxiliar para atualizar texto mantendo o HTML interno
        function updateText(elemento, valor, tipo) {
            let textoInicial = elemento.getAttribute('data-progress-text');
            if (!textoInicial) {
                textoInicial = elemento.innerHTML;
                elemento.setAttribute('data-progress-text', textoInicial);
            }

            // Substituir o valor no texto inicial
            let textoAtualizado = textoInicial.replace(/(\d+%?)/, valor + tipo);
            elemento.innerHTML = textoAtualizado;
        }

        // Atualizar as barras de progresso
        document.querySelectorAll(`[data-framer-name="${config.bar_element}"]`).forEach(barra => {
            const progresso = barra.querySelector('[data-framer-name="Progresso"]');
            if (progresso) {
                progresso.style.width = percentual;
            }
        });

        // Atualizar os textos
        document.querySelectorAll(`[data-framer-name="${config.text_element}"]`).forEach(elemento => {
            if (elemento.querySelector('p, span')) {
                elemento.querySelectorAll('p, span').forEach(innerElem => {
                    if (innerElem.innerHTML.includes('%')) {
                        updateText(innerElem, percentual, " ");
                    } else {
                        updateText(innerElem, atual, "");
                    }
                });
            } else {
                if (elemento.innerHTML.includes('%')) {
                    updateText(elemento, percentual, "%");
                } else {
                    updateText(elemento, atual, "");
                }
            }
        });
    }

    // Função para buscar dados do servidor e atualizar a página
    function fetchData(config) {
        const url = buildURL('https://imagine.orbyka.com/dist/progressbar/set.php', config);
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                if (data) {
                    updateProgress(data, config);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

