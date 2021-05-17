<template>
  <b-table
      :striped="true"
      :hoverable="true"
      default-sort="repository"
      :loading="isLoadingGitHubInfo"
      :data="gitHubInfo"
  >
    <b-table-column label="Repository" field="repository" sortable v-slot="props">
      {{ props.row.repository }}
    </b-table-column>
    <b-table-column label="Branches" field="branches" sortable v-slot="props">
      {{ props.row.branches_nbr }}
    </b-table-column>
    <b-table-column label="Commits" field="commits" sortable v-slot="props">
      {{ props.row.commits_nbr }}
    </b-table-column>
  </b-table>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'NotFound',
  props: {
    gitHubInfo: {type: Array, required: true}
  },
  computed: {
    ...mapGetters('gitHub', ['isLoadingGitHubInfo']),
  }
}
</script>
