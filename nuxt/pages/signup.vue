<template>
  <v-layout column justify-center align-center>
    <v-card md="10" class="pa-6" width="500">
      <v-card-title>アカウントの作成</v-card-title>
      <v-form ref="form">
        <v-text-field v-model="forms.name" :counter="10" :rules="nameRules" label="ユーザ名"></v-text-field>
        <v-text-field
          v-model="forms.email"
          :rules="emailRules"
          label="メールアドレス"
          :error-messages="
            emailError ? 'こちらのメールアドレスは既に登録されています' : ''
          "
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

        <v-text-field
          v-model="passwordConfirm"
          :append-icon="hidePasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          :type="hidePasswordConfirm ? 'password' : 'text'"
          label="パスワード(確認用)"
          hint="8文字以上"
          counter
          :rules="passwordConfirmRules"
          @click:append="hidePasswordConfirm = !hidePasswordConfirm"
        ></v-text-field>

        <v-btn color="primary" @click="submit" :disabled="!valid || !confirmValid">アカウントを作成する</v-btn>
        <v-btn color="info" class="ml-4" @click="showSignin">アカウントをお持ちの方</v-btn>
      </v-form>
    </v-card>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import Logo from "../components/Logo.vue";
import { SignupFromDto } from "../domains/auth/AuthFromsDto";
import { CreateAuthApplication } from "../creates/auth/CreateAuthApplication";

@Component
export default class extends Vue {
  valid = false;
  confirmValid = false;
  forms: SignupFromDto = {
    name: "",
    email: "",
    password: ""
  };
  passwordConfirm: string = "";
  nameRules = [
    (v: string) => !!v || "ユーザ名は必須です。",
    (v: string) => (v && v.length <= 10) || "ユーザ名は最大10文字です。"
  ];
  emailError = false;
  emailRules = [
    (v: string) => !!v || "メールアドレスは必須です。",
    (v: string) =>
      /.+@.+\..+/.test(v) || "正しい形式のメールアドレスを入力してください。"
  ];
  hidePassword = true;
  passwordRules = [
    (v: string) => !!v || "パスワードは必須です。",
    (v: string) => (v && v.length >= 8) || "パスワードは8文字以上必要です。"
  ];
  hidePasswordConfirm = true;
  passwordConfirmRules = [
    (v: string) => !!v || "パスワードの確認は必須です。",
    (v: string) => v === this.forms.password || "パスワードが一致しません。"
  ];

  @Watch("forms", { deep: true })
  formStatus() {
    if (this.forms.name === "" || this.forms.name.length > 10) {
      this.valid = false;
    } else if (this.forms.email === "" || !/.+@.+\..+/.test(this.forms.email)) {
      this.valid = false;
    } else if (this.forms.password === "" || this.forms.password.length < 8) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }

  @Watch("passwordConfirm", { deep: true })
  passwordConfirmStatus() {
    if (
      this.passwordConfirm === "" ||
      this.passwordConfirm !== this.forms.password
    ) {
      this.confirmValid = false;
    } else {
      this.confirmValid = true;
    }
  }

  async submit() {
    try {
      const json_token = await CreateAuthApplication().Signup(this.forms);
      this.$auth.setToken("local", json_token.token);
      this.$auth.setUser({
        email: this.forms.email
      });
      this.$router.push({
        path: "/"
      });
    } catch (err) {
      if (err.response.status === 409) {
        this.emailError = true;
      }
    }
  }

  showSignin() {
    this.$router.push({
      path: `/signin`
    });
  }
}
</script>
