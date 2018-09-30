Vue.component('query-options', {
  props: ['scopeVal', 'firstTeamFilter'],

  template: `
    <div class="v1h-parambox">
      <div class="v1h-scope-section">Scope for<br/>queries</div>

      <div class="v1h-scope-section">
        <label for="sel-scope">Planning Level:</label>
        <select id="sel-scope" v-model='selectedProject' v-on:change="$emit('project-changed', selectedProject)">
          <option disabled value="">Please select one Project</option>
          <option v-for="project in projectList" v-bind:value="project">
            {{ project | unescape }}
          </option>  
        </select> 
      </div>

      <div class="v1h-scope-section">
        <label for="sel-team">Team:</label> 
        <select id="sel-team" v-model='selectedTeam'  v-on:change="$emit('team-changed', selectedTeam)">
          <option v-if="teamList.length>0" disabled value="">Please select one Team</option>
          <option v-else disabled value="">No teams match filter!</option>
          <option v-for="team in teamList" v-bind:value="team">
            {{ team | unescape }}
          </option>  
        </select> 
      </div>

      <div class="v1h-scope-section">
        <label for="filter-team">Team filter:</label> 
        <input type="text" id="filter-team" v-model.lazy.trim="teamFilter" v-on:change="loadTeams"/>
      </div>      

    </div>`,

  data () {
    return {
      projectList: [],
      selectedProject: this.scopeVal,
      teamFilter: '',
      teamList: [],       
      selectedTeam: '', 
    };
  },
  methods: {
    loadProjects: function() {
      var vm = this //needed for promise resolution
      const urlDest = this.$appConfig.serviceUrl
      const queryNameProjects = "getProjectsWithRoot"
      const scopeParam =  'scopeName='+encodeURIComponent(this.scopeVal)
      var urlString = urlDest+'/'+queryNameProjects+'?'+scopeParam
  
      fetch(urlString)
        .then(function(response) {
          return response.json()
        })
        .then(function(myJson) {
          vm.projectList = myJson.data.items
        });
    },
    loadTeams: function() {
      var vm = this //needed for promise resolution
      const urlDest = this.$appConfig.serviceUrl
      const queryNameTeams = "getTeams"
      const teamParam = 'teamFilter='+encodeURIComponent(this.teamFilter)
  
      urlString = urlDest+'/'+queryNameTeams+'?'+teamParam 
      fetch(urlString)
        .then(function(response) {
          return response.json()
        })
        .then(function(myJson) {
          vm.teamList = myJson.data.items
          vm.selectedTeam = ''
          vm.$emit('team-changed', '')
        });
    }
  },
  filters: {
    unescape (str) {
      return decodeURIComponent(str)
    }
  },
  created() {
    this.teamFilter = this.firstTeamFilter
  },

  mounted() {
    this.loadProjects()
    this.loadTeams()
  }  
})
