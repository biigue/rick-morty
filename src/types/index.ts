export type ListCharacters = {
  info: Pagination
  characters: Character[]
}

export type Character = {
  id: string
  name: string
  status: string
  species: string
  type?: string
  gender?: string
  origin?: Location
  location?: Location
  image: string
  episode?: ListEpisodes[]
}

export type Location = {
  id: string
  name: string
  type: string
  dimension: string
}

export type ListEpisodes = {
  id: string
  name: string
  air_date: string
  episode: string
  characters: Character[]
  created: string
}

export type Pagination = {
  count: Number
  pages: Number
  next: Number
  prev: Number | null
}
