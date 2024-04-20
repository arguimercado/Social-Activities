

export const localStore = () => {

    function setItem(value : string) {
        window.localStorage.setItem('jwt',value);
    }

    function getItem() {
       return window.localStorage.getItem('jwt');
    }

    function removeItem() {
        window.localStorage.removeItem('jwt')
    }
}

