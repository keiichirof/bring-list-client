<template>
  <v-container fluid justify-center align-center>
    <v-row dense>
      <v-col :cols="6">
        <v-card md="10" class="pa-6" width="500">
          <v-card-title>リストを作成</v-card-title>
          <v-form ref="form">
            <v-text-field
              v-model="listForms.name"
              :rules="listRules"
              label="リスト名"
              outlined
            ></v-text-field>

            <v-combobox
              v-model="listForms.items"
              :items="listForms.items"
              label="ダグを追加"
              multiple
              chips
              cache-items
            ></v-combobox>

            <v-btn color="info" class="ml-4" @click="submit" :disabled="!valid"
              >リストを作成する</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
      <v-col :cols="6">
        <v-card md="10" class="pa-6" width="500">
          <v-card-title>レコメンド</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { ApiClient } from "../../infras/httpAdapters/ApiClient";
import { CreateSaveListApplication } from "../../creates/list/CreateListApplication";
import { ListFormDto } from "../../domains/list/ListFormDto";

@Component
export default class extends Vue {
  middleware({ store, redirect }: Context) {
    if (!store.state.auth.loggedIn) {
      return redirect("/signin");
    }
  }

  valid = false;
  listForms: ListFormDto = {
    name: "",
    userID: 0,
    tags: [],
    items: []
  };

  listRules = [(v: string) => !!v || "リスト名は必須です。"];

  async submit() {
    const token = this.$auth.getToken("local");
    this.listForms.userID = this.$store.state.auth.user.id;
    // this.listForms.name = "kei";
    // const json_token = await CreateSaveListApplication(token).SaveList(
    //   this.listForms
    // );
    console.log(this.$store.state.auth.user);
    console.log(this.listForms);
  }

  @Watch("listForms", { deep: true })
  formStatus() {
    if (this.listForms.name === "") {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }
}
</script>
