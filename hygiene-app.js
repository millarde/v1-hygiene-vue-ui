
let app = new Vue({
    el: '#app',
    data: {
        title: 'VersionOne Work Item Hygiene Dashboard',
        selectedProject: '',
        selectedTeam: '',
        teamFilter: ''
    },
    methods: {
        onProjectChanged: function(newProject) {
        this.selectedProject = newProject
        },
        onTeamChanged: function(newTeam) {
        this.selectedTeam = newTeam
        }       
    },
    created() {
        this.selectedProject = this.$appConfig.startingProject,
        this.teamFilter = this.$appConfig.startingTeamFilter
    }
})

