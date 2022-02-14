const { exec } = require("child_process");
const fs = require("fs");

/* read the content of the results-tex folder and get all the files ending by .tex and put them in an array*/
var files = fs.readdirSync("results-tex");
files.forEach(function (file) {
    if (file.endsWith(".tex")) {    
        /*compile the .tex file*/
        console.log("wait ... ");
        console.log("compiling " + file);
        exec("pdflatex -output-directory=build " + "results-tex/"+file , (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            // console.log(stdout);
            // console.log(stderr);
            /**move the generate pdf to results-pdf */
            exec("mv " + "build/"+file.replace(".tex", ".pdf") + " results-pdf/"+file.replace(".tex", ".pdf"));
        }
        );
    }
});
console.log("Results are successfully compiled. Check the results-pdf folder");


