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
              <template  v-slot:item.picture="{ item }" >
                <a @click="viewdetail(item.id);" v-bind:alt="item.id"><img v-bind:src="item.picture" class="abc"></a>
              </template>
            </v-data-table>
          </v-card>
        </template>
        <template v-if="detailuser">
          <a @click="backtolist();">back</a>
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
var link = 'http://localhost/demo/getApi.php';
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
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'f_name',
        },
        { text: 'Calories', value: 'l_name' },
        { text: 'avatar', value: 'picture' },
        { text: 'picture', value: 'picture' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [],
    }
  },
  created: function () {
    this.getUsers();
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    console.log(params.get("var_name"));
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
      console.log(e);
    },
    backtolist: function(e){
      this.listuser=true;
      this.detailuser=false;
      console.log(e);
    }
  }
}
</script>
<style >
.abc {height:100px}
</style>