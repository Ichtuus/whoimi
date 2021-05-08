import axios from 'axios'

function Api () {
    return axios.create({
        baseURL: `https://api.github.com`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ process.env.VUE_APP_GITHUB_ACCESS_TOKEN
        }
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
    getUserRepositories () {
        return axios.get('http://localhost:1070/github')
            .then(response => response.data)
    }
}
