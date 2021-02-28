import { InjectionKey } from "@nuxtjs/composition-api";
export type Repository = {
  name: string;
  numOfIssues: number;
  numOfStars: number;
}

export type FetchRepositories = (group: string) => Promise<Repository[]>
export const fetchRepositoriesInjectionKey: InjectionKey<FetchRepositories> = Symbol("FetchRepositories")