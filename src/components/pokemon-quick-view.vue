<script>
export default {
  name: 'PokemonQuickView',

  model: {
    value: 'value',
    event: 'input',
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },

    value: {
      type: Boolean,
      default: false,
    },

    pokemonData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<template>
  <v-dialog
    :value="value"
    max-width="480px"
    @input="(value) => $emit('input', value)"
  >
    <v-card v-if="loading">
      <v-card-text>
        Загрузка данных
        <v-progress-linear
          indeterminate
          color="blue"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-img class="card-img" contain :src="pokemonData.imageUrlHiRes">
        <v-app-bar dense flat color="rgba(0, 0, 0, .5)">
          <v-toolbar-title class="title white--text pl-0">
            ID: {{ pokemonData.id }}
          </v-toolbar-title>
        </v-app-bar>
      </v-img>

      <v-card-title>{{ pokemonData.name }}</v-card-title>

      <v-card-text>
        <p class="subtitle-1">
          Типы: <b>{{ pokemonData.types }}</b>
        </p>

        <p class="subtitle-1">
          Подтип: <b>"{{ pokemonData.subtype }}"</b>
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
