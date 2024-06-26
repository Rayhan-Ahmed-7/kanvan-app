let timerId: ReturnType<typeof setTimeout>;
export const debounce = <T extends (...args: any[]) => void>(callback: Function, delay: number) => {
    return function (...args: Parameters<T>) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback()
        }, delay)
    }
}