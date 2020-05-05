<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-col min-width="300">
        <v-card-title class="headline">
          みんなのリスト一覧
        </v-card-title>
        <v-text-field
          v-model="serachInput"
          label="リストで名検索"
          outlined
          append-outer-icon="mdi-send"
          @click:append-outer="submitSearch"
          @keyup.enter="submitSearch"
        ></v-text-field>
        <v-card
          class="my-2"
          v-for="(list, index) in listsAndItems"
          :key="index"
        >
          <v-card-title class="title">
            {{ list.name }}の持ち物リスト
          </v-card-title>
          <v-card-text>
            <div
              v-for="(item, i) in list.items"
              :key="`${index}-${i}`"
              @click.prevent="syncListData"
            >
              <p>{{ item.name }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import {
  ListFormDto,
  Item,
  ListsAndItems
} from "../../domains/list/ListFormDto";
import { CreateListApplication } from "../../creates/list/CreateListApplication";

@Component
export default class extends Vue {
  middleware({ store, redirect }: Context) {
    if (!store.state.auth.loggedIn) {
      return redirect("/signin");
    }
  }

  menu = false;
  today = "";
  date = "";
  serachInput = "";

  listsAndItems: ListsAndItems[] = [];
  selected: string[] = [];

  async submitSearch() {
    const token = this.$auth.getToken("local");
    this.listsAndItems = await CreateListApplication(token).GetLists(
      this.serachInput
    );
  }

  async created() {
    this.today = new Date().toISOString().substr(0, 10);
    this.date = this.today;
  }

  @Watch("date")
  async changeList() {
    const token = this.$auth.getToken("local");
    const userID = this.$store.state.auth.user.id;
    this.listsAndItems = await CreateListApplication(token).GetLists(
      this.serachInput
    );
  }
}
</script>
