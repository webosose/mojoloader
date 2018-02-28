// build_framework.js
// Invoke from /usr/palm/frameworks/<framework_name>/version/1.0
// to build the concatenated.js file containing all of the framework code
// TODO: invoke CLosure compiler (maybe using web service?) to compress output

var fs = require('fs');
var manifest = JSON.parse(fs.readFileSync('manifest.json'));
var files = manifest.files.javascript;
var source = "var MojoLoader=require('mojoloader.js');\n";
var past_license = false;
for (var i=0; i<files.length; i++) {
	var content = fs.readFileSync("javascript/"+files[i]);
	var lines = content.toString().split("\n");
	for (var j=0; j < lines.length; j++) {
		var line = lines[j];
		if (line.slice(0,2) == "//" && past_license) {
			//console.log("skipping comment: "+line);
		} else {
			source+=line+"\n";
			if (line.indexOf("LICENSE@@@") !== -1) {
				past_license=true;
			}
		}
	}
}
source +="\n";
module.exports=exports;
fs.writeFileSync("node_module.js", source);

