function home() {
	document.getElementById('home').style.display="table";
	document.getElementById('info').style.display="none";
	document.getElementById('skills').style.display="none";
	document.getElementById('about').style.display="none";
}
function info() {
	document.getElementById('home').style.display="none";
	document.getElementById('info').style.display="table";
	document.getElementById('skills').style.display="none";
	document.getElementById('about').style.display="none";
}
function skills() {
	document.getElementById('home').style.display="none";
	document.getElementById('info').style.display="none";
	document.getElementById('skills').style.display="table";
	document.getElementById('about').style.display="none";
}
function about() {
	document.getElementById('home').style.display="none";
	document.getElementById('info').style.display="none";
	document.getElementById('skills').style.display="none";
	document.getElementById('about').style.display="table";
}