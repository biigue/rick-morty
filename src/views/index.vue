<template>
  <div class="characters">
    <div class="search">
      <input type="text" placeholder="Procure pelo nome" v-model="filterCharacters" />
    </div>
    <CharactersList :characters="state.characters" />
    <div class="pagination">
      <button v-if="state.info.prev" @click="changePage(-1)">&lt;</button>
      <div>Página: {{ variables.page }} / {{ state.info.pages }}</div>
      <button :class="{ disable: !state.info.next }" @click="changePage(1)">></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, watch, ref, onMounted } from 'vue'
import { fetchGQL } from '../utils'
import { Character, Pagination, ListCharacters } from '../types'
import queryCharacters from '../graphql/queryCharacters.gql'
import CharactersList from '../components/characters.vue'

export default defineComponent({
  name: 'Characters',
  components: { CharactersList },
  setup() {
    const state = reactive<ListCharacters>({
      info: {
        count: 0,
        pages: 0,
        next: 0,
        prev: 0,
      },
      characters: [],
    })
    const variables = reactive({
      page: 1,
      filter: {
        name: '',
      },
    })
    const filterCharacters = ref('')

    onMounted(() => {
      getCharacters()
    })

    watch(filterCharacters, (val, oldVal) => {
      if (val !== oldVal) {
        variables.page = 1
        variables.filter.name = val
        getCharacters()
      }
    })
    async function getCharacters() {
      const response = (await fetchGQL(queryCharacters, variables)) as any
      if (response.data.characters) {
        state.characters = response.data.characters.results as Character[]
        state.info = response.data.characters.info as Pagination
      }
    }

    function changePage(step: any) {
      variables.page = variables.page + step
      getCharacters()
    }

    return {
      changePage,
      variables,
      state,
      filterCharacters,
    }
  },
})
</script>

<style lang="scss">
.characters {
  background-color: #E7E9EB;
  margin: 0 50px;
  padding: 15px;
  border-radius: 30px;
  > .search {
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
    > input {
      width: 300px;
      height: 30px;
      border-radius: 30px;
    }
  }
  > .pagination {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    align-items: center;
    > button {
      display: inline-block;
      font-size: 17px;
      font-weight: 600;
      background: none;
      background-color: rgba(0, 0, 0, 0);
      border: none;
      padding: 1px 6px;
      margin: 20px;
      cursor: pointer;
      background-color: #7ffa67;
      box-shadow: 0 0 0 3px #02b1c8;
      color: #02b1c8;
    }
  }
}
</style>
