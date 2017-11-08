<template>
  <v-container white elevation-5>
    <v-layout row>
      <v-flex xs12 lg6>
        <v-layout class="info-field" row>
          <v-flex class="info-label">用户名</v-flex>
          <v-flex>{{currentUser.memberName}}</v-flex>
        </v-layout>
        <v-layout class="info-field" row>
          <v-flex class="info-label">公司名称</v-flex>
          <v-flex>{{currentUser.company}}</v-flex>
        </v-layout>
        <v-layout class="info-field" row>
          <v-flex class="info-label">行业</v-flex>
          <v-flex>{{currentUser.industry}}</v-flex>
        </v-layout>
        <v-layout class="info-field" row>
          <v-flex class="info-label">等级</v-flex>
          <v-flex>{{currentUser.level | memberLevel}}</v-flex>
        </v-layout>
        <v-layout class="info-field" row>
          <v-flex class="info-label">当前余额</v-flex>
          <v-flex>{{currentUser.balance | currency}} 元</v-flex>
        </v-layout>
        <v-layout class="info-field" row>
          <v-flex class="info-label">冻结金额</v-flex>
          <v-flex>{{currentUser.freezeAmount | currency}} 元</v-flex>
        </v-layout>
        <v-layout class="info-field" row>
          <v-flex class="info-label">当年消费总额</v-flex>
          <v-flex>{{currentUser.consumeAmount | currency}} 元</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        currentUser: 'users/current'
      })
    }
  }
</script>
<style scoped>
  .info-field {
    padding: 5px 0;
  }
  .info-field .flex{
    flex: 0 0 auto
  }
  .info-field .info-label.flex {
    flex-basis: 150px;
    font-weight: bolder;
  }

</style>
