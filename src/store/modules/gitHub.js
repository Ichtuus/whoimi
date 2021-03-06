import gitHubApi from '../../api/github/gitHub'

const IS_LOADING_GITHUB_INFO = 'IS_LOADING_GITHUB_INFO'
const IS_LOADING_USER_INFO = 'IS_LOADING_USER_INFO'
const IS_LOADING_USER_REPOS = 'IS_LOADING_USER_REPOS'

const RESET_ON_LEFT = 'RESET_ON_LEFT'

const UPDATE_USER_REPOS = 'UPDATE_USER_REPOS'
const UPDATE_GITHUB_INFO = 'UPDATE_GITHUB_INFO'

const UPDATE_USER = 'UPDATE_USER'

const state = {
    isLoadingGitHubInfo: false,
    isLoadingUserInfo: false,
    repositories: [],
    gitHubUser: {},
    gitHubInfo: []
}

const actions = {
    async getUserInfo ({commit}, {username}) {
        try {
            commit(IS_LOADING_USER_INFO, true)
            const user = await gitHubApi.getUserInfo({username})
            commit(UPDATE_USER, user)
            commit(IS_LOADING_USER_INFO, false)
        } catch (e) {
            console.log('error', e)
        }
    },
    async getUserRepositories ({commit}, {username}) {
        try {
            commit(IS_LOADING_USER_REPOS, true)
            const repositories = await gitHubApi.getUserRepositories({username})
            commit(UPDATE_USER_REPOS, repositories)
            commit(IS_LOADING_USER_REPOS, false)
        } catch (e) {
            console.log('error', e)
        }
    },
    async getGitHubInfo ({commit},  {username, repo, url}) {
        commit(IS_LOADING_GITHUB_INFO, true)
        try {
            await Promise.all([
                gitHubApi.getBranchesByRepository({username, repo}),
                gitHubApi.getCommitsByRepository({username, repo})
            ]).then(( [ commits, branches ] ) => {
                commit(UPDATE_GITHUB_INFO, { repo, url, commits, branches })
                commit(IS_LOADING_GITHUB_INFO, false)
            })
        } catch (e) {
            console.log('error', e)
        }
    },
    reset ({commit}) {
        commit(RESET_ON_LEFT)
    }
}

const getters = {
    repositories(state) {
        return state.repositories
    },
    gitHubUser(state) {
        return state.user
    },
    gitHubInfo(state) {
        return state.gitHubInfo
    },
    isLoadingGitHubInfo(state) {
        return state.isLoadingGitHubInfo
    },
}

const mutations = {
    [IS_LOADING_GITHUB_INFO] (state, isLoadingGitHubInfo) {
        state.isLoadingGitHubInfo = isLoadingGitHubInfo
    },
    [IS_LOADING_USER_INFO] (state, isLoadingUserInfo) {
        state.isLoadingUserInfo = isLoadingUserInfo
    },
    [IS_LOADING_USER_REPOS] (state, isLoadingUserRepos) {
        state.isLoadingUserRepos = isLoadingUserRepos
    },
    [UPDATE_USER_REPOS] (state, repositories) {
        state.repositories = repositories
    },
    [UPDATE_GITHUB_INFO] (state, { repo, url, commits, branches }) {
        state.gitHubInfo.unshift({repository: { repo, url }, commits_nbr: commits.length, branches_nbr: branches.length})
    },
    [UPDATE_USER] (state, user) {
        state.user = user
    },
    [RESET_ON_LEFT] (state) {
        state.isLoadingGitHubInfo = false
        state.isLoadingUserInfo = false
        state.repositories = []
        state.gitHubUser = {}
        state.gitHubInfo = []
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
