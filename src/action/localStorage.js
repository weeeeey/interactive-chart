const LOCAL_KEY = 'storeItems';

export function getLocalData() {
    const data = window.localStorage.getItem(LOCAL_KEY);
    if (data) return JSON.parse(data);
    return [];
}
export function setLocalData(newData) {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(newData));
}
