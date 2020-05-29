<template>
  <v-layout>
    <v-flex class="text-center">
      <blockquote class="blockquote">
        <template v-if="listuser">
          <v-card>
            <v-card-title>
              Nutrition
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
            >
              <template  v-slot:item.name="{ item }" >
                <a @click="topage_detailuser(item.id, item.name);" v-bind:alt="item.id">{{item.name}}</a>
              </template>
              <template  v-slot:item.picture="{ item }" >
                <a @click="viewdetail(item.id);" v-bind:alt="item.id"><img v-bind:src="item.picture" class="abc"></a>
              </template>
            </v-data-table>
          </v-card>
        </template>
        <template v-if="detailuser">
          <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content v-for="item in getDetaiUser" >
                  <div class="overline mb-4">{{ item.email_id }}</div>
                  <v-list-item-title class="headline mb-1">{{ item.f_name }} {{ item.l_name }}</v-list-item-title>
                  <v-list-item-subtitle>Ngày đăng ký: {{ item.created_date }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn @click="backtolist();" text>Back to list</v-btn>
                <v-btn text>Button</v-btn>
              </v-card-actions>
            </v-card>
          
        </template>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">This text has a tooltip</span>
          </template>
          <span>Tooltip</span>
        </v-tooltip>
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
Vue.http.headers.common['Access-Control-Allow-Origin'] = true; 
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*' ;
var link = 'https://restapi.quiz.edu.vn/trungtamhoaiphuong/demo.php';
//var link = 'students.json';
export default {
  head: {
    title: "Home page"
  },
  data () {
    return {
      listuser:true,
      detailuser:false,
      page: 1,
      number_per_page: 5,
      search: '',
      viewdetailUse: [],
      headers: [
        {
          text: 'Họ tên',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Điện thoại', value: 'phone' },
        { text: 'datecreate', value: 'datecreate' },
      ],
      getDetaiUser: [],
      desserts: [],
    }
  },
  created: function () {
    this.getUsers();
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    //console.log(params.get("var_name"));
  },
  methods: {
    getUsers: function () {
      this.$http.get(link).then(function (response) {
        this.desserts = response.data;
      }, function (error) {
        console.log(error.statusText);
      });
    },

    viewdetail: function(e){
      this.listuser=false;
      this.detailuser=true;
      this.$http.get('http://localhost/demo/getApi.php?detail='+e).then(function (response) {
        this.getDetaiUser = response.data;
        console.log(this.getDetaiUser);
      }, function (error) {
        console.log(error.statusText);
      });
    },
    topage_detailuser: function(e){
      //this.$router.push('userdetail/uid/'+e);
      this.$router.push({name: 'userdetail', params: {user_id: e, user_name: name}})
    },
    backtolist: function(e){
      this.listuser=true;
      this.detailuser=false;
     
    }
  }
}
</script>
<style >
.abc {height:100px}
</style>