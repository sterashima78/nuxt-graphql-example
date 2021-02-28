<template>
  <div>
    <input v-model="query" type="text" />
    <div v-for="repository in repositories" :key="repository.name">
      <h2 v-text="repository.name"></h2>
      <p>issue: {{ repository.numOfIssues }}</p>
      <p>star: {{ repository.numOfStars }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  useContext,
  useStatic,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import { fetchRepositoriesInjectionKey } from '~/domain/repository'

export default defineComponent({
  setup() {
    const fetchRepository = inject(fetchRepositoriesInjectionKey)
    if (!fetchRepository) {
      throw new Error('fetchRepositories is not injected')
    }
    const query = ref('')
    const { route } = useContext()
    const org = computed(() => route.value.params.name)
    const repositories = useStatic((org) => fetchRepository(org), org, 'org')
    return {
      repositories: computed(
        () =>
          (query.value === ''
            ? repositories.value
            : repositories.value?.filter((i) =>
                i.name.includes(query.value)
              )) || []
      ),
      query,
    }
  },
})
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
