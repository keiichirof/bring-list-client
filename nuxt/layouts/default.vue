<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      v-if="$store.state.auth.loggedIn"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click.stop="signout" v-on="on">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>ログアウト</span>
      </v-tooltip>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  clipped = false;
  drawer = true;
  fixed = false;
  items = [
    {
      icon: "mdi-apps",
      title: "持ち物確認",
      to: "/"
    },
    {
      icon: "mdi-chart-bubble",
      title: "リスト作成",
      to: "/list/save"
    },
    {
      icon: "mdi-format-list-bulleted",
      title: "みんなのリスト",
      to: "/list/show"
    }
  ];
  right = true;
  rightDrawer = false;
  title = "BringList";

  async signout() {
    await this.$auth.logout("local");
  }
}
</script>
