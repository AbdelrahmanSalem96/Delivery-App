export class PagingInfo{

  public static ItemsPerPages:number[]=[5,10,15,20,25];

  static GetTotalPages(pages:number){
    let totalpages:number[]=[];
        for (var i = 1; i <= pages; i++) {
          totalpages.push(i);
        }
        return totalpages;
    }

}
