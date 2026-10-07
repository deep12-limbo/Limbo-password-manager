export function getLocalStorage(key) {
    const data = localStorage.getItem(key);


    return data ? JSON.parse(data) : null;


}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromLocalStorage(key) {
    localStorage.getItem(key) ? localStorage.clear(key) : null;
}


