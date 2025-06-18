import logoutFn from "./logoutFn";
import sessionChecker from "./sessionChecker";

export default function (administrativo: boolean, admin?: boolean) {
    sessionChecker()
    .then(d => {
        if(d.username.length > 0) {
            if(admin && !d.administrativo) window.location.href = '/login'
            else if(administrativo && !d.administrativo) window.location.href = '/login'
            localStorage.setItem('username', d.username)
        }
        else{
            logoutFn()
            window.location.href = '/login'
        }
    })
}