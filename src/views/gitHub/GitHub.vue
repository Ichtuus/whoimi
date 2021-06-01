<template>
  <div>
    <div v-if="!isLoadingGitHubInfo && gitHubInfo.length > 0">
      <div class="columns">
        <div class="column is-3">
          <card-counter
              class="tile is-child"
              type="is-primary"
              icon="file-document"
              :number="gitHubInfo.length"
              label="Repositories"
          />
        </div>

        <div class="column is-3">
          <card-counter
              class="tile is-child"
              type="is-primary"
              icon="source-commit"
              :number="totalCommits(gitHubInfo)"
              label="Commits"
          />
        </div>

        <div class="column is-3">
          <card-counter
              class="tile is-child"
              type="is-primary"
              icon="source-branch"
              :number="totalBranches(gitHubInfo)"
              label="Branches"
          />
        </div>
      </div>

      <card-component
          class="has-table"
          title="Repositories informations"
          icon="file-document-outline"
      >
        <template #content>
          <repositories-list :gitHubInfo="gitHubInfo"/>
        </template>
      </card-component>
    </div>
    <div v-else-if="isLoadingGitHubInfo && !gitHubInfo.length > 0">
      <b-loading is-full-page v-model="isLoadingGitHubInfo" :can-cancel="true"></b-loading>
    </div>
    <div v-else>
      <div class="columns">
        No data found
      </div>
    </div>
  </div>
</template>

<script>
import GitHubApi from '../AbstractGitHub'

import RepositoriesList from '../../views/gitHub/RepositoriesList'
import CardComponent from '../../components/common/CardComponent'
import CardCounter from "@/components/common/CardCounter";
export default {
  name: 'GitHub',
  extends: GitHubApi,
  components: { RepositoriesList, CardComponent, CardCounter },
  destroyed() {
    console.log('destroyed', this.$options.name)
    this.$store.dispatch('gitHub/reset')
  }
}
</script>
