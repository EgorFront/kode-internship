<script>
import Service from '@service'
export default {
  name: 'PokemonDetails',
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      pokemonData: {},
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      try {
        const { data } = await Service.get(`/cards/${this.id}`)

        this.pokemonData = data.card
      } catch (error) {
        console.error(error)
        alert(`Ошибка загрузки данных о покемоне ${this.id}:`)
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>

<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col cols="12">
        <v-btn :to="{ name: 'home' }" color="primary">
          <v-icon>mdi-arrow-left</v-icon>
          Назад
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-img width="100%" contain :src="pokemonData.imageUrlHiRes"></v-img>
        <v-spacer></v-spacer>
      </v-col>

      <v-col cols="8">
        <p class="title">
          Имя: <b>{{ pokemonData.name }}</b>
        </p>
        <p class="title">
          Типы: <b>{{ pokemonData.types }}</b>
        </p>
        <p class="title">
          Подтипы: <b>{{ pokemonData.subtype }}</b>
        </p>

        <v-divider light class="my-2"></v-divider>

        <h2 class="mb-4">Атаки:</h2>
        <v-simple-table>
          <template v-slot>
            <thead>
              <tr>
                <th class="text-left">
                  Стоимость
                </th>
                <th>
                  Имя
                </th>
                <th>
                  Описание
                </th>
                <th>
                  Урон
                </th>
                <th>
                  Энергия
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pokemonData.attacks" :key="item.name">
                <td>{{ item.cost }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.text || '-' }}</td>
                <td>{{ item.damage }}</td>
                <td>{{ item.convertedEnergyCost }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-row class="mt-4">
          <v-col cols="6">
            <h2 class="mb-4">Cопротивление</h2>
            <v-simple-table>
              <template v-slot>
                <thead>
                  <tr>
                    <th class="text-left">
                      Тип
                    </th>
                    <th>
                      Значение
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in pokemonData.resistances" :key="item.type">
                    <td>{{ item.type }}</td>
                    <td>{{ item.value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="6">
            <h2 class="mb-4">Слабости</h2>
            <v-simple-table>
              <template v-slot>
                <thead>
                  <tr>
                    <th class="text-left">
                      Тип
                    </th>
                    <th>
                      Значение
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in pokemonData.weaknesses" :key="item.type">
                    <td>{{ item.type }}</td>
                    <td>{{ item.value }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
