<script>
import {mapGetters} from 'vuex'
import gitHubHelper from '../helper/gitHub/gitHub'
export default {
  name: 'GitHubApi',
  data () {
    return {
      username: 'ichtuus'
    }
  },
  computed: {
    ...mapGetters('gitHub', ['repositories', 'gitHubUser', 'gitHubInfo']),
      _repositories () {
        return this.repositories.filter(repo => repo.fork !== true)
      }
  },
  async mounted() {
    await this.$store.dispatch('gitHub/getUserRepositories', { username: this.username })
    this._repositories.forEach( repository => {
      this.$store.dispatch('gitHub/getGitHubInfo', { username: this.username, repo: repository.name })
    })
  },
  methods: {
    totalCommits () {
      return gitHubHelper.totalCommits(this.gitHubInfo.filter(item => item.branches_nbr))
    },
    totalBranches () {
      return gitHubHelper.totalBranches(this.gitHubInfo.filter(item => item.branches_nbr))
    }
  }
}
</script>
