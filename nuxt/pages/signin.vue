<template>
  <v-layout column justify-center align-center>
    <v-card md="10" class="pa-6" width="500">
      <v-card-title>ログイン</v-card-title>
      <v-form ref="form">
        <v-text-field
          v-model="forms.name"
          :counter="10"
          :rules="nameRules"
          label="ユーザ名"
        ></v-text-field>

        <v-text-field
          v-model="forms.password"
          :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="hidePassword ? 'password' : 'text'"
          label="パスワード"
          hint="8文字以上"
          counter
          :rules="passwordRules"
          @click:append="hidePassword = !hidePassword"
        ></v-text-field>

        <v-btn color="primary" @click="submit" :disabled="!valid"
          >ログインする</v-btn
        >
        <v-btn color="info" class="ml-4" @click="showSignup"
          >アカウントをお持ちでない方</v-btn
        >
      </v-form>
    </v-card>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import Logo from "../components/Logo.vue";
import { SignupFromDto } from "../domains/signup/SignupFromDto";

@Component
export default class extends Vue {
  valid = false;
  forms: SignupFromDto = {
    name: "",
    email: "",
    password: ""
  };
  nameRules = [
    (v: string) => !!v || "ユーザ名は必須です。",
    (v: string) => (v && v.length <= 10) || "ユーザ名は最大10文字です。"
  ];
  hidePassword = true;
  passwordRules = [
    (v: string) => !!v || "パスワードは必須です。",
    (v: string) => (v && v.length >= 8) || "パスワードは8文字以上必要です。"
  ];

  @Watch("forms", { deep: true })
  formStatus() {
    if (this.forms.name === "" || this.forms.name.length > 10) {
      this.valid = false;
    } else if (this.forms.password === "" || this.forms.password.length < 8) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  submit() {
    console.log(this.forms);
  }

  showSignup() {
    this.$router.push({
      path: `/signup`
    });
  }
}
</script>
