<template>
  <div>

<!--    <section class="section is-main-section">-->

<!--      {{ repositories }}-->
<!--    </section>-->
  </div>
</template>

<script>
import HeroBar from '../components/common/HeroBar'
import GitHubApi from '@/views/AbstractGitHub'
import GitHub from '../api/github/gitHub'

export default {
  name: 'Home',
  components: { HeroBar },
  extends: GitHubApi,
  async mounted() {
    try {
      await GitHub.getUserRepositories()
    } catch (e) {
      console.error('error', e)
    }

  }
}
</script>
