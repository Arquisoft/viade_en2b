import Route from "../Entities/Route"
import GeoCoordinate from "../Entities/GeoCoordinate"



const list = new GeoCoordinate[10];
let i = 0;
for(i = 0; i<10; i++){
    let g = new GeoCoordinate(i, i+1);
    list.add(g);
}
const RouteList = new Route[10];
let j = 0;
list.map(a=>{
    j++;
    RouteList.add(new Route("r".concat(j), a));
})

RouteList.map(a=>{
   console.log(a.name);
})

