import {makeAutoObservable} from "mobx";
import {useMediaQuery} from "react-responsive";

export default class SizeStore {
    constructor() {
        // this._size_560 = useMediaQuery({query: '(max-width: 600px)'})
        // this._size_1300 = useMediaQuery({query: '(max-width: 1300px)'})
        makeAutoObservable(this)
    }

    get size_560() {
        // return this._size_560
    }
    get size_1300() {
        // return this._size_1300
    }
}
