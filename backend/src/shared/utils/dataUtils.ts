export class DataUtils {

    public static isValidEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    public static isValidCPF(cpf: string): boolean {
        return /^\d{11}$/.test(cpf);
    }

    public static isValidPassword(password: string): boolean {
        // Password must have at least 8 characters, one letter and one number
        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
    }
}
