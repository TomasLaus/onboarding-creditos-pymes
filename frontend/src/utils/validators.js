export const validateRut = (rut) => {
    // Clean the RUT by removing dots and the hyphen
    const cleanedRut = rut.replace(/[\.\-]/g, '');

    if (!/^[0-9]+[0-9kK]{1}$/.test(cleanedRut)) {
        return false;
    }

    const dv = cleanedRut.slice(-1).toLowerCase();
    const rutBody = cleanedRut.slice(0, -1);

    let M = 0;
    let S = 1;
    for (let i = rutBody.length - 1; i >= 0; i--) {
        S = (S + parseInt(rutBody.charAt(i), 10) * (9 - M++ % 6)) % 11;
    }

    const calculatedDv = S ? (S - 1).toString() : 'k';

    return dv === calculatedDv;
};

export const validateCuit = (cuit) => {
    // Clean the CUIT by removing hyphens
    const cleanedCuit = cuit.replace(/[-]/g, '');

    if (!/^[0-9]{11}$/.test(cleanedCuit)) {
        return false;
    }
    const coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const base = 11;
    const digitos = cleanedCuit.split('').map(Number);
    const digitoVerificador = digitos.pop();

    let suma = 0;
    for (let i = 0; i < coeficientes.length; i++) {
        suma += digitos[i] * coeficientes[i];
    }

    let resto = suma % base;
    let dv;

    if (resto === 0) {
        dv = 0;
    } else if (resto === 1) {
        // This case requires special handling depending on the type of CUIT
        // For simplicity, we'll calculate the verifier digit differently
        suma = 0;
        const coeficientes2 = [3, 2, 7, 6, 5, 4, 3, 2]; // Coeficientes para CUIT de personas físicas
        const digitosIniciales = cleanedCuit.substring(0,2);
        if(digitosIniciales === '20' || digitosIniciales === '27' || digitosIniciales === '23' || digitosIniciales === '24'){
             for (let i = 0; i < 8; i++) {
                suma += parseInt(cleanedCuit[i+2]) * coeficientes2[i];
            }
            resto = suma % 11;
            dv = 11 - resto;
            if(dv === 11) dv = 0;
            if(dv === 10) dv = 9;
        }
       
    } else {
        dv = 11 - resto;
         if(dv === 11) dv = 0;
    }

    return dv === digitoVerificador;
};
