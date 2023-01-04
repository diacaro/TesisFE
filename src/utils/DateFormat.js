export const setFormatDate=(dateSource)=>{
    //dateSource.setDate(dateSource.getDate() + 1)
    //new Date("2011-09-24".replace(/-/g, '\/'));
    //new Date( doo.getTime() + Math.abs(doo.getTimezoneOffset()*60000) )
    var d = new Date(dateSource),
    month = '' + (d.getUTCMonth() + 1),
    day = '' + (d.getUTCDate()),
    year = d.getUTCFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

return [year, month, day].join('-');
}