import axios from 'axios'

function Api () {
    return axios.create({
        baseURL: `http://localhost:1070/`,
        withCredentials: false,
    })
}

export default {
    // getUserRepositories({username}){
    //     return Api().get(`users/${username}/repos`)
    //         .then(resp => resp.data)
    // },
    // getCommitsByRepository({username, repo}){
    //     return Api().get(`repos/${username}/${repo}/commits`)
    //         .then(resp => resp.data)
    // },
    // getBranchesByRepository({username, repo}){
    //     return Api().get(`repos/${username}/${repo}/branches`)
    //         .then(resp => resp.data)
    // },
    // getUserInfo({username}){
    //     return Api().get(`users/${username}`)
    //         .then(resp => resp.data)
    // },
    async getUserRepositories ({username}) {
        return await Api().get('repositories' , {params: {username}})
            .then(response => response.data)
    },
    async getCommitsByRepository({username, repo}){
        return await Api().get(`commits`, {params: {username, repo}})
            .then(response => response.data)
    },
    async getBranchesByRepository({username, repo}){
        return await Api().get(`branches`, {params: {username, repo}})
            .then(response => response.data)
    },
    async getUserInfo({username}){
        return await Api().get(`users/${username}`)
            .then(response => response.data)
    },
}
