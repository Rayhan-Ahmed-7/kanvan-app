export type TLogin = {
    username: string,
    password: string,
}

export interface TRegister extends TLogin {
    confirmPassword: string
} 