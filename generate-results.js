
var fs = require('fs');
var unzipper = require('unzipper');
let ejs = require('ejs');

/*fetch the views*/
let views = fs.readdirSync("latex-views")
    .filter(f => f.endsWith(".ejs"))
    .reduce((a, c) => { a[c.replace(".ejs", "")] = new String(fs.readFileSync("latex-views/" + c)); return a }, {});
/** check if the file OASCollection_and_metrics.json exists*/
if (!fs.existsSync('OASCollection_and_metrics.json')) {
    /*unzip the OASCollection_and_metrics.json.zip file*/
    fs.createReadStream('OASCollection_and_metrics.json.zip').pipe(unzipper.Extract({ path: './' })).on('finish', () => {
        fs.readFile('OASCollection_and_metrics.json', 'utf8', function (err, contents) {
            /*read the OASCollection_and_metrics.json file*/
            var data = JSON.parse(contents);
            generateMonthlyDistributionResults(data);
            generateScatterPlots(data, "paths", "unique_defined_schemas")
            generateScatterPlots(data, "breadth", "unique_defined_schemas")
        });
    })
}
else {
    fs.readFile('OASCollection_and_metrics.json', 'utf8', function (err, contents) {
        var data = JSON.parse(contents);
        generateMonthlyDistributionResults(data);
        // generateClassesPlot(data)
        generateScatterPlots(data, "paths", "unique_defined_schemas")
        generateScatterPlots(data, "paths", "unique_defined_schemas")
    });
}

/*generate the monthly distribution results*/
function generateMonthlyDistributionResults(data) {
    /*count files with the same short date*/
    var total = {};
    var valid = {};
    var invalid = {};
    data.forEach(function (item) {
        var shortDate = item.metadata.last_update.split('-').slice(0, 2).join(' - ');
        if (total[shortDate] == undefined) {
            total[shortDate] = 0;
            valid[shortDate] = 0;
            invalid[shortDate] = 0;
        }
        total[shortDate]++;
        if (item.metadata.isValid) {
            valid[shortDate]++;
        }
        else {
            invalid[shortDate]++;
        }
    });
    var data = { data: { total, invalid, valid } };;
    console.log(data);
    /*generate the monthly distribution plot results*/
    fs.writeFileSync('results-tex/monthly-distribution-results.tex', ejs.render(views["monthly-cumulative-distribution"], data));


}

function generateClassesPlot(data) {
    data.forEach(function (item) {
        console.log(item.metrics);
    });

}

function generateScatterPlots(data, x, y) {
    var arr = []
    var d = {}
    var counter = 0;
    var xs = [];
    var ys = [];
    data.forEach(function (item) {
       
        if (item.metrics[x] != 0 && item.metrics[y] != 0) {
            xs.push(item.metrics[x]);
            ys.push(item.metrics[y]);
            if (d[item.metrics[x] + ' ' + item.metrics[y]]) {
                d[item.metrics[x] + ' ' + item.metrics[y]]++;
            }
            else {
                d[item.metrics[x] + ' ' + item.metrics[y]] = 1;
            }
            counter++;
        }
    });

    /**Compute correlation between two arrays xs and ys */
    var correlation = 0;
    var x_mean = 0;
    var y_mean = 0;
    var x_var = 0;
    var y_var = 0;
    var x_std = 0;
    var y_std = 0;
    var covar = 0;
    var n = xs.length;
    for (var i = 0; i < n; i++) {
        x_mean += xs[i];
        y_mean += ys[i];
    }
    x_mean /= n;
    y_mean /= n;
    for (var i = 0; i < n; i++) {
        x_var += Math.pow(xs[i] - x_mean, 2);
        y_var += Math.pow(ys[i] - y_mean, 2);
        covar += (xs[i] - x_mean) * (ys[i] - y_mean);
    }
    x_var /= n;
    y_var /= n;
    covar /= n;
    x_std = Math.sqrt(x_var);
    y_std = Math.sqrt(y_var);
    correlation = covar / (x_std * y_std);

    console.log(correlation);
    var toPrint = {data:{ d:d, x: x, y: y, count: counter,corr:correlation.toFixed(2) }}
    fs.writeFileSync(`results-tex/scatter-plot-${x}-vs-${y}.tex`, ejs.render(views["scatter-plot"], toPrint));
}












