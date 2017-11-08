<template>
  <v-app light class="blue">
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
    <v-container grid-list-md>
      <div style="text-align: center;padding-top: 30px;">
        <h4 style="width: 100%;color: white;">找回密码</h4>
      </div>
      <v-stepper v-model="paneState" style="padding-bottom: 15px;">
        <v-stepper-header style="box-shadow: none;" class="pt-4">
          <v-stepper-step step="1" :complete="paneState > 1">账号信息</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">安全验证</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">密码重置</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">设置完成</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1">
          <div style="width: 400px;margin: auto;">
            <v-card flat>
              <v-card-text>
                <div class="title mb-2">请填写您需要找回密码的账号</div>
                <v-text-field
                  ref="mailOrTelInput"
                  label="邮箱或者手机号码"
                  v-model="mailOrTel"
                  :rules="[rules.required,rules.mailOrTel]"
                ></v-text-field>
                <v-btn
                  block primary
                  @click="verifyAccount()"
                >
                  下一步
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2">
          <div style="width: 400px;margin: auto;">
            <v-card flat>
              <v-card-text>
                <div class="title mb-2">为了您的账户安全，请进行安全验证</div>
                <div class="subheading" style="color: gray;">验证方式: {{mailOrTel}}</div>
                <div>
                  <div style="display: inline-block;width: 180px;margin-right: 10px;">
                    <v-text-field
                      label="验证码"
                      v-model="vCode"
                    ></v-text-field>
                  </div>
                  <v-btn style="display: inline-block;margin: 0;" :disabled="!!timer" @click="sendVerifyCode()">
                    {{timer ? '已发送，' + timer + '秒重试' : '发送验证码'}}
                  </v-btn>
                </div>
                <v-btn
                  block primary
                  @click="verifyCode()"
                >
                  下一步
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </v-stepper-content>
        <v-stepper-content step="3">
          <div style="width: 400px;margin: auto;">
            <v-card flat>
              <v-card-text>
                <v-text-field
                  label="新密码"
                  v-model="user.password"
                  type="password"
                  :rules="[rules.required]"
                  @change="$refs.verifyPwd.validate()"
                ></v-text-field>
                <v-text-field
                  ref="verifyPwd"
                  label="确认密码"
                  v-model="temp.verifyPwd"
                  type="password"
                  :rules="[rules.required,verifyPwd]"
                ></v-text-field>
                <v-btn
                  :loading="changingPwd"
                  @click.native.stop="resetPassword()"
                  :disabled="changingPwd"
                  primary
                  block
                >
                  重置
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </v-stepper-content>
        <v-stepper-content step="4">
          <div style="width: 400px;margin: auto;">
            <v-card flat>
              <v-card-text>
                <v-avatar style="display: inline-block;vertical-align: top;" size="60px">
                  <v-icon class="green white--text" style="font-size: 59px;">check_circle</v-icon>
                </v-avatar>
                <div style="display: inline-block;padding: 0 10px;">
                  <h4 style="margin: 0;">已完成!</h4>
                  <div style="color: lightgray;text-align: left;">请牢记您设置的密码</div>
                </div>
                <v-btn
                  style="margin-top: 15px;"
                  @click.native.stop="home()"
                  primary
                  block
                >
                  登录
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-app>
</template>


<script>
  import rules from '../components/common/rules'
  import VSubheader from '../../node_modules/vuetify/src/components/VSubheader/VSubheader'
  import VBtn from '../../node_modules/vuetify/src/components/VBtn/VBtn'
  import api from '../api'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      VBtn,
      VSubheader
    },
    data () {
      return {
        paneState: 1,
        rules: rules,
        changingPwd: false,
        timer: 0,
        vCode: '',
        temp: {
          verifyPwd: ''
        },
        mailOrTel: '',
        user: {
          password: ''
        },
        verifyPwd: (val) => {
          return val === this.user.password || '两次输入的密码不一致'
        }
      }
    },
    methods: {
      verifyAccount () {
        return this.$refs.mailOrTelInput.validate() && api.users.verifyAccount(this.mailOrTel).then(() => {
          this.paneState = 2
        }).catch((err) => {
          this.$store.commit('notifications/add', {
            type: 'error',
            msg: err.message || '账户不存在'
          })
        })
      },
      sendVerifyCode () {
        return api.users.sendVerifyCode(this.mailOrTel).then(() => {
          this.timer = 60
          let t = setInterval(() => {
            if (--this.timer === 0) {
              clearInterval(t)
            }
          }, 1000)
        })
      },
      verifyCode () {
        return api.users.verifyCode(this.mailOrTel, this.vCode).then((token) => {
          this.paneState = 3
          this.token = token
        }).catch((err) => {
          this.$store.commit('notifications/add', {
            type: 'error',
            msg: err.message || '验证失败'
          })
        })
      },
      resetPassword () {
        return this.$refs.verifyPwd.validate() && api.users.resetPassword(this.mailOrTel, this.token, this.user.password).then(() => {
          this.paneState = 4
        }).catch((err) => {
          this.$store.commit('notifications/add', {
            type: 'error',
            msg: err.message
          })
        })
      },
      removeNotification (id) {
        this.$store.commit('notifications/remove', id)
      },
      home () {
        location.href = 'index.html'
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
  .alert {
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
