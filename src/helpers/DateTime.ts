
import moment from "moment-timezone";
import { constantConfig } from "./constants";
 
export class FormatedDateTime{
  /**
   * 
   * @returns string|null
   */
   public static async currentUTCDateTime(format=constantConfig.DEFAULT_FORMAT):Promise<string|null>{
    return moment.tz(moment(), 'UTC').format(format)
   }  

   public static async currentDateTime(format=constantConfig.DEFAULT_FORMAT):Promise<string|null>{
    return moment(moment()).format(format)
   } 

   public static async UTCtoSpecificTimezone(
    timezone:'America/Los_Angeles',
    format=constantConfig.DEFAULT_FORMAT
    ):Promise<string|null>{
    return moment.tz(timezone).format(format)
   }  

   public static async SpecificTimezonetoUTC(format=constantConfig.DEFAULT_FORMAT):Promise<string|null>{
    return moment.tz('UTC').format(format)
   }  
}