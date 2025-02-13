import {useNuxtApp} from "#app";

export function useSnackbar() {
    const {$vuetify} = useNuxtApp();

    const showSnackbar = (message: any, type = "success") => {
        $vuetify.theme.global.name = type === "error" ? "error" : "success";
        alert(message);
    };

    return {showSnackbar};
}
