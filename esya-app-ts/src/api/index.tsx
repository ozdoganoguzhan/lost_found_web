import axios from 'axios'

export const BASE_URL = 'https://localhost:7183/';

export const ENDPOINTS = {
    posts: "posts",
    admins: "admins",
    categoryposts: "categoryposts",
    users: "users",
    userposts: "userposts",
    categories: "categories",
    subCategories: "subcategories",
    upload: "upload"
}

export const createAPIEndpoint = (endpoint : string) => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchByEmail: (email: string) => axios.get(url+'search', {params:{email: email}}),
        fetchById: (id: number) => axios.get(url + id),
        fetchPostByUserId: (userId: number) => axios.get(url + "search",{params:{userId: userId}}),
        fetchByCategoryId: (categoryId: string) => axios.get(url + 'search', {params:{categoryId: categoryId}}),
        post: (newRecord: Object) => axios.post(url, newRecord),
        getLastPostId: () => axios.get(url + "last-post-id"),
        put: (id: string, updatedRecord: Object) => axios.put(url + id, updatedRecord),
        delete: (id: string) => axios.delete(url + id),
    }
}