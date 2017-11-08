<template>
  <v-app light>
    <notifications></notifications>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in navItems"
          :key="i"
          @click.stop="$router.push(item.path)"
          v-show="item.permit"
          :class="{selected:$router.currentRoute.path == item.path}"
          class="nav-item"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="indigo" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" style="color:white;"></v-toolbar-title>
      <v-spacer></v-spacer>
      <user-menu></user-menu>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-x-transition mode="out-in">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import UserMenu from './components/UserMenu'
  import VAlert from 'vuetify/src/components/VAlert'
  import notifications from './components/notifications'

  export default {
    components: {VAlert, UserMenu, notifications},
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        navItems: [],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ONWING'
      }
    },
    created () {
      let checkPermission = this.$store.getters['users/checkPermission']
      this.navItems = [
        {
          icon: 'bubble_chart',
          title: '场景处理',
          path: '/scans',
          permit: checkPermission('/menu/user/scans')
        },
        {
          icon: 'attach_money',
          title: '充值/退款',
          path: '/admin/recharge',
          permit: checkPermission('/menu/admin/recharge')
        },
        {
          icon: 'monochrome_photos',
          title: '2D处理',
          path: '/admin/panorama',
          permit: checkPermission('/menu/admin/panorama')
        },
        {
          icon: 'account_circle',
          title: '账户信息',
          path: '/user/info',
          permit: checkPermission('/menu/user/info')
        },
        {
          icon: 'swap_vert',
          title: '消费记录',
          path: '/user/records',
          permit: checkPermission('/menu/user/records')
        },
        {
          icon: 'help',
          title: '帮助（常见问题）',
          path: '/help',
          permit: checkPermission('/menu/user/help')
        }
      ]
      this.$store.dispatch('scans/reFetch')
      setInterval(() => {
        this.$store.dispatch('scans/reFetch')
      }, 60 * 1000)
    }
  }
</script>

<style>
  .nav-item.selected {
    border-right: solid 3px #3f51b5;
  }

  .nav-item.selected .list__tile {
    padding-right: 13px;
  }
</style>
