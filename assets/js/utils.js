/*
JavaScript Style guide: https://github.com/airbnb/javascript/tree/master/es5
*/

//toda String terá um String replaceAll na instância
String.prototype.replaceAll=replaceAll;

function milisecondsToDate(miliseconds) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    return formatDate(dd, mm, yyyy);
}

function formatDate(dd, mm, yyyy) {
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
}

function replaceAll(find, replace) {
    return this.replace(new RegExp(find, 'g'), replace);
}