<template>
  <div>
    <section class="section is-main-section">
      <Snake/>
    </section>
  </div>
</template>

<script>
import HeroBar from '../components/common/HeroBar'
import Snake from '../components/games/snake/Snake'
export default {
  name: 'Home',
  components: { HeroBar, Snake },
}
</script>
