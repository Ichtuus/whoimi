<template>
  <div>
    <section v-html="description" class="section is-main-section"></section>
  </div>
</template>

<script>
import {information as me} from '../../src/me/information.js'
export default {
  name: 'AboutMe',
  data () {
    return {
      description: me.description
    }
  }
}
</script>
