const url = "https://api.spacexdata.com/v2/launchpads";

d3.json("samples.json").then(function(data){
    wfreqList = data.metadata.map(item => item.wfreq).sort((a,b) => b-a).filter(a => a != null);
    
    console.log(data);
    console.log(wfreqList);
    
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) => {
        console.log(key +': '+ value);
    });
});