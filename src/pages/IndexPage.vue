<template>
  <q-page class="tw-mx-6">
    <ais-instant-search index-name="Product" :search-client="searchClient">
      <ais-search-box placeholder="نام آگهی را جست و جو کنید">
        <template #submit-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            width="16"
            height="16"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.67"
              transform="translate(1 1)"
            >
              <circle cx="7.11" cy="7.11" r="7.11" />
              <path d="M16 16l-3.87-3.87" />
            </g>
          </svg>
        </template>
      </ais-search-box>
      <div class="tw-flex tw-flex-row tw-gap-5">
        <div class="tw-basis-1/4 tw-shadow-lg tw-rounded-lg tw-p-5">
          <ais-hierarchical-menu
            :attributes="[
              'categories.lvl0',
              'categories.lvl1',
              'categories.lvl2',
              'categories.lvl3',
            ]"
          />
          <ais-refinement-list
            attribute="brand"
            searchable
            searchable-placeholder="Search for brands…"
          />
        </div>
        <div class="tw-basis-3/4">
          <ais-hits>
            <template v-slot="{ items }">
              <div class="tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-5">
                <q-card
                  v-for="(item, index) in items"
                  :key="index"
                  class="my-card"
                >
                  <img :src="'http://localhost:3001/storage/' + item.image" />

                  <q-card-section>
                    <div class="text-h6">{{ item.name }}</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    {{ item.description }}
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </ais-hits>
        </div>
      </div>
    </ais-instant-search>
  </q-page>
</template>

<script setup>
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import '../css/price-slider.scss';
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'ZPKzDdH53v0dWMC5p5k5ypqhv4Y3pQSPi1prLBt5cyEuNuKT',
    nodes: [
      {
        host: 'localhost',
        port: '8108',
        protocol: 'http',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'name,description',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
</script>
<style lang="scss">
.ais-HierarchicalMenu-list--child {
  margin-left: 24px;
}
</style>
