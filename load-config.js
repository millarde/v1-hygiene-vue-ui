// setup service URL for access by components (put your URL here)
var appConfig = new Vue({data:{ 
    serviceUrl: "http://localhost:8088",
    startingProject: "Sample: Company",
    startingTeamFilter: "Sample:" 
}})

appConfig.install = function(){
    Object.defineProperty(Vue.prototype, '$appConfig', {
        get () { return appConfig }
    })
}

Vue.use(appConfig);

/*
PS: using Vue plug-in style rather than instance properties; cleaner approach for multiple props
*/
