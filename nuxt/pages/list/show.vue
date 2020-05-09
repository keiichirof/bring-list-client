<template>
  <v-layout column justify-center align-center>
    <v-alert dense v-if="alert" text type="success">
      マイリストに追加しました
      <v-btn icon @click="alert = false">
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </v-alert>
    <v-flex xs12 sm8 md6>
      <v-col>
        <v-card class="pa-4">
          <v-card-title class="headline">みんなのリスト一覧</v-card-title>
          <v-text-field
            dense
            v-model="serachInput"
            label="リストで名検索"
            outlined
            append-icon="mdi-send"
            @click:append="submitSearch"
            @keyup.enter="submitSearch"
            class="mx-2"
          ></v-text-field>
          <v-card-title class="subtitle-1 py-2">リストを並べ替える</v-card-title>
          <v-btn class="ma-2" color="primary" outlined @click="sortDownload">リストダウンロード数</v-btn>
          <v-btn class="ma-2" color="primary" outlined @click="sortCreatedAt">リスト作成最新順</v-btn>
          <v-card
            class="my-2 pa-2"
            v-for="(list, index) in listsForView"
            :key="index"
            :color="'#385F73'"
            dark
          >
            作成日 : {{ new Date(list.createdAt).toLocaleDateString() }}
            <v-card-title class="title">
              {{ list.name }}の持ち物リスト
              <v-badge :content="`${list.download}`" color="green" class="ml-auto mr-2">
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" @click="inMyList(index)">mdi-arrow-down-bold-circle</v-icon>
                  </template>
                  <span>マイリストに追加</span>
                </v-tooltip>
              </v-badge>
            </v-card-title>
            <v-card-text>
              <div
                v-for="(item, i) in list.items"
                :key="`${index}-${i}`"
                @click.prevent="syncListData"
                class="my-2"
              >
                <p class="subtitle-1">{{ item.name }} : {{ item.tagin }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" width="500">
        <v-card class="pa-5">
          <v-menu v-model="menu" :close-on-content-click="false" min-width="200px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="listForms.date" label="リストの実行日" readonly v-on="on"></v-text-field>
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
  ListsForView
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

  listsForView: ListsForView[] = [];
  selected: string[] = [];

  listForms: ListFormDto = {
    parentID: 0,
    name: "",
    userID: 0,
    tags: [],
    items: [],
    date: new Date().toISOString().substr(0, 10),
    isTemplate: true
  };

  async submitSearch() {
    const token = this.$auth.getToken("local");
    this.listsForView = await CreateListApplication(token).GetLists(
      this.serachInput
    );
  }

  async created() {
    this.today = new Date().toISOString().substr(0, 10);
    this.date = this.today;
  }

  inMyList(index: number) {
    this.dialog = true;
    this.listForms.name = this.listsForView[index].name;
    this.listForms.userID = this.$store.state.auth.user.id;
    this.listForms.parentID = this.listsForView[index].id;

    this.listsForView[index].items.forEach(item => {
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
    this.listsForView = await CreateListApplication(token).GetLists(
      this.serachInput
    );
  }

  sortDownload() {
    this.listsForView.sort(function(a, b) {
      if (a.download < b.download) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  sortCreatedAt() {
    this.listsForView.sort(function(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
</script>
