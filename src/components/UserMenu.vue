<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
    :nudge-width="150"
  >
    <div slot="activator" class="mr-2">
      <v-avatar size="40px">
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
      <div style="display: inline-block;color: white;padding: 5px;">{{currentUser && currentUser.memberName}}</div>
    </div>
    <v-list>
      <v-list-tile>
        <v-list-tile-title>余额：{{currentUser && currentUser.balance}}元</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click="logout()">
        <v-list-tile-title>注销</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  import VMenu from 'vuetify/src/components/VMenu/VMenu'
  import { mapGetters } from 'vuex'

  export default {
    components: {VMenu},
    name: 'UserMenu',
    data () {
      return {}
    },
    methods: {
      logout () {
        this.$store.dispatch('users/logout').then(function () {
          location.reload()
        }).catch(function () {
          location.reload()
        })
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'users/current'
      })
    }
  }
</script>

<style scoped>
</style>
