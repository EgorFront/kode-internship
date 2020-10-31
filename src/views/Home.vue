<template>
  <div class="home">
    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="3">
          <v-card class="filter-card">
            <v-card-title>Фильтры</v-card-title>
            <v-select
              v-model="currentType"
              :items="pokemonTypes"
              multiple
              label="Тип покемона"
              solo
              class="mt-2"
            ></v-select>
            <v-select
              v-model="currentSubtype"
              :items="pokemonSubtypes"
              multiple
              label="Подтип покемона"
              solo
              class="mt-4"
            ></v-select>

            <v-card-actions>
              <v-btn
                color="primary"
                block
                @click=";(pagination.page = 1), fetchPokemonsData()"
              >
                Поиск
              </v-btn>
            </v-card-actions>
          </v-card>

          <span></span>
        </v-col>

        <v-col cols="9">
          <v-row v-if="pokemonsData.length" class="mt-n2">
            <v-col v-for="(card, i) in pokemonsData" :key="i" cols="3">
              <v-card class="mx-auto">
                <v-img class="card-img" contain :src="card.imageUrl">
                  <v-app-bar dense flat color="rgba(0, 0, 0, .5)">
                    <v-toolbar-title class="title white--text pl-0">
                      ID: {{ card.id }}
                    </v-toolbar-title>
                  </v-app-bar>
                  <div class="card-img-details" @click="openQuickView(card.id)">
                    <v-icon large color="blue">mdi-magnify-plus-outline</v-icon>
                  </div>
                </v-img>

                <v-card-title>{{ card.name }}</v-card-title>

                <v-card-text>
                  <p class="subtitle-1">
                    Типы: <b>{{ card.types }}</b>
                  </p>

                  <p class="subtitle-1">
                    Подтип: <b>"{{ card.subtype }}"</b>
                  </p>
                </v-card-text>

                <v-divider class="mx-2"></v-divider>

                <v-card-actions>
                  <v-btn block color="deep-purple lighten-2" text>
                    Детальный обзор
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-else class="mt-n2">
            <v-col v-for="i in 8" :key="i" cols="3">
              <v-skeleton-loader
                type="card-avatar, article, actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>

          <div class="justify-center d-flex mt-4">
            <div style="max-width: 500px">
              <v-pagination
                v-if="pagination.pages"
                v-model="pagination.page"
                class="my-0"
                :length="pagination.pages"
              ></v-pagination>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <pokemonQuickView
      v-model="quickView.isOpen"
      :loading="quickView.isLoading"
      :pokemon-data="quickView.data"
    />
  </div>
</template>

<script>
import Service from '@service'
import pokemonQuickView from '@components/pokemon-quick-view.vue'
import wait from '@/src/utils/wait'

export default {
  name: 'Home',
  components: {
    pokemonQuickView,
  },

  data() {
    return {
      currentType: [],
      currentSubtype: [],

      pokemonTypes: [],
      pokemonSubtypes: [],

      pokemonsData: [],

      quickView: {
        isOpen: false,
        isLoading: false,
        data: {},
      },

      pagination: {
        page: 1,
        pages: 0,
      },
    }
  },

  watch: {
    'pagination.page'() {
      this.fetchPokemonsData()
    },
  },

  async mounted() {
    await Promise.all([this.fetchTypesInfo(), this.fetchSubtypesInfo()])
    this.fetchPokemonsData()
  },

  methods: {
    async fetchTypesInfo() {
      try {
        const { data } = await Service.get('/types')

        this.pokemonTypes = data.types
      } catch (e) {
        console.error(e)
        alert('Ошибка получения информации о возможных типах: ', e.message)
      }
    },

    async fetchSubtypesInfo() {
      try {
        const { data } = await Service.get('/subtypes')
        this.pokemonSubtypes = data.subtypes
      } catch (e) {
        console.error(e)
        alert('Ошибка получения информации о возможных типах: ', e.message)
      }
    },

    async fetchPokemonsData() {
      try {
        const response = await Service.get('/cards', {
          params: {
            types: this.currentType.join(','),
            subtypes: this.currentSubtype.join(','),
            page: this.pagination.page,
            pageSize: 16,
          },
        })

        this.pagination.pages = Math.ceil(
          +response.headers['total-count'] / +response.headers['page-size']
        )

        this.pokemonsData = response.data.cards
      } catch (e) {
        console.error(e)
        alert('Ошибка при получении данных о покемонах: ', e.message)
      }
    },

    async openQuickView(id) {
      this.quickView.isOpen = true

      try {
        this.quickView.isLoading = true
        const { data } = await Service.get(`/cards/${id}`)
        await wait(500)
        this.quickView.data = data.card
      } catch (e) {
        console.error(e)
        alert('Ошибка загрузки данных о покемоне: ', id)
      } finally {
        this.quickView.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-card {
  position: sticky;
  top: 85px;
  padding: 1rem;
}

.card-img {
  position: relative;

  &:hover {
    .card-img-details {
      opacity: 1;
    }
  }

  &-details {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: 0.3s;
  }
}
</style>
