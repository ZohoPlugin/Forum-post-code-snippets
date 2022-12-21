Util={};
var teamidvalue;
var projectidvalue;
var backlogidvalue;
//Subscribe to the EmbeddedApp onPageLoad event before initializing the widget 
ZOHO.embeddedApp.on("PageLoad",function(data)
{
var data = {
}
//Invoking the Get teams API to retrieve the teams of the user
ZOHO.CRM.CONNECTOR.invokeAPI("xxx.zohosprints.getteams",data)
.then(function(dataa){
response = dataa.response;
responsejson=JSON.parse(response);
portal=responsejson.portals;
for (i = 0; i < portal.length; i++) 
{
teamid=portal[i].zsoid;  
teamname=portal[i].teamName;
var teamlist = document.getElementById("teamlist");
var option = document.createElement("OPTION");
option.innerHTML = teamname;
option.value = teamid;
teamlist.appendChild(option);
}
})

teamidvalue=document.getElementById("teamlist").value;
})
// Button function to get projects
Util.getproject=function()
{
teamidvalue=document.getElementById("teamlist").value;
var data = {
"teamid" : teamidvalue
}
//Invoking the Get Projects API by passing the team id chosen from the select list to retrieve the projects present under the selected team
ZOHO.CRM.CONNECTOR.invokeAPI("xxx.zohosprints.getprojects",data)
.then(function(dataa){
response = dataa.response;
responsejson=JSON.parse(response);
project=responsejson.projectIds;
$('#projectlist').empty();
for(l=0;l<project.length;l++)
{
projects=responsejson.projectJObj[project[l]];
for (m=0;m<projects.length;m++)
{
projectids=project[l];
projectnames=projects[0];
}
projectid=projectids;
projectname=projectnames;
var projectlist = document.getElementById("projectlist");
var option = document.createElement("OPTION");
option.innerHTML = projectname;
option.value = projectid;
projectlist.appendChild(option);
}
})
projectidvalue=document.getElementById("projectlist").value;
}
// Button function to get backlog
Util.getbacklog=function()
{
teamiddvalue=document.getElementById("teamlist").value;
projectidvalue=document.getElementById("projectlist").value;
var data = {
"teamid":teamidvalue,
"projectid":projectidvalue
}
//Invoking the Get Project Backlog API by passing the team id, project id chosen from the respective select list to retrieve the backlog id
ZOHO.CRM.CONNECTOR.invokeAPI("xxx.zohosprints.getprojectbacklog",data)
.then(function(dataa){
response = dataa.response;
responsejson=JSON.parse(response);
backlog=responsejson.backlogId;
document.getElementById("backlog").value=backlog;
})
backlogidvalue=document.getElementById("backloglist").value;
}
// Button function to get item type and priority
Util.getitemandpriority=function()
{
teamidvalue=document.getElementById("teamlist").value;
projectidvalue=document.getElementById("projectlist").value;
var data = {
"teamid" : teamidvalue,
"projectid": projectidvalue,
}
//Invoking the Get Item types API by passing the team id, project id chosen from the respective select list to retrieve the item type

ZOHO.CRM.CONNECTOR.invokeAPI("xxx.zohosprints.getitemtypes",data)
.then(function(dataa){
response = dataa.response;
responsejson=JSON.parse(response);
itemtypeids=responsejson.projItemTypeIds;
$('#itemtypelist').empty();
for(l=0;l<itemtypeids.length;l++)
{
itemtypes=responsejson.projItemTypeJObj[itemtypeids[l]];
for (m=0;m<itemtypes.length;m++)
{
itemtype=itemtypeids[l];
itemnames=itemtypes[0];
}
itemid=itemtype;
itemname=itemnames;
var itemlist = document.getElementById("itemtypelist");
var option = document.createElement("OPTION");
option.innerHTML = itemname;
option.value = itemid;
itemtypelist.appendChild(option);
}
})
itemtypeidvalue=document.getElementById("itemtypelist").value;
var data = {
"teamid" : teamidvalue,
"projectid": projectidvalue,
}
//Invoking the Get Priority types API by passing the team id, project id chosen from the respective select list to retrieve the priority type
ZOHO.CRM.CONNECTOR.invokeAPI("xxx.zohosprints.getprojectprioritytypes",data)
.then(function(dataa){
response = dataa.response;
responsejson=JSON.parse(response);
projPriorityIds=responsejson.projPriorityIds;
$('#prioritylist').empty();
for(l=0;l<projPriorityIds.length;l++)
{
prioritytypes=responsejson.projPriorityJObj[projPriorityIds[l]];
for (m=0;m<prioritytypes.length;m++)
{
prioritynames=prioritytypes[0];
priorityids=projPriorityIds[l];
}
priorityid=priorityids;
priorityname=prioritynames;
var prioritylist = document.getElementById("prioritylist");
var option = document.createElement("OPTION");
option.innerHTML = priorityname;
option.value = priorityid;
prioritylist.appendChild(option);
}
})
priorityidvalue=document.getElementById("prioritylist").value;
}
// Fetching the values and assigning them to the respective CRM variable
Util.getvalues=function()
{
teamidvalue=document.getElementById("teamlist").value;
projectidvalue=document.getElementById("projectlist").value;
backlogidvalue=document.getElementById("backlog").value;
itemtypeidvalue=document.getElementById("itemtypelist").value;
priorityidvalue=document.getElementById("prioritylist").value;
var variableMap = { "apiname": "xxx__Team", "value": teamidvalue};
ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", variableMap);
var variableMap = { "apiname": "xxx__Project", "value": projectidvalue};
ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", variableMap);
var variableMap = { "apiname": "xxx__Backlog_Id", "value": backlogidvalue};
ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", variableMap);
var variableMap = { "apiname": "xxx__Item_type", "value": itemtypeidvalue};
ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", variableMap);
var variableMap = { "apiname": "xxx__Priority_Id", "value": priorityidvalue};
ZOHO.CRM.CONNECTOR.invokeAPI("crm.set", variableMap);
}