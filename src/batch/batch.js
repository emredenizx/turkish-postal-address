import { batchWriteDistricts, batchWriteProvinces, batchWriteLocalities } from "./utils";

const path = require('path');
const fs = require('fs');

fs.readdir(
    path.resolve(__dirname, './localities'),
    (err, files) => {
      if (err) throw err;
      
      for (let file of files) {
        console.log(file);
      }
    }
  );


/* const write = () => {
    batchWriteProvinces(provinces);
}

write(); */