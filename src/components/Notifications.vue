<template>
  <div class="alert-list" :class="$vuetify.breakpoint.xsOnly? 'xs-list':''" row wrap align-center>
    <transition-group name="alert-list">
      <v-alert
        v-for="item in notifications"
        :class="item.type"
        :key="item.id"
        value="true"
        dismissible
        @input="removeNotification(item.id)"
        transition="scale-transition"
      >
        {{item.msg}}
      </v-alert>
    </transition-group>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'notifications',
    methods: {
      removeNotification (id) {
        this.$store.commit('notifications/remove', id)
      }
    },
    computed: {
      ...mapGetters({
        notifications: 'notifications/all'
      })
    }
  }
</script>
<style>
  .alert{
    border: none !important;
  }
  .alert-list-enter-active, .alert-list-leave-active {
    transition: all 1s;
  }

  .alert-list-enter, .alert-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .alert-list {
    position: fixed;
    z-index: 999999;
    width: 50%;
    left: 25%;
  }

  .alert-list.xs-list {
    width: 80%;
    left: 10%;
  }

  .alert-list .alert .alert__dismissible > .icon,
  .alert-list .alert .alert__icon.icon {
    color: white;
  }
</style>
