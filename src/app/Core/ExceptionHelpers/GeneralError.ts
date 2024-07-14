import { throwError } from "rxjs";

export class GeneralErrors{
    static GereralError(error:any){
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
        } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(()=> new Error(errorMessage));
    }
}
