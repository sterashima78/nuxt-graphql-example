import { Repository } from '~/domain/repository'
import { FetchRepositoriesQuery } from './generated-client'

/**
 * Repository型
 */
type FetchRepositoriesQueryNode = Exclude<
  FetchRepositoriesQuery['search']['nodes'],
  null | undefined
>[0]
type FetchRepositoriesQueryRepositoryNode = Extract<
  FetchRepositoriesQueryNode,
  { readonly __typename?: 'Repository' }
>

/**
 * Repository型のアサーション
 */
export type IsRepositoryNode = (
  node: FetchRepositoriesQueryNode
) => node is FetchRepositoriesQueryRepositoryNode

export const isRepositoryNode: IsRepositoryNode = (
  node
): node is FetchRepositoriesQueryRepositoryNode =>
  node?.__typename === 'Repository'

/**
 * 変換関数
 */
export type ConvertRepositoryFrom = (result: FetchRepositoriesQuery) => Repository[]
export const convertRepositoryFrom: ConvertRepositoryFrom = (result) => {
  return result.search.nodes?.filter(isRepositoryNode).map((node) => ({
        name: node.name,
        numOfIssues: node.issues.totalCount,
        numOfStars: node.stargazers.totalCount,
      }))
    || []
}
