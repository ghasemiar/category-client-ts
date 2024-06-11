<template>
  <q-page class="tw-container tw-mx-auto">
    <q-form @submit="onSubmit">
      <q-input
        v-model="username"
        label="Username"
        error-message="Please enter a valid username"
        :error="errors.username"
      />
      <q-input
        v-model="name"
        label="name"
        error-message="Please enter a valid name"
        :error="errors.name"
      />
      <q-input
        v-model="email"
        label="email"
        error-message="Please enter a valid email"
        :error="errors.email"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        error-message="Please enter a valid password"
        :error="errors.password"
      />
      {{username}}
      {{password}}
      {{name}},
      {{email}}
      <q-btn type="submit" label="Login" />
    </q-form>
    <RouterLink to="register">do not have any account</RouterLink>
  </q-page>
</template>

<script>
import { useAuthStore } from '../Store/Store.Auth';
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

export default {
  setup() {
    const authStore = useAuthStore();

    const schema = yup.object({
      username: yup.string().required('Username is required'),
      name: yup.string().required('name is required'),
      email: yup.string().required('email is required'),
      password: yup.string().required('Password is required'),
    });

    const {handleSubmit, errors} = useForm({
      validationSchema: schema,
    });

    const {value: username} = useField('username');
    const {value: name} = useField('name');
    const {value: email} = useField('email');
    const {value: password} = useField('password');

    const onSubmit = handleSubmit(values => {
      authStore.register(values)
      if (authStore.isAuthenticated()) {
        alert("hi")
      }
    });

    return {
      username,
      email,
      name,
      password,
      errors,
      onSubmit
    };
  },
};
</script>
