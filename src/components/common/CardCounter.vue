<template>
  <card-component>
    <template #content>
      <div class="level is-mobile">
        <div class="level-item">
          <div class="is-widget-label">
            <h3 class="subtitle is-spaced">
              {{ label }}
            </h3>
            <h1 class="title">
              {{number}}
            </h1>
          </div>
        </div>
        <div v-if="icon" class="level-item has-widget-icon">
          <div class="is-widget-icon">
            <b-icon :icon="icon" size="is-large" :type="type" />
          </div>
        </div>
      </div>
    </template>
  </card-component>
</template>
<script>
  import CardComponent from "@/components/common/CardComponent";
export default {
  name: 'CardCounter',
  components: { CardComponent },
  props: {
    number: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  }
}
</script>
