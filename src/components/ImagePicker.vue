<template>
  <v-layout row wrap style="border: 1px dotted lightgray; padding: 5px;" class="mt-4">
    <v-flex xs12 sm6 md4 lg3 class="pa-1" v-for="(file,index) in sortedFiles" :key="file.name">
      <v-card class="photo-card">
        <v-card-media :src="file.dataUrl" v-show="file.dataUrl" height="200px">
        </v-card-media>
        <v-card-text class="text-xs-center" v-show="!file.dataUrl" style="line-height: 168px;">
          <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
        </v-card-text>
        <v-card-actions>
          <span>{{file.name}}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="removeFile(file)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3 class="pa-1">
      <v-card class="photo-card" style="cursor: pointer;" @click.stop="chooseFiles()">
        <v-card-text class="text-xs-center">
          <div style="height: 220px;">
            <i data-v-50239e73="" class="material-icons icon"
               style=" font-size: 220px; color: #b9b7b7; ">note_add</i>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <input type="file" style="display: none;" @change='addFiles()' accept="image/jpeg,image/jpg"  multiple="true" ref="uploadFiles"/>
  </v-layout>
</template>
<script>
  import Utils from './common/Utils'
  import Memory from '../api/Memory'

  export default {
    props: [],

    data () {
      return {
        files: new Memory({
          data: [],
          idProperty: 'name'
        })
      }
    },

    methods: {
      chooseFiles () {
        this.$refs.uploadFiles.value = null
        this.$refs.uploadFiles.click()
      },
      removeFile (item) {
        this.files.remove(item.name)
        this.$emit('input', this.sortedFiles)
      },
      addFiles () {
        [].forEach.call(this.$refs.uploadFiles.files, (file) => {
          let item = {
            name: file.name,
            dataUrl: '',
            file: file
          }
          this.files.add(item)
          Utils.readAsDataURL(file).then((dataUrl) => {
            item.dataUrl = dataUrl
          })
        })
        this.$emit('input', this.sortedFiles)
      }
    },

    computed: {
      sortedFiles () {
        return this.files.data.sort((item1, item2) => {
          return item1.name > item2.name ? 1 : -1
        })
      }
    }

  }

</script>
