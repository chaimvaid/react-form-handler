export class Publisher{
    subscribers = {}

    subscribe = (callback) => {
        let key = this.generateKey();
        this.subscribers[key] = callback;
        return {unsubscribe: () => {delete this.subscribers[key]}}
    }

    publish = (value) => {
        Object.keys(this.subscribers).forEach(key=>this.subscribers[key](value))
    }

    generateKey() {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < 10; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
    }
    
}