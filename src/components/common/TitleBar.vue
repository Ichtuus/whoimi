<template>
  <section class="section is-title-bar">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <ul>
            <li v-for="(title, index) in titleStack" :key="index">
              {{ title }}
            </li>
          </ul>
        </div>
      </div>

      <div class="level-right">
        <div class="level-item">
          <div class="buttons is-right">
            <a
                download="cv_de_nicolas_diarra"
                :href='`${url}image/NICOLAS_DIARRA.pdf`'
                class="button is-primary"
            >
              <b-icon icon="credit-card" custom-size="default" />
              <span>Télécharger mon CV</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    titleStack: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      url: process.env.BASE_URL
    }
  },
}
</script>
