<template>
  <q-page class="tw-mx-6">
    <div class=""><q-input v-model="search" label="Search here" /></div>
    <div
      class="tw-grid tw-grid-cols-3 tw-gap-4 tw-justify-items-center tw-mt-5"
    >
      <q-select
        filled
        v-model="sortBy"
        :options="sortOptions"
        label="Brands"
        class="tw-w-[70%]"
      />
    {{brand}}
    </div>
    <div class="tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-5">
      <q-card v-for="(item, index) in data" :key="index" class="my-card">
        <img :src="'http://localhost:3000/storage/' + item?.document?.image" />

        <q-card-section>
          <div class="text-h6">{{ item?.document?.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ item?.document?.description }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { inject, watch } from 'vue';
import { ref } from 'vue';
const data = ref();
const search = ref();
const sortOptions = ['year:desc', 'year:asc', 'price:desc', 'price:asc'];
const sortBy = ref();
const cat = inject('category', null);
const price = inject('price', null);
const brand = inject('brand', null)
const getAllProduct = async () => {
  await axios
    .get('http://localhost:3000/api/product', {
      params: {
        q: search.value,
        category: cat.value? cat.value:null,
        price_min: price.value.min,
        price_max: price.value.max,
        brand: brand.value? brand.value:null,
        sort: sortBy.value,
      },
    })
    .then((response) => {
      console.log(response.data);
      data.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
getAllProduct();
watch(search, getAllProduct);
watch(sortBy, getAllProduct);
watch(price, getAllProduct);
watch(cat, getAllProduct);
watch(brand, getAllProduct);
</script>
