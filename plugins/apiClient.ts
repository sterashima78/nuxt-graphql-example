import { onGlobalSetup, provide, defineNuxtPlugin } from '@nuxtjs/composition-api'
import { fetchRepositoriesInjectionKey } from "~/domain/repository";
import { fetchRepositoriesFactory } from "~/infrastructure/graphql/";
export default defineNuxtPlugin(({ $config }) => {
  onGlobalSetup(() => {
    provide(fetchRepositoriesInjectionKey, fetchRepositoriesFactory($config.AUTH_TOKEN))
  })
})