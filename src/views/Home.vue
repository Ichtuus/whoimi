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

export default {
  name: 'Home',
  components: { HeroBar },
  extends: GitHubApi,
}
</script>
