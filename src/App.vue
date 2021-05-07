<template>
  <div id="app">
    <nav-bar />
    <div class="stripe-diagonal-box"><div class="stripe-content">&nbsp</div></div>
    <div class="stripe-diagonal-box2"><div class="stripe-content">&nbsp</div></div>
    <div class="column">
      <title-bar :title-stack="['Nicolas', $route.name]" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/menu/nav/NavBar'
import TitleBar from './components/common/TitleBar'

export default {
  name: 'App',
  components: { NavBar, TitleBar }
}
</script>

