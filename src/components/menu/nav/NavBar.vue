<template>
  <nav
      class="navbar is-pulled-right"
      role="navigation"
      aria-label="main navigation">
    <div
        class="navbar-brand">
      <router-link
          :to="{ name: 'Home' }"
          class="navbar-item has-text-weight-bold"
      >
        NICOLAS DIARRA
      </router-link>
      <div class="navbar-brand">
        <a
            class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
            @click.prevent="isNavBarActive = !isNavBarActive"
        >
          <b-icon :icon="isNavBarActive ? 'close' : 'dots-vertical'" custom-size="default" />
        </a>
      </div>
    </div>


    <div
        :class="{ 'is-active': isNavBarActive }"
        id="whoimi-navbar"
        class="navbar-menu fadeIn animated faster">
      <div
          class="navbar-start">
        <router-link
            :to="{ name: itemMenu.path }"
            v-for="itemMenu in itemsMenu"
            :key="itemMenu.path"
            class="navbar-item">
          {{ itemMenu.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      isNavBarActive: false
    }
  },
  computed: {
    itemsMenu () {
      return [
        { name: 'About me', path: 'AboutMe' },
        { name: 'GitHub', path: 'GitHub' },
        { name: 'Front', path: 'Front' },
        { name: 'Back', path: 'Back' },
      ]
    }
  }
}
</script>
