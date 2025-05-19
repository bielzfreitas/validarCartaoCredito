function validarCartaoCredito(numeroCartao) {
    // Coerce input to string and remove espaços e caracteres não numéricos
    const cartao = numeroCartao.toString().replace(/\D/g, '');

    // Verifica se o número tem entre 13 e 19 dígitos
    if (!/^\d{13,19}$/.test(cartao)) {
        return {
            valido: false,
            bandeira: null,
            mensagem: 'Número de cartão inválido'
        };
    }

    // Identifica a bandeira do cartão
    const bandeira = identificarBandeira(cartao);

    return {
        valido: true,
        bandeira: bandeira,
        mensagem: bandeira ? `Cartão ${bandeira} válido` : 'Bandeira não identificada'
    };
}

function identificarBandeira(numeroCartao) {
    // Primeiros dígitos do cartão
    const primeirosDigitos = numeroCartao.substring(0, 4);
    const doisPrimeirosDigitos = Number.parseInt(numeroCartao.substring(0, 2));
    const quatroPrimeirosDigitos = Number.parseInt(primeirosDigitos);

    // Visa
    if (numeroCartao.startsWith('4')) {
        return 'Visa';
    }
    
    // MasterCard
    if ((doisPrimeirosDigitos >= 51 && doisPrimeirosDigitos <= 55) ||
        (quatroPrimeirosDigitos >= 2221 && quatroPrimeirosDigitos <= 2720)) {
        return 'MasterCard';
    }

    // American Express
    if (numeroCartao.startsWith('34') || numeroCartao.startsWith('37')) {
        return 'American Express';
    }

    // Discover
    if (numeroCartao.startsWith('6011') || 
        numeroCartao.startsWith('65') || 
        (quatroPrimeirosDigitos >= 644 && quatroPrimeirosDigitos <= 649)) {
        return 'Discover';
    }

    // Hipercard
    if (numeroCartao.startsWith('6062')) {
        return 'Hipercard';
    }

    // Elo
    const eloPreFixos = ['4011', '4312', '4389'];
    if (eloPreFixos.some(prefixo => numeroCartao.startsWith(prefixo))) {
        return 'Elo';
    }

    return null;
}

// Exemplo de uso
console.log(validarCartaoCredito('4532123456788901')); // Visa
console.log(validarCartaoCredito('5412345678901234')); // MasterCard
console.log(validarCartaoCredito('341234567890123'));  // American Express
console.log(validarCartaoCredito('6011123456789012')); // Discover
console.log(validarCartaoCredito('6062123456789012')); // Hipercard
console.log(validarCartaoCredito('4011123456789012')); // Elo

const resultado = validarCartaoCredito('4532123456788901');
console.log(resultado);
// Saída esperada: { valido: true, bandeira: 'Visa', mensagem: 'Cartão Visa válido' }