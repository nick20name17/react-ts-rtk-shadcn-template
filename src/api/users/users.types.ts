export interface User {
    id: number
    email: string
    password: string
    name: string
    role: 'admin' | 'customer'
    avatar?: string
}

export type UserAddData = Omit<User, 'id' | 'role'>

export interface UserPatchData {
    id: number
    data: {
        email: string
        name: string
    }
}

export interface UserQueryParams {
    offset: number
    limit: number
    search: string
}
