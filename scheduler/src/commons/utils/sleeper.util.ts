
export class Sleeperutil {

    static wait(seconds: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(null), (seconds * 1000))
        })
    }
}