export function useAuthApi() {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;
    const isAuthenticated = useState("isAuthenticated", () => false);
    const login = async (credentials: { email: string; password: string }) => {
        try {
            const response = await $fetch<{ user: any; token: string }>(`${apiBaseUrl}/auth/login`, {
                method: "POST",
                body: credentials,
            });

            const {user, token} = response;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userName", user.name);
            localStorage.setItem("userEmail", user.email);
            isAuthenticated.value = true;
            return response;
        } catch (err) {
            console.error("❌ Erro ao fazer login:", err);
            throw err;
        }
    };

    const register = async (userData: { name: string; email: string; password: string }) => {
        try {
            return await $fetch(`${apiBaseUrl}/auth/register`, {
                method: "POST",
                body: userData,
            });
        } catch (err) {
            console.error("❌ Erro ao registrar usuário:", err);
            throw err;
        }
    };

    const getUser = async () => {
        try {
            return await $fetch(`${apiBaseUrl}/auth/user`, {method: "GET"});
        } catch (err) {
            console.error("❌ Erro ao buscar usuário:", err);
            throw err;
        }
    };

    return {login, register, getUser};
}
