<template>
  <v-app light>
    <main>
      <v-container fill-height fluid style="background: url(/static/images/login-background.jpg) center no-repeat;">
        <v-layout row wrap align-center>
          <v-flex class="flex xs12 offset-sm3 sm6 md4 lg3 offset-md4  text-xs-center">
            <v-card class="white elevation-30">
              <v-card-title class="headline blue" style="color: white;line-height: 60px !important;">登陆
              </v-card-title>
              <v-card-text>
                <v-form ref="dataForm">
                  <v-text-field
                    v-model="user.tel"
                    placeholder="手机号/邮箱"
                    :rules="[rules.required]"
                    @keyup.enter="login()"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    placeholder="密码"
                    type="password"
                    :rules="[rules.required]"
                    @keyup.enter="login()"
                  ></v-text-field>
                </v-form>
                <div style="color: red;text-align: center;">{{errorMsg}}</div>
                <v-btn class="blue" style="color:white;"
                       :loading="loging"
                       large block @click="login()">
                  登录
                </v-btn>
                <v-layout row mb-4>
                  <v-flex xs6 text-xs-left>
                    <v-btn flat primary @click.stop="linkTo('/forget.html')">忘记密码</v-btn>
                  </v-flex>
                  <v-flex xs6 text-xs-right>
                    <v-btn flat primary @click.stop="linkTo('/register.html')">注册</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import VAvatar from '../../node_modules/vuetify/src/components/VAvatar/VAvatar'
  import rules from '../components/common/rules'

  export default {
    components: {VAvatar},
    data () {
      return {
        rules,
        errorMsg: '',
        loging: false,
        user: {
          tel: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        if (!this.$refs.dataForm.validate()) {
          return
        }
        this.loging = true
        this.$store.dispatch('users/login', this.user).then(() => {
          this.loging = false
          location.href = 'index.html'
        }).catch((err) => {
          this.loging = false
          this.errorMsg = err.message || '登录失败'
          this.$store.commit('notifications/add', {
            type: 'error',
            msg: err.message
          })
        })
      },
      linkTo (href) {
        location.href = href
      }
    },
    created () {
      this.$store.dispatch('users/current').then(() => {
        location.href = 'index.html'
      })
    }
  }
</script>
<style>
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
</style>
