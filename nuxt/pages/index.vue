<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card min-width="300">
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
        <div v-for="(list, index) in listsAndItems" :key="index">
          <v-card-title class="title">
            {{ list.name }}の持ち物リスト
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
        </div>
      </v-card>
    </v-flex>
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

  menu = false;
  today = "";
  date = "";

  listsAndItems: ListsAndItems[] = [];
  selected: string[] = [];

  syncListData() {
    this.$store.commit("list/syncListData", {
      today: this.today,
      selected: this.selected
    });
  }

  async created() {
    this.today = new Date().toISOString().substr(0, 10);
    this.date = this.today;
  }

  @Watch("date")
  async changeList() {
    const token = this.$auth.getToken("local");
    const userID = this.$store.state.auth.user.id;
    this.listsAndItems = await CreateListApplication(token).GetDayLists(
      userID,
      this.date
    );
  }
}
</script>
