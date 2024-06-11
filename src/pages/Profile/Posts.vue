<template>
  <q-page class="tw-mx-5">
    <div class="tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-5 ">
      <q-card v-for="(item, index) in data" :key="index" class="my-card">
        <img :src="'http://localhost:3000/storage/'+item?.image">

        <q-card-section>
          <div class="text-h6">{{item?.name}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ item?.description }}
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-btn @click="deleteProduct(item?.id)" color="red">delete</q-btn>
          <edit-product />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import {useAuthStore} from "src/Store/Store.Auth";
import EditProduct from 'components/EditProduct.vue';
const data = ref();
const getAllProduct = async () => {
  await axios
    .get("http://localhost:3000/api/products-user", {
      headers:{Authorization: `Bearer ${useAuthStore().token}`}
    })
    .then((response) => {
      console.log(response.data)
      data.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
getAllProduct();

const deleteProduct = async (id) => {
  await axios
    .delete(`http://localhost:3000/api/product/${id}`, {
      headers:{Authorization: `Bearer ${useAuthStore().token}`}
    })
    .then((response) => {
      console.log(response.data,"deleted")
      getAllProduct()
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
