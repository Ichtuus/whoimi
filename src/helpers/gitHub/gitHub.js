export default {
    totalCommits (data) {
        return calc(data.map(item => item.commits_nbr))
    },
    totalBranches (data) {
        return calc(data.map(item =>  item.branches_nbr))
    }
}

const calc = arr => arr.reduce( ( accumulator, currentValue ) => accumulator + currentValue, 0 )

