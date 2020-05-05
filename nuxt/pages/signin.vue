<template>
  <v-layout column justify-center align-center>
    <v-card md="10" class="pa-6" width="500">
      <v-card-title>ログイン</v-card-title>
      <v-form ref="form">
        <v-alert v-if="authorizeError" type="error" outlined>
          メールアドレスとパスワードの組み合わせが間違っています。
        </v-alert>
        <v-text-field
          v-model="forms.email"
          :rules="emailRules"
          label="メールアドレス"
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
    <v-btn color="success" class="ma-4" @click="submitAdmin">
      お試しユーザーでログイン
    </v-btn>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import Logo from "../components/Logo.vue";
import { SigninFromDto } from "../domains/auth/AuthFromsDto";
import { CreateAuthApplication } from "../creates/auth/CreateAuthApplication";

@Component
export default class extends Vue {
  valid = false;
  forms: SigninFromDto = {
    email: "",
    password: ""
  };
  emailRules = [
    (v: string) => !!v || "メールアドレスは必須です。",
    (v: string) =>
      /.+@.+\..+/.test(v) || "正しい形式のメールアドレスを入力してください。"
  ];
  authorizeError = false;
  hidePassword = true;
  passwordRules = [
    (v: string) => !!v || "パスワードは必須です。",
    (v: string) => (v && v.length >= 8) || "パスワードは8文字以上必要です。"
  ];

  @Watch("forms", { deep: true })
  formStatus() {
    if (this.forms.email === "" || !/.+@.+\..+/.test(this.forms.email)) {
      this.valid = false;
    } else if (this.forms.password === "" || this.forms.password.length < 8) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  async submit() {
    try {
      const json_token = await CreateAuthApplication().Signin(this.forms);
      this.$auth.setToken("local", json_token.token);

      var jwtDecode = require("jwt-decode");
      var decoded = jwtDecode(json_token.token);
      this.$auth.setUser(decoded);

      this.$router.push({
        path: "/"
      });
    } catch (err) {
      if (err.response.status === 401) {
        this.authorizeError = true;
      }
    }
  }

  async submitAdmin() {
    this.forms.email = "a@a.a";
    this.forms.password = "87654321";
    try {
      const json_token = await CreateAuthApplication().Signin(this.forms);
      this.$auth.setToken("local", json_token.token);

      var jwtDecode = require("jwt-decode");
      var decoded = jwtDecode(json_token.token);
      this.$auth.setUser(decoded);

      this.$router.push({
        path: "/"
      });
    } catch (err) {
      if (err.response.status === 401) {
        this.authorizeError = true;
      }
    }
  }

  showSignup() {
    this.$router.push({
      path: `/signup`
    });
  }
}
</script>
