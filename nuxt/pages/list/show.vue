<template>
  <v-layout column justify-center align-center>
    <v-alert dense v-if="alert" text type="success">
      マイリストに追加しました
      <v-btn icon @click="alert = false">
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </v-alert>
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
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="inMyList(index)">
                  <v-icon color="black">mdi-arrow-down-bold-circle</v-icon>
                </v-btn>
              </template>
              <span>マイリストに追加</span>
            </v-tooltip>
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
      <v-dialog v-model="dialog" width="500">
        <v-card class="pa-5">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            min-width="200px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="listForms.date"
                label="リストの実行日"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :day-format="date => new Date(date).getDate()"
              v-model="listForms.date"
              @input="menu = false"
              locale="ja"
            ></v-date-picker>
          </v-menu>
          <v-btn @click="submit">ok</v-btn>
        </v-card>
      </v-dialog>
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
  dialog = false;
  alert = false;

  listsAndItems: ListsAndItems[] = [];
  selected: string[] = [];

  listForms: ListFormDto = {
    name: "",
    userID: 0,
    tags: [],
    items: [],
    date: new Date().toISOString().substr(0, 10)
  };

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

  inMyList(index: number) {
    this.dialog = true;
    this.listForms.name = this.listsAndItems[index].name;
    this.listForms.userID = this.$store.state.auth.user.id;

    this.listsAndItems[index].items.forEach(item => {
      let obj = {
        tagin: 0,
        name: item.name
      };
      this.listForms.items.push(obj);
    });
  }

  async submit() {
    const token = this.$auth.getToken("local");
    const json_token = await CreateListApplication(token).SaveList(
      this.listForms
    );
    this.dialog = false;
    this.alert = true;
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
