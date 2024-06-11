<template>
  <q-page class="tw-container tw-mx-auto">
    <q-form @submit="onSubmit">
      <q-input
        v-model="name"
        label="name"
        error-message="Please enter a valid name"
        :error="errors.name"
      />
      <q-input
        v-model="description"
        label="description"
        error-message="Please enter a valid description"
        :error="errors.description"
      />
      <q-input
        v-model="year"
        label="year"
        type="number"
        error-message="Please enter a valid year"
        :error="errors.year"
      />
      <q-input
        v-model="price"
        label="price"
        type="number"
        error-message="Please enter a valid price"
        :error="errors.price"
      />
      <q-select
        filled
        v-model="category"
        :options="categoryOptions"
        option-value="id"
        option-label="name"
        label="Categories"
        class="tw-w-[70%]"
      />
      <q-select
        filled
        v-model="brand"
        :options="brandOptions"
        option-value="id"
        option-label="name"
        label="Brands"
        class="tw-w-[70%]"
      />
      <q-input
        v-model="image"
        label="image"
        type="file"
        error-message="Please enter a valid image"
        :error="errors.image"
      />
      <q-btn type="submit" label="Login" />
    </q-form>
    <RouterLink to="register">do not have any account</RouterLink>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'stores/auth.store';
import { useForm, useField } from 'vee-validate';
import { ref } from 'vue';
import axios from 'axios';

const authStore = useAuthStore();
console.log(authStore.token)
const categoryOptions = ref()
const brandOptions = ref()
const { handleSubmit, errors } = useForm();
const { value: name } = useField('name');
const { value: description } = useField('description');
const { value: price } = useField('price');
const { value: year } = useField('year');
const { value: category } = useField('category');
const { value: brand } = useField('brand');
const { value: image } = useField('image');

const getCategories = async () => {
  await axios
    .get("http://localhost:3000/api/category")
    .then((response) => {
      console.log(response.data);
      categoryOptions.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
getCategories()
const getBrands = async () => {
  await axios
    .get("http://localhost:3000/api/brand")
    .then((response) => {
      console.log(response.data);
      brandOptions.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
getBrands()
const onSubmit = handleSubmit(async (values) => {
  alert(authStore.token)
  try {
    // Form submission logic here
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('year', values.year);
    formData.append('price', values.price);
    formData.append('category', values.category.id);
    formData.append('brand', values.category.id);
    formData.append('image', values.image[0]);

    const response = await axios.post('http://localhost:3000/api/product', formData,{
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    alert('Product created successfully')
    console.log(response);
  } catch (error) {
    console.error('Failed to create product:', error);
  }
});
</script>
