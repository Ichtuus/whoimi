<script>
import {mapGetters} from 'vuex'

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
  }
}
</script>
