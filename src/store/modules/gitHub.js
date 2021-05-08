import gitHubApi from '../../api/github/gitHub'

const IS_LOADING_GITHUB_INFO = 'IS_LOADING_GITHUB_INFO'
const IS_LOADING_USER_INFO = 'IS_LOADING_USER_INFO'
const IS_LOADING_USER_REPOS = 'IS_LOADING_USER_REPOS'

const UPDATE_USER_REPOS = 'UPDATE_USER_REPOS'
const UPDATE_COMMITS_BY_REPOS = 'UPDATE_COMMITS_BY_REPOS'
const UPDATE_BRANCHES_BY_REPOS = 'UPDATE_BRANCHES_BY_REPOS'
const UPDATE_GITHUB_INFO = 'UPDATE_GITHUB_INFO'

const UPDATE_USER = 'UPDATE_USER'

const state = {
    isLoadingGitHubInfo: false,
    isLoadingUserInfo: false,
    repositories: [],
    commits: [],
    branches: [],
    gitHubUser: {},
    gitHubInfo: []
}

const actions = {
    async getUserInfo ({commit}, {username}) {
        try {
            commit(IS_LOADING_USER_INFO, true)
            const user = await gitHubApi.getUserInfo({username})
            // console.log('user', user)
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
    async getGitHubInfo ({commit},  {username, repo}) {
        // console.log('repos', repo)
        commit(IS_LOADING_GITHUB_INFO, false)
        try {
            const { commits, branches } = await Promise.all([
                gitHubApi.getBranchesByRepository({username, repo}),
                gitHubApi.getCommitsByRepository({username, repo})])
                .then(( [ commits, branches ] ) => {
                    return { commits, branches }
                })
            console.log(`${repo} commits`, commits)
            console.log(`${repo} branches`, branches)
            commit(UPDATE_GITHUB_INFO, { repo, commits, branches })
            commit(UPDATE_COMMITS_BY_REPOS, commits)
            commit(UPDATE_BRANCHES_BY_REPOS, branches)
        } catch (e) {
            console.log('error', e)
        }
        commit(IS_LOADING_GITHUB_INFO, false)
    }
}

const getters = {
    repositories(state) {
        return state.repositories
    },
    commits(state) {
        return state.commits
    },
    branches(state) {
        return state.branches
    },
    gitHubUser(state) {
        return state.user
    },
    gitHubInfo(state) {
        return state.gitHubInfo
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
    [UPDATE_COMMITS_BY_REPOS] (state, commits) {
        state.commits = commits
    },
    [UPDATE_BRANCHES_BY_REPOS] (state, branches) {
        state.branches = branches
    },
    [UPDATE_GITHUB_INFO] (state, { repo, commits, branches }) {
        state.gitHubInfo.unshift({repository: repo, commits_nbr: commits.length, branches_nbr: branches.length})
    },

    [UPDATE_USER] (state, user) {
        state.user = user
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
