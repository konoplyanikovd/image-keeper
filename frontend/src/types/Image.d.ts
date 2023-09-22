export default interface IServerImage {
    id?: number | null,
    path?: string | null,
    name?: string | null,
    size?: string | null,
    label?: string | null,
    createdBy?: string | null,
    createdAt?: string | null,
}
export type Image = IServerImage;