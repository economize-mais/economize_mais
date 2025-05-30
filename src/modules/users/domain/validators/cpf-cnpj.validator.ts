export class CpfCnpjValidator {
    static validate(value: string): boolean {
        const cleaned = value.replace(/\D/g, "")

        if(cleaned.length === 11) return this.isValidCPF(cleaned)
        if(cleaned.length === 14) return this.isValidCNPJ(cleaned)

        return false
    }

    static isValidCPF(cpf: string): boolean {
        if(/^(\d)\1+$/.test(cpf)) return false

        let sum = 0

        for(let i = 0; i < 9; i++)
            sum += parseInt(cpf.charAt(i)) * (10 - i)

        let firstDigit = 11 - (sum % 11)

        if(firstDigit >= 10) firstDigit = 0
        if(firstDigit !== parseInt(cpf.charAt(9))) return false

        sum = 0
        
        for(let i = 0; i < 10; i++)
            sum += parseInt(cpf.charAt(i)) * (11 - i)

        let secondDigit = 11 - (sum % 11)

        if(secondDigit >= 10) secondDigit = 0

        return secondDigit === parseInt(cpf.charAt(10))
    }

    static isValidCNPJ(cnpj: string): boolean {
        if(/^(\d)\1+$/.test(cnpj)) return false

        const calcCheckDigit = (base: string, weights: number[]): number => {
            const sum = base
                .split("")
                .reduce((acc, digit, idx) => acc + parseInt(digit) * weights[idx], 0)

            const rest = sum % 11
            return rest < 2 ? 0 : 11 - rest
        }

        const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        const weights2 = [6, ...weights1]

        const digit1 = calcCheckDigit(cnpj.slice(0, 12), weights1)
        const digit2 = calcCheckDigit(cnpj.slice(0, 12) + digit1, weights2)

        return (
            digit1 === parseInt(cnpj.charAt(12)) &&
            digit2 === parseInt(cnpj.charAt(13))
        )
    }
}