<template>
  <v-form ref="dataForm" v-model="valid">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <h4>充值/退款</h4>
        </v-flex>
        <v-flex xs12 md6>
          <v-select v-model="data.memberId"
                    label="会员"
                    :items="allUsers"
                    item-text="memberName"
                    item-value="id"
                    @input="refreshBalance()"
                    :rules="[rules.required]"
          ></v-select>
          <v-select
            v-model="data.transType"
            label="操作类型"
            :items="transTypes"
            item-value="value"
            item-text="label"
            :rules="[rules.required]"
          ></v-select>
          <v-text-field
            label="当前余额"
            v-model="balance"
            readonly
            suffix="元"
          ></v-text-field>
          <v-text-field
            v-model="data.amount" label="金额"
            :rules="[rules.required,rules.number]"
            suffix="元"
          ></v-text-field>
          <v-text-field v-model="data.remark" label="备注"></v-text-field>
          <v-btn :loading="loading" @click.native.stop="charge()" :disabled="loading" primary>
            确定
          </v-btn>
          <v-btn @click.native="reset()">重置</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
  import api from '../api'
  import { mapGetters } from 'vuex'
  import rules from './common/rules'

  export default {
    data: function () {
      return {
        valid: false,
        balance: 0,
        rules: rules,
        loading: false,
        transTypes: [
          {label: '充值', value: '1'},
          {label: '退款', value: '2'}
        ],
        data: {
          memberId: '',
          transType: '1',
          amount: 0,
          remark: ''
        }
      }
    },
    methods: {
      reset () {
        this.data = {
          memberId: '',
          transType: '1',
          amount: 0,
          remark: ''
        }
        this.balance = 0
      },
      refreshBalance () {
        this.data.memberId && api.balance.balance(this.data.memberId).then((amount) => {
          this.balance = amount
        })
      },
      charge () {
        if (this.$refs.dataForm.validate()) {
          console.log(this.$refs.dataForm.validate())
          this.loading = true
          api.balance.recharge(this.data).then(() => {
            this.loading = false
            this.$store.commit('notifications/add', {
              type: 'success',
              msg: '操作成功'
            })
            this.refreshBalance()
          }).catch((err) => {
            this.loading = false
            this.$store.commit('notifications/add', {
              type: 'error',
              msg: '操作失败: ' + err.message
            })
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        allUsers: 'users/all'
      })
    },
    created () {
      this.$store.dispatch('users/fetch')
    }
  }
</script>
