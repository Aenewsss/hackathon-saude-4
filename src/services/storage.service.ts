class StorageService {
    // Função para obter um item do localStorage
    getItem(key: string) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Erro ao obter o item ${key} do localStorage:`, error);
            return null;
        }
    }

    // Função para definir um item no localStorage
    setItem(key:string, value:any) {
        try {
            const item = JSON.stringify(value);
            localStorage.setItem(key, item);
        } catch (error) {
            console.error(`Erro ao definir o item ${key} no localStorage:`, error);
        }
    }

    // Função para remover um item do localStorage
    removeItem(key:string) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Erro ao remover o item ${key} do localStorage:`, error);
        }
    }

    // Função para limpar todo o localStorage
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Erro ao limpar o localStorage:', error);
        }
    }
}

export const storageService = new StorageService();