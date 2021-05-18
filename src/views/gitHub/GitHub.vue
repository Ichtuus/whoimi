<template>
  <div>
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
</template>

<script>
import GitHubApi from '../AbstractGitHub'

import RepositoriesList from '../../views/gitHub/RepositoriesList'
import CardComponent from '../../components/common/CardComponent'
import CardCounter from "@/components/common/CardCounter";
export default {
  name: 'GitHub',
  extends: GitHubApi,
  components: { RepositoriesList, CardComponent, CardCounter }
}
</script>
