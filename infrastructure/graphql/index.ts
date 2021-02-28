import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated-client'
import { FetchRepositories } from '~/domain/repository'
import { convertRepositoryFrom } from './converter'

export const fetchRepositoriesFactory = (pat: string): FetchRepositories => (
  group
) =>
  getSdk(
    new GraphQLClient('https://api.github.com/graphql', {
      headers: {
        Authorization: `bearer ${pat}`,
      },
    })
  )
    .fetchRepositories({ query: `org:${group}` })
    .then(convertRepositoryFrom)
