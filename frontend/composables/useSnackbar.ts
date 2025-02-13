import {useNuxtApp} from "#app";

export function useSnackbar() {
    const {$vuetify} = useNuxtApp();

    const showSnackbar = (message, type = "success") => {
        $vuetify.theme.global.name = type === "error" ? "error" : "success";
        alert(message);
    };

    return {showSnackbar};
}
