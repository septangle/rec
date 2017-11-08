<template>
  <v-app light class="blue">
    <notifications></notifications>
    <v-container grid-list-md>
      <div style="text-align: center;padding-top: 30px;">
        <h4 style="width: 100%;color: white;">企业注册</h4>
      </div>
      <v-stepper v-model="paneState">
        <v-stepper-header style="box-shadow: none;" class="pt-4">
          <v-stepper-step step="1" :complete="paneState > 1">填写信息</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">注册完成</v-stepper-step>
        </v-stepper-header>
        <v-stepper-content step="1">
          <v-form ref="dataForm">
            <v-card flat>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm8 offset-sm2>
                    <v-text-field
                      label="用户名"
                      v-model="user.memberName"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 offset-sm2>
                    <v-text-field
                      label="输入密码"
                      v-model="user.password"
                      type="password"
                      :rules="[rules.required]"
                      @change="$refs.verifyPwd.validate()"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-text-field
                      ref="verifyPwd"
                      label="确认密码"
                      v-model="temp.verifyPwd"
                      type="password"
                      :rules="[rules.required,verifyPwd]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 offset-sm2>
                    <v-text-field
                      label="联系人"
                      v-model="user.contact"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-text-field
                      label="手机号码"
                      v-model="user.tel"
                      :rules="[rules.required,rules.phone]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 offset-sm2>
                    <v-text-field
                      label="企业名称"
                      v-model="user.company"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-select
                      label="行业"
                      v-model="user.industry"
                      :items="industry"
                      :rules="[rules.required]"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm4 offset-sm2>
                    <v-select
                      label="省份"
                      v-model="user.province"
                      :rules="[rules.required]"
                      :items="province"
                      item-value="item_code"
                      item-text="item_name"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-select
                      label="城市"
                      v-model="user.city"
                      :rules="[rules.required]"
                      :items="cities"
                      item-value="item_code"
                      item-text="item_name"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm4 offset-sm2>
                    <v-text-field
                      label="详细地址"
                      v-model="user.adress"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-text-field
                      label="邮箱"
                      v-model="user.mail"
                      :rules="[rules.required,rules.email]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout>
                  <v-flex xs12 text-xs-center>
                    <v-btn
                      :loading="registering"
                      @click.native.stop="register()"
                      :disabled="registering"
                      primary
                    >
                      注册
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card>
            <v-card-text style="text-align:center;height:150px;">
              <v-avatar style="display: inline-block;vertical-align: top;" size="60px">
                <v-icon class="green white--text" style="font-size: 59px;">check_circle</v-icon>
              </v-avatar>
              <div style="display: inline-block;padding: 0 10px;">
                <h4 style="margin: 0;">恭喜您，注册成功!</h4>
                <div style="color: lightgray;text-align: left;">请牢记您设置的密码</div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-layout>
                <v-flex xs12 text-xs-center>
                  <v-btn primary @click="linkTo('/index.html')">登录</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-app>
</template>


<script>
  import VSelect from '../../node_modules/vuetify/src/components/VSelect/VSelect'
  import rules from '../components/common/rules'
  import CityData from '../store/CityData'
  import notifications from '../components/notifications'

  export default {
    components: {VSelect, notifications},
    data () {
      return {
        paneState: 1,
        rules: rules,
        verifyPwd: (val) => {
          return val === this.user.password || '两次输入的密码不一致'
        },
        registering: false,
        temp: {
          verifyPwd: ''
        },
        user: {
          memberName: '',
          tel: '',
          contact: '',
          company: '',
          province: '',
          city: '',
          industry: '',
          password: '',
          adress: '',
          mail: ''
        }
      }
    },
    methods: {
      linkTo (href) {
        location.href = href
      },
      register () {
        if (this.$refs.dataForm.validate()) {
          this.registering = true
          this.$store.dispatch('users/register', this.user).then(() => {
            this.paneState = 2
            this.registering = false
          }).catch((err) => {
            this.registering = false
            this.$store.commit('notifications/add', {
              type: 'error',
              msg: err.message
            })
          })
        }
      }
    },
    computed: {
      province () {
        return CityData.filter((item) => {
          return parseInt(item.item_code) % 10000 === 0
        })
      },
      cities () {
        return CityData.filter((item) => {
          return parseInt(item.item_code) - this.user.province > 0 && parseInt(item.item_code) - this.user.province < 10000
        })
      },
      industry () {
        return [
          '酒店',
          '景点',
          'IT'
        ]
      }
    }
  }
</script>
