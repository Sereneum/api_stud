export default class Binder {
    constructor() {
        this._shibari = []
    }

    init(id) {
        for (let i of this._shibari)
            if (id === i.id)
                return

        this._shibari.push({
            id,
            setter: null,
            func: null
        })
    }

    setSetter(id, setter) {
        this.init(id)

        for (let i = 0; i < this._shibari.length; ++i)
            if (this._shibari[i].id === id)
                this._shibari[i].setter = setter
    }


    setFunc(id, func) {
        this.init(id)
        for (let i = 0; i < this._shibari.length; ++i)
            if (this._shibari[i].id === id)
                this._shibari[i].func = func
    }

    getSetter(id) {
        for (let i = 0; i < this._shibari.length; ++i)
            if (this._shibari[i].id === id)
                return this._shibari[i].setter
        return null
    }

    getFunc(id) {
        for (let i = 0; i < this._shibari.length; ++i)
            if (this._shibari[i].id === id)
                return this._shibari[i].func
        return null
    }
}
