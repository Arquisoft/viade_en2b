import BasicRoute from "../Entities/BasicRoute"

class ReadRoute{
    readRoute(file){
        let json =  JSON.parse(file);
        let i;
        let numberOfItems = json.length;
        let list = new Array[numberOfItems];
        for(i in json){
            list.add(new BasicRoute(i.name, i.itirenary));
        }
        let j;
        for(j in list){
            console.log(j.name);
            console.log(j.itirenary);
        }
        return list;
    }

}