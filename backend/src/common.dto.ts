export type CommonDto<T> = {
    [K in keyof T]?: T[K]
}

