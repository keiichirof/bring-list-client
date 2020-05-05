<template>
  <v-layout column justify-center align-center>
    <v-alert dense v-if="alert" text type="success">
      リストを削除しました
      <v-btn icon @click="alert = false">
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </v-alert>
    <v-flex xs12 sm8 md6>
      <v-col>
        <v-card min-width="350">
          <v-card-title class="headline">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="リストの日付を選択してください"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                :day-format="date => new Date(date).getDate()"
                v-model="date"
                @input="menu = false"
                locale="ja"
              ></v-date-picker>
            </v-menu>
          </v-card-title>
        </v-card>
        <v-card
          v-for="(list, index) in listsAndItems"
          :key="index"
          class="my-2"
        >
          <v-card-title class="title">
            {{ list.name }}の持ち物リスト
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="deleteList(index)">
                  <v-icon color="black">mdi-close-circle</v-icon>
                </v-btn>
              </template>
              <span>リストを削除</span>
            </v-tooltip>
          </v-card-title>
          <v-card-text>
            <div
              v-for="(item, i) in list.items"
              :key="`${index}-${i}`"
              @click.prevent="syncListData"
            >
              <v-checkbox
                v-model="selected"
                :label="item.name"
                :value="`${index}-${i}`"
                v-if="today === date"
              ></v-checkbox>
              <p v-else>{{ item.name }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-flex>
    <v-dialog v-model="dialog" width="500">
      <v-card class="pa-5">
        本当に削除しますか？
        <v-btn style="float: right;" @click="submit">ok</v-btn>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import Logo from "../components/Logo.vue";
import { Context } from "@nuxt/types";
import { ListFormDto, Item, ListsAndItems } from "../domains/list/ListFormDto";
import { CreateListApplication } from "../creates/list/CreateListApplication";

@Component
export default class extends Vue {
  middleware({ store, redirect }: Context) {
    if (!store.state.auth.loggedIn) {
      return redirect("/signin");
    }
  }

  dialog = false;
  menu = false;
  today = "";
  date = "";
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

  async deleteList(index: number) {
    this.dialog = true;
    this.listForms.name = this.listsAndItems[index].name;
    this.listForms.userID = this.$store.state.auth.user.id;

    if (this.listsAndItems[index].items !== null) {
      this.listsAndItems[index].items.forEach(item => {
        let obj = {
          tagin: 0,
          name: item.name
        };
        this.listForms.items.push(obj);
      });
    }
  }

  async submit() {
    const token = this.$auth.getToken("local");
    this.listsAndItems = await CreateListApplication(token).DeleteList(
      this.listForms
    );
    this.dialog = false;
    this.alert = true;
  }

  syncListData() {
    this.$store.commit("list/syncListData", {
      today: this.today,
      selected: this.selected
    });
  }

  created() {
    this.today = new Date().toISOString().substr(0, 10);
    this.date = this.today;
  }

  async getList() {
    const token = this.$auth.getToken("local");
    const userID = this.$store.state.auth.user.id;
    this.listsAndItems = await CreateListApplication(token).GetDayLists(
      userID,
      this.date
    );
  }

  @Watch("date")
  changeList() {
    this.getList();
  }
}
</script>
