Vue.component('query-item-list', {
  props: ['queryName', 'scopeVal', 'teamVal'],

  template: `<div class="v1h-listbox">
    <div>
      <button v-on:click="loadData" class="v1h-list-button-reload">Reload</button>
      <h2 class="v1h-list-header">{{message}}</h2>
    </div>
    <p v-if="isLoading">Loading...</p>
    <ul class="v1h-list">
      <li v-for="item in items">
        <a v-bind:href='item.link' target="_blank" class="v1h-list-item" >
          {{item.name}}
        </a>
      </li>
      <li v-if="showListEmpty"><em>All sorted, well done!</em></li>
    </ul>
  </div>`,

  data () {
    return {
      message: 'Need to select parameters for results to show',
      currentScopeVal: this.scopeVal,
      currentTeamVal: this.teamVal,
      items: [],
      isLoading: false,
      neverLoaded: true        
    };
  },
  computed: {
      showListEmpty: function() { 
        if (this.items && this.items.length > 0) return false
        else if (this.neverLoaded) return false
        else return true
      }
  },
  // due to one-way data binding for props, need to watch and upate ourselves
  watch: {
    scopeVal: function (val, oldVal) {
      this.currentScopeVal = val
      this.loadData()
    },
    teamVal: function (val, oldVal) {
      this.currentTeamVal = val
      this.loadData()
    }
  },
  methods: {
    loadData: function() {
      const urlDest = this.$appConfig.serviceUrl
      const scopeParam =  'scopeName='+encodeURIComponent(this.currentScopeVal)
      const teamParam = 'teamName='+encodeURIComponent(this.currentTeamVal)

      if (!this.currentTeamVal || !this.currentScopeVal) {
        console.log("not retrieving data: both team and scope params required")
        this.items = []
        this.neverLoaded = true
        return
      }
      var vm = this //needed for promise resolution
      this.isLoading = true
      var urlString = urlDest+'/'+this.queryName+'?'+scopeParam+'&'+teamParam 
  
      fetch(urlString)
      .then(function(response) {
        return response.json()
      })
      .then(function(myJson) {
        vm.items = myJson.data.items
        vm.message = myJson.data.message
        vm.isLoading = false
        vm.neverLoaded = false
    });
    }
  },
  mounted() {
    this.loadData()
  }  
})
