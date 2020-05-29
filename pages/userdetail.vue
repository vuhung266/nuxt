<template>
  <v-layout>
    <v-flex class="text-center">
      <blockquote class="blockquote">
        
        <template>
          <v-card
              class="mx-auto"
              max-width="600"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content v-for="item in getDetaiUser">
                  <div class="overline mb-4">{{ item.email_id }}</div>
                  <v-list-item-title class="headline mb-1">{{ item.f_name }} {{ item.l_name }}</v-list-item-title>
                  <v-list-item-subtitle>Ngày đăng ký: {{ item.created_date }} {{user_info.user_name}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>
            </v-card>
          
        </template>

      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
export default {
  head: {
    title: "User detail"
  },
  data () {
    return {
      getDetaiUser: [],
      user_info : this.$route.params,
    }
    
  },
  created: function () {
    this.viewdetail();
  },
  methods: {
    viewdetail: function(){
      console.log(this.$route.params.user_id);
      let url = 'http://localhost/demo/getApi.php?detail='+this.$route.params.user_id; console.log(url);
      this.$http.get(url).then(function (response) {
        this.getDetaiUser = response.data;
      }, function (error) {
        console.log(error.statusText);
      });
    },
  }
}
</script>
<style >
.abc {height:100px}
</style>