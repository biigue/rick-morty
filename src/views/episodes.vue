<template>
  <div class="episode">
    <h4>{{ episode?.episode }} - {{ episode?.name }}</h4>
    <h5 v-if="episode?.air_date">
      ({{ new Intl.DateTimeFormat('pt-BR').format(new Date(episode?.air_date)) }})
    </h5>
    <h5 class="about">Personagens que participaram do episódio</h5>
    <CharactersList :characters="episode?.characters" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import { fetchGQL } from '../utils'
import { ListEpisodes } from '../types'
import queryEpisode from '../graphql/queryEpisode.gql'
import { useRouter, useRoute } from 'vue-router'
import CharactersList from '../components/characters.vue'


export default defineComponent({
  name: 'Episodes',
  components: { CharactersList },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const episode = ref<ListEpisodes>()
    const variables = ref({
      id: 0,
    })

    onMounted(() => {
      variables.value.id = +route.params.id
      getEpisode()
    })

    async function getEpisode() {
      const response = (await fetchGQL(queryEpisode, variables.value)) as any
      if (response.data.episode) {
        episode.value = response.data.episode
      }
    }

    function goToCharacter(id: string) {
      router.push({ name: 'character', params: { id } })
    }

    return {
      episode,
      goToCharacter,
    }
  },
})
</script>

<style lang="scss">
.episode {
  background-color: #e7e9eb;
  margin: 0 50px;
  padding: 40px 40px 40px 40px;
  border-radius: 30px;
  h4 {
    margin-top: 20px;
    font-size: 40px;
    line-height: 2px;
    color: #02b1c8;
    margin-bottom: 0;
    text-shadow: 0.02em 0.02em 0.02em #7ffa67, -0.02em -0.02em 0.02em #7ffa67, 0 0 0.2em #7ffa67;
    animation: textShadow 2s linear infinite alternate;
    text-align: center;
  }
  h5 {
    text-align: center;
    font-size: 24px;
    line-height: 1;
    color: #02b1c8;
    margin-bottom: 30px;
    text-shadow: 0.02em 0.02em 0.02em #7ffa67, -0.02em -0.02em 0.02em #7ffa67, 0 0 0.2em #7ffa67;
    animation: textShadow 2s linear infinite alternate;
  }
  .about {
    color: black;
    text-align: center;
  }
}
</style>

