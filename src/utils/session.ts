import logoutFn from "./logoutFn";
import sessionChecker from "./sessionChecker";

export default function (administrativo: boolean) {
    sessionChecker()
    .then(d => {
        if(d.username.length > 0) {
            if(administrativo && !d.administrativo) window.location.href = '/login'
            localStorage.setItem('username', d.username)
        }
        else{
            logoutFn()
            window.location.href = '/login'
        }
    })
}