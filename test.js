const fs = require("fs"); /*
fs.rename(
  "C:\\Users\\andre\\AppData\\Local\\Temp\\1.txt",
  "C:\\" + Date.now() + ".txt",
  function(er) {
    if (er) console.log(er);
  }
);*/

let file = fs.readFile(
  "C:\\Users\\andre\\AppData\\Local\\Temp\\1.txt",
  function(error, data) {
    if (error) throw error; // если возникла ошибка

    fs.writeFile("C:\\Users\\andre\\Desktop\\1.txt", data, function(e) {});
  }
);
