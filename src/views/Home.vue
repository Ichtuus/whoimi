<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      section
    </section>
  </div>
</template>

<script>
import HeroBar from "../components/common/HeroBar";
import TitleBar from "../components/common/TitleBar";
export default {
  name: 'Home',
  components: { HeroBar, TitleBar },
  computed: {
    titleStack () {
      return ['Admin', 'Dashboard']
    }
  },
}
</script>
