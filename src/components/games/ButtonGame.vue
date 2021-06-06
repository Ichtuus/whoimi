<template>
  <div>
    <b-button class="is-inline" @click="$emit(EventsType.START_GAME)">{{start ? 'Stop' : 'Play'}}</b-button>
    <b-button class="is-inline" @click="resetGame">Réinitialiser</b-button><br>
    <small>Pour commencer/stopper le jeu, appuyez sur <code>1</code><br> Pour réinitialiser appuyez sur <code>0</code> </small>
  </div>
</template>

<script>
import {EventsType} from '../../constants/events/games'
export default {
  name: 'ButtonGame',
  props: {
    start: {
      type: Boolean,
      required: true
    },
    resetGame: {
      type: Function,
      required: true
    }
  },
  computed: {
    EventsType () { return EventsType }
  }
}
</script>
