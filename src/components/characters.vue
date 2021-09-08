<template>
  <div class="cards-character">
    <div
      class="infos"
      v-for="character in characters"
      :key="character.id"
      @click="goToCharacter(character.id)"
    >
      <img :src="character.image" :alt="character.name" />
      <div class="about">
        <h3>
          {{ character.name }}<span> ({{ character.status }})</span>
        </h3>
        <p>Specie: {{ character.species }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Character } from '../types'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Characters-List',
  props: {
    characters: {
      type: Array as PropType<Character[]>,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter()
    function goToCharacter(id: string) {
      router.push({ name: 'character', params: { id } })
    }
    return {
      goToCharacter,
    }
  },
})
</script>

<style lang="scss">
.cards-character {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > .infos {
    background-color: white;
    margin-bottom: 50px;
    cursor: pointer;
    > img {
      border-radius: 10px;
    }
    > .about {
      text-align: center;
      > h3 {
        color: #639858;
        > span {
          color: #b0b3b6;
          text-transform: lowercase;
        }
      }
    }
  }
}
</style>
