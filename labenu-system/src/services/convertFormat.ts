export default function convertFormat(date: string): string {
   return date          //    exemplo: "01/04/1999"
      .split("/")       //             ["01", "04", "1999"]
      .reverse()        //             ["1999", "04", "01"]
      .join("-")        //             "1999-04-01"
}