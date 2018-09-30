# V1 Work Item Hygiene Dashboard (MVP)

A simple, Vue.js based UI to interact with the [v1-hygiene-service](https://github.com/millarde/v1-hygiene-service). It takes advantage of Vue components to make more semantic HTML. It avoids some useful Vue extensions (like Vuex state management) for simplicity and like many an MVP, is light on error handling.

It should run successfully from your laptop as a locally loaded web page. The only fixups you should need to do is to edit the `appConfig.js` file and update the target URL, the top-level project it should use for Scope and a filter string for limiting the list of teams.
```
var appConfig = new Vue({data:{ 
    serviceUrl: "http://localhost:8088",
    startingProject: "Sample: Company",
    startingTeamFilter: "Sample: Team A" 
}})
```
Then load index.html and away you go. Warning: At this stage, it is a utilitarian UI -- it is not mobile friendly and doesn't respond well to small browser windows.

# Using the UI
Until a Project/Scope and Team are selected, no data will be shown. 

To avoid unnecessarily large query results (and the associated costs), each list is restricted to 13 items retrieved (a value you can change). Since the whole purpose of the UI is to display items that need to be fixed so they do not show up on the list any more, this seemed a reasonable limitation for the MVP. As you fix items, new ones will appear on refresh.

To change the Teams displayed in the selection, enter a new filter and press Enter. The results will clear along with the selected team and a new list of teams will be provided (presuming the filter matches any teams). If the filter doesn't match any teams, the select will show an appropriate message.

From the list of work items that need attention, clicking one will open it in a new window. Fix the problem. Repeat as necessary. You can use the `Reload` button to refresh the contents of individual queries (to avoid delay and effort associated with reloading the entire page).

# Notes
In an Enterprise V1 environment, there may be many Projects/Scopes and Teams. At least with a starting Project, the list will be focused on a root from which the projects you are likely to care about fan out. The select element is not "structured" -- it does not represent the hierarchical structure of the Scopes (a possible future enhancement). It is sorted on order of creation and that should add a bit of useful signaling.

Teams are not tethered to any particular Scope or organizational component, so it is not possible to easily _just list teams in the Scope_. Becasue of that, it is not uncommon for organizations to use a team prefix (so at least they can find their Team in the possibly giant list of V1 teams). Use that prefix to locate teams of interest. The query.v1 approach doesn't enforce a _prefix_, so it's just a simple substring filter -- if the string is anywhere in a team's name, they'll be in the list.

# Adding new queries to the dashboard

TBD
