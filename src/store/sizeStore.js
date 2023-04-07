import {makeAutoObservable} from "mobx";
import {useMediaQuery} from "react-responsive";

export default class SizeStore {
    constructor() {
        // this._size_560 = useMediaQuery({query: '(max-width: 600px)'})
        // this._size_1000 = useMediaQuery({query: '(max-width: 1000px)'})
        makeAutoObservable(this)
    }

    get size_560() {
        // return this._size_560
    }
    get size_1000() {
        // return this._size_1000
    }
}
