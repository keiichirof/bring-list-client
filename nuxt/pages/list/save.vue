<template>
  <div id="app">
    <v-container align-center pa-1>
      <v-alert dense v-if="alert" text type="success">
        リストを作成しました
        <v-btn icon @click="alert = false">
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
      </v-alert>
      <v-layout wrap justify-center>
        <v-flex xs12 sm5>
          <v-card class="pa-3">
            <v-card-title>リストを作成</v-card-title>
            <v-form ref="form">
              <v-text-field v-model="listForms.name" :rules="listNameRules" label="リスト名" outlined></v-text-field>

              <v-combobox
                v-model="listForms.tags"
                :items="listForms.tags"
                label="ダグを追加"
                multiple
                chips
                cache-items
                @input="getRecommend"
              ></v-combobox>

              <v-menu v-model="menu" :close-on-content-click="false" min-width="290px">
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

              <v-card class="my-3" flat outlined min-height="200px">
                <v-subheader>アイテムリスト</v-subheader>
                <v-text-field
                  v-model="inputItem"
                  @keyup.enter="inputted"
                  @click:append-outer="inputted"
                  label="アイテムの追加"
                  outlined
                  class="mx-3"
                  append-outer-icon="mdi-plus-circle-outline"
                ></v-text-field>
                <v-list>
                  <draggable tag="ul" :list="listForms.items" group="item+recommend" class="pa-0">
                    <v-list-item v-for="(item, i) in listForms.items" :key="i">
                      <v-btn outlined color="blue lighten-1">
                        <span class="mr-2">{{ item.tagin }}</span>
                        {{ item.name }}
                        <span
                          class="ml-4"
                          @click="itemSendToTrash(item)"
                        >
                          <v-icon small>mdi-close-circle-outline</v-icon>
                        </span>
                      </v-btn>
                    </v-list-item>
                  </draggable>
                </v-list>
              </v-card>

              <v-btn color="info" class="ml-4" @click="submit" :disabled="!valid">リストを作成する</v-btn>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex xs12 sm5 class="ma-3">
          <v-card class="pa-3">
            <v-card-title>レコメンド</v-card-title>
            <v-card class="my-3" flat outlined>
              <v-subheader>クリックかドラッグでアイテムリストに追加できます</v-subheader>
              <v-list min-height="60px">
                <draggable tag="ul" :list="recommends" group="item+recommend" class="pa-0">
                  <v-list-item v-for="(recommend, i) in recommends" :key="i">
                    <v-btn outlined color="blue lighten-1" @click="itemSendToItem(recommend)">
                      <span class="mr-2">{{ recommend.tagin }}</span>
                      {{ recommend.name }}
                      <span
                        class="ml-4"
                        @click="recommendSendToTrash(recommend)"
                      >
                        <v-icon small>mdi-close-circle-outline</v-icon>
                      </span>
                    </v-btn>
                  </v-list-item>
                </draggable>
              </v-list>
            </v-card>
          </v-card>
          <v-card class="my-2 pa-3" width="500">
            <v-card-title>ゴミ箱</v-card-title>
            <v-card class="my-3" flat outlined min-height="200px">
              <v-list>
                <v-subheader>ドラッグでアイテムリストに追加できます</v-subheader>
                <draggable tag="ul" :list="trash" group="item+recommend" class="pa-0">
                  <v-list-item v-for="(t, i) in trash" :key="i">
                    <v-btn outlined>
                      <span class="mr-2">{{ t.tagin }}</span>
                      {{ t.name }}
                    </v-btn>
                  </v-list-item>
                </draggable>
              </v-list>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { ApiClient } from "../../infras/httpAdapters/ApiClient";
import { CreateListApplication } from "../../creates/list/CreateListApplication";
import { ListFormDto, Item } from "../../domains/list/ListFormDto";
import draggable from "vuedraggable";

@Component({
  components: { draggable }
})
export default class extends Vue {
  middleware({ store, redirect }: Context) {
    if (!store.state.auth.loggedIn) {
      return redirect("/signin");
    }
  }

  menu = false;

  alert = false;

  inputItem = "";

  valid = false;
  listForms: ListFormDto = {
    parentID: 0,
    name: "",
    userID: 0,
    tags: [],
    items: [],
    date: new Date().toISOString().substr(0, 10),
    isTemplate: false
  };

  recommends: Item[] = [];
  trash: Item[] = [];

  listNameRules = [(v: string) => !!v || "リスト名は必須です。"];

  inputted() {
    if (this.inputItem === "") {
      return;
    }
    let obj = {
      tagin: 0,
      name: this.inputItem
    };
    this.listForms.items.push(obj);
    this.inputItem = "";
  }

  itemSendToItem(recommend: Item) {
    this.listForms.items.push(recommend);
    this.recommends = this.recommends.filter(obj => {
      return obj !== recommend;
    });
  }

  itemSendToTrash(item: Item) {
    this.listForms.items = this.listForms.items.filter(obj => {
      return obj !== item;
    });
    this.trash.push(item);
  }

  recommendSendToTrash(recommend: Item) {
    this.recommends = this.recommends.filter(obj => {
      return obj !== recommend;
    });
    this.trash.push(recommend);
  }

  async submit() {
    const token = this.$auth.getToken("local");
    this.listForms.userID = this.$store.state.auth.user.id;
    const json_token = await CreateListApplication(token).SaveList(
      this.listForms
    );
    this.alert = true;
  }

  async getRecommend() {
    // 配列の最後を取得
    const inputedTagName = this.listForms.tags[this.listForms.tags.length - 1];
    const token = this.$auth.getToken("local");
    const recommends = await CreateListApplication(token).GetRecommend(
      inputedTagName
    );
    if (recommends !== null) {
      this.createRecommend(recommends);
    }
  }

  createRecommend(recommends: Item[]) {
    recommends.forEach(recommend => {
      // 既に存在するかの確認
      const isRec = this.recommends.some(r => {
        return r.name === recommend["name"] && r.tagin === recommend["tagin"];
      });
      const isItm = this.listForms.items.some(r => {
        return r.name === recommend["name"] && r.tagin === recommend["tagin"];
      });
      if (!isRec && !isItm) {
        this.recommends.push(recommend);
      }
    });
    this.recommends.sort(function(a, b) {
      if (a.tagin < b.tagin) {
        return 1;
      } else {
        return -1;
      }
    });
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
