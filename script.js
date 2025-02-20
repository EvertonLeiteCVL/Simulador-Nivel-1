// Exibição e recebimento dos dados do Governo organizados por orgão, Historia1
const dadosRepasses = [
    {
        orgao: "MEC",
        data: "01/03/2022",
        valor: 800.00,
        status: "sucesso"
    },
    {
        orgao: "Ministério da Saúde",
        data: "03/05/2021",
        valor: 350.00,
        status: "sucesso"
    },
    {
        orgao: "MEC",
        data: "05/07/2019",
        valor: 500.00,
        status: "falha",
        motivo: "falta de documentação"
    },
    {
        orgao: "Ministério da Educação",
        data: "08/12/2002",
        valor: 180.00,
        status: "sucesso"
    },
    {
        orgao: "Ministério da Saúde",
        data: "10/01/2006",
        valor: 900.00,
        status: "sucesso"
    },
    {
        orgao: "Ministério da Educação",
        data: "12/01/2024",
        valor: 300.00,
        status: "falha",
        motivo: "dados inválidos"
    },
    {
        orgao: "Ministério da Saúde",
        data: "15/12/2024",
        valor: 1200.00,
        status: "sucesso"
    },
    {
        orgao: "MEC",
        data: "17/01/2025",
        valor: 850.50,
        status: "sucesso"
    },
    {
        orgao: "Ministério da Educação",
        data: "20/02/2000",
        valor: 400.00,
        status: "sucesso"
    },
    {
        orgao: "MEC",
        data: "22/04/2024",
        valor: 1100.00,
        status: "falha",
        motivo: "falta de verba"
    }
];


/* Chamando função para calcular o resumo dos repasses, e transaçoes porr
status,historia2*/
function calcularResumoRepasses(dados) {
    let resumo = {
        sucesso: {
            quantidadeTotal: 0,
            valorTotal: 0,
            quantidadePorOrgao: {},
            valorPorOrgao: {}
        },
        falha: {
            quantidadeTotal: 0,
            valorTotal: 0,
            quantidadePorOrgao: {},
            quantidadePorMotivo: {},
            valorPorOrgao: {},
            valorPorMotivo: {}
        }
    };

    dados.forEach(repasse => {
        if (repasse.status === "sucesso") {
            resumo.sucesso.quantidadeTotal++;
            resumo.sucesso.valorTotal += repasse.valor;

            if (resumo.sucesso.quantidadePorOrgao[repasse.orgao]) {
                resumo.sucesso.quantidadePorOrgao[repasse.orgao]++;
                resumo.sucesso.valorPorOrgao[repasse.orgao] += repasse.valor;
            } else {
                resumo.sucesso.quantidadePorOrgao[repasse.orgao] = 1;
                resumo.sucesso.valorPorOrgao[repasse.orgao] = repasse.valor;
            }
        } else if (repasse.status === "falha") {
            resumo.falha.quantidadeTotal++;
            resumo.falha.valorTotal += repasse.valor;

            if (resumo.falha.quantidadePorOrgao[repasse.orgao]) {
                resumo.falha.quantidadePorOrgao[repasse.orgao]++;
                resumo.falha.valorPorOrgao[repasse.orgao] += repasse.valor;
            } else {
                resumo.falha.quantidadePorOrgao[repasse.orgao] = 1;
                resumo.falha.valorPorOrgao[repasse.orgao] = repasse.valor;
            }

            if (repasse.motivo) {
                if (resumo.falha.quantidadePorMotivo[repasse.motivo]) {
                    resumo.falha.quantidadePorMotivo[repasse.motivo]++;
                    resumo.falha.valorPorMotivo[repasse.motivo] += repasse.valor;
                } else {
                    resumo.falha.quantidadePorMotivo[repasse.motivo] = 1;
                    resumo.falha.valorPorMotivo[repasse.motivo] = repasse.valor;
                }
            }
        }
    });

    return resumo;
}


// chamando função para encontrar o repasse com maior valor,historia3.
function encontrarMaiorValor(dados) {
    let maiorValorRepasse = dados[0];
    dados.forEach(repasse => {
        if (repasse.valor > maiorValorRepasse.valor) {
            maiorValorRepasse = repasse;
        }
    });
    return maiorValorRepasse;
}

// chamando função para encontrar o repasse com menor valor, historia3
function encontrarMenorValor(dados) {
    let menorValorRepasse = dados[0];
    dados.forEach(repasse => {
        if (repasse.valor < menorValorRepasse.valor) {
            menorValorRepasse = repasse;
        }
    });
    return menorValorRepasse;
}

// Chamndo função para encontrar o dia com mais repasses
 function encontrarDiaMaisRepasses(dados) {
    let contagemDias = {};

    dados.forEach(repasse => {
        let [dia, mes, ano] = repasse.data.split('/');
        let dataFormatoBrasileiro = `${dia}/${mes}/${ano}`;
        contagemDias[dataFormatoBrasileiro] = (contagemDias[dataFormatoBrasileiro] || 0) + 1;
    });

    return Object.keys(contagemDias).reduce((a, b) => contagemDias[a] > contagemDias[b] ? a : b);
}
 

 // chamando função para encontrar o órgão com mais repasses
function encontrarOrgaoMaisRepasses(dados) {
    let contagemOrgaos = {};
    dados.forEach(repasse => {
        if (contagemOrgaos[repasse.orgao]) {
            contagemOrgaos[repasse.orgao]++;
        } else {
            contagemOrgaos[repasse.orgao] = 1;
        }
    });

    let orgaoMaisRepasses = Object.keys(contagemOrgaos).reduce((a, b) => contagemOrgaos[a] > contagemOrgaos[b] ? a : b);
    return orgaoMaisRepasses;
}


// chamando função para encontrar o órgão com mais repasses bem sucedidos
function encontrarOrgaoMaisSucessos(dados) {
    let contagemOrgaosSucesso = {};
    dados.forEach(repasse => {
        if (repasse.status === "sucesso") {
            if (contagemOrgaosSucesso[repasse.orgao]) {
                contagemOrgaosSucesso[repasse.orgao]++;
            } else {
                contagemOrgaosSucesso[repasse.orgao] = 1;
            }
        }
    });

    let orgaoMaisSucessos = Object.keys(contagemOrgaosSucesso).reduce((a, b) => contagemOrgaosSucesso[a] > contagemOrgaosSucesso[b] ? a : b);
    return orgaoMaisSucessos;
}

// chamando função para encontrar o órgão com mais repasses com falha
function encontrarOrgaoMaisFalhas(dados) {
    let contagemOrgaosFalha = {};
    dados.forEach(repasse => {
        if (repasse.status === "falha") {
            if (contagemOrgaosFalha[repasse.orgao]) {
                contagemOrgaosFalha[repasse.orgao]++;
            } else {
                contagemOrgaosFalha[repasse.orgao] = 1;
            }
        }
    });

    let orgaoMaisFalhas = Object.keys(contagemOrgaosFalha).reduce((a, b) => contagemOrgaosFalha[a] > contagemOrgaosFalha[b] ? a : b);
    return orgaoMaisFalhas;
}

// chamando função para encontrar o motivo de falha com mais repasses
function encontrarMotivoMaisFalhas(dados) {
    let contagemMotivosFalha = {};
    dados.forEach(repasse => {
        if (repasse.status === "falha" && repasse.motivo) {
            if (contagemMotivosFalha[repasse.motivo]) {
                contagemMotivosFalha[repasse.motivo]++;
            } else {
                contagemMotivosFalha[repasse.motivo] = 1;
            }
        }
    });

    let motivoMaisFalhas = Object.keys(contagemMotivosFalha).reduce((a, b) => contagemMotivosFalha[a] > contagemMotivosFalha[b] ? a : b);
    return motivoMaisFalhas;
}

// Chamando função para calcular o resumo dos repasses
const resumoRepasses = calcularResumoRepasses(dadosRepasses);

// exibir as informações do resumo dos repasses bem sucedidos no console
console.log("Resumo de Repasses Bem Sucedidos:");
console.log(`1. Quantidade total de repasses bem sucedidos: ${resumoRepasses.sucesso.quantidadeTotal}`);

console.log("2. Quantidade total de repasses bem sucedidos por órgão:");
Object.keys(resumoRepasses.sucesso.quantidadePorOrgao).forEach(orgao => {
    console.log(`   - ${orgao}: ${resumoRepasses.sucesso.quantidadePorOrgao[orgao]}`);
});

console.log(`3. Valor total de repasses bem sucedidos: R$ ${resumoRepasses.sucesso.valorTotal.toFixed(2)}`);

console.log("4. Valor total de repasses bem sucedidos por órgão:");
Object.keys(resumoRepasses.sucesso.valorPorOrgao).forEach(orgao => {
    console.log(`   - ${orgao}: R$ ${resumoRepasses.sucesso.valorPorOrgao[orgao].toFixed(2)}`);
});

// chamando função para exibir resumo dos repasses com falha no console 
console.log("\nResumo de Repasses com Falha:");
console.log(`1. Quantidade total de repasses com falha: ${resumoRepasses.falha.quantidadeTotal}`);

console.log("2. Quantidade total de repasses com falha por órgão:");
Object.keys(resumoRepasses.falha.quantidadePorOrgao).forEach(orgao => {
    console.log(`   - ${orgao}: ${resumoRepasses.falha.quantidadePorOrgao[orgao]}`);
});

console.log(`3. Valor total de repasses com falha: R$ ${resumoRepasses.falha.valorTotal.toFixed(2)}`);

console.log("4. Valor total de repasses com falha por órgão:");
Object.keys(resumoRepasses.falha.valorPorOrgao).forEach(orgao => {
    console.log(`   - ${orgao}: R$ ${resumoRepasses.falha.valorPorOrgao[orgao].toFixed(2)}`);
});

// Se houver motivo específico de falha mostrar motivo no console 
console.log("\nMotivos de falha:");
Object.keys(resumoRepasses.falha.quantidadePorMotivo).forEach(motivo => {
    console.log(`- Motivo: ${motivo}, Quantidade: ${resumoRepasses.falha.quantidadePorMotivo[motivo]}, Valor total: R$ ${resumoRepasses.falha.valorPorMotivo[motivo].toFixed(2)}`);
});

// Mostrar os detalhes adicionais de transações no console
console.log("\nDetalhes Adicionais:");

console.log("\nDetalhes do repasse com maior valor:");
console.log(encontrarMaiorValor(dadosRepasses));

console.log("\nDetalhes do repasse com menor valor:");
console.log(encontrarMenorValor(dadosRepasses));

console.log("\nDia com mais repasses:");
console.log(encontrarDiaMaisRepasses(dadosRepasses));

console.log("\nÓrgão com mais repasses:");
console.log(encontrarOrgaoMaisRepasses(dadosRepasses));

console.log("\nÓrgão com mais repasses bem sucedidos:");
console.log(encontrarOrgaoMaisSucessos(dadosRepasses));

console.log("\nÓrgão com mais repasses com falha:");
console.log(encontrarOrgaoMaisFalhas(dadosRepasses));

console.log("\nMotivo de falha com mais repasses:");
console.log(encontrarMotivoMaisFalhas(dadosRepasses)); 
