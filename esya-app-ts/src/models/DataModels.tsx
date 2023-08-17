export type AdminModel = PersonModel & {
    adminId: number,
    power: number
}

export type CategoryModel = {
    categoryId: number,
    name: string,
    postCount: number
}

export type PersonModel = {
    userId: number,
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    postCount: number    
}

export type PostModel = {
    postId: number,
    title: string,
    text: string,
    userId: number,
    imageUrl: string,
    date: Date;
    isFound: boolean,
    bounty: number
}

export type UserModel = PersonModel & {
    emailVerified: boolean,
    age: number

}
