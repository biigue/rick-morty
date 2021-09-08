<template>
  <div class="character">
    <img :src="character.image" :alt="character.name" />
    <h4>{{ character.name }}</h4>
    <div class="line">
      <div class="content">
        <p class="title">Status</p>
        <p class="text">
          {{ character.status }}
        </p>
      </div>
      <div class="content">
        <p class="title">Tipo</p>
        <p class="text">
          {{ character.type }}
        </p>
      </div>
      <div class="content">
        <p class="title">Gênero</p>
        <p class="text">
          {{ character.gender }}
        </p>
      </div>
      <div class="content">
        <p class="title">Espécie</p>
        <p class="text">
          {{ character.species }}
        </p>
      </div>
    </div>
    <h4 class="about">Localização</h4>
    <div class="line">
      <div class="content">
        <p class="title">Nome</p>
        <p class="text">
          {{ character.location?.name }}
        </p>
      </div>
      <div class="content">
        <p class="title">Tipo</p>
        <p class="text">
          {{ character.location?.type }}
        </p>
      </div>
      <div class="content">
        <p class="title">Dimensão</p>
        <p class="text">
          {{ character.location?.dimension }}
        </p>
      </div>
    </div>
    <h4 class="about">Origem</h4>
    <div class="line">
      <div class="content">
        <p class="title">Nome</p>
        <p class="text">
          {{ character.origin?.name }}
        </p>
      </div>
      <div class="content">
        <p class="title">Tipo</p>
        <p class="text">
          {{ character.origin?.type }}
        </p>
      </div>
      <div class="content">
        <p class="title">Dimensão</p>
        <p class="text">
          {{ character.origin?.dimension }}
        </p>
      </div>
    </div>
    <h4 class="about">Episódios</h4>
    <Table v-if="character.episode">
      <tr v-for="(item, index) in character.episode" :key="index" @click="goToEpisode(item.id)">
        <td class="-name">
          {{ item.episode }}
        </td>
        <td>
          {{ item.name }}
        </td>
        <td>
          {{ new Intl.DateTimeFormat("pt-BR").format(new Date(item.air_date)) }}
        </td>
      </tr>
    </Table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import { fetchGQL } from '../utils'
import { Character } from '../types'
import queryCharacter from '../graphql/queryCharacter.gql'
import { useRouter, useRoute } from 'vue-router'
import Table from '../components/table.vue'

export default defineComponent({
  name: 'Character',
  components: { Table },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const character = ref<Character>({
      id: '',
      name: '',
      species: '',
      status: '',
      image: '',
      type: '',
      gender: '',
    })
    const variables = ref({
      id: 0,
    })

    onMounted(() => {
      variables.value.id = +route.params.id
      getCharacter()
    })

    async function getCharacter() {
      const response = (await fetchGQL(queryCharacter, variables.value)) as any
      if (response.data.character) {
        character.value = response.data.character
      }
    }

    function goToEpisode(id: string) {
      router.push({ name: 'episode', params: { id } })
    }

    return {
      character,
      goToEpisode,
    }
  },
})
</script>

<style lang="scss">
.character {
  background-color: #e7e9eb;
  margin: 0 50px;
  padding: 40px 40px 40px 40px;
  border-radius: 30px;
  > img {
    display: flex;
    margin: auto;
    border-radius: 30px;
    padding-top: 10px;
  }
  h4 {
    margin-top: 20px;
    font-size: 30px;
    line-height: 1;
    color: #02b1c8;
    margin-bottom: 30px;
    text-shadow: 0.02em 0.02em 0.02em #7ffa67, -0.02em -0.02em 0.02em #7ffa67, 0 0 0.2em #7ffa67;
    animation: textShadow 2s linear infinite alternate;
  }
  > .about {
    font-size: 20px;
    margin-bottom: 5px;
  }
  > .line {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    > .content {
      flex: 1;
      > .title {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
      }
      > .text {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
      }
    }
  }
}
</style>
