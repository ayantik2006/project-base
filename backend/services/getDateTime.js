exports.getDateTime=()=>{
    const now=new Date();
    const day=now.getDate();
    const month=now.getMonth()+1;
    const year=now.getFullYear();
    const hour=now.getHours();
    const minute=now.getMinutes();
    const dateTime=day+"/"+month+"/"+year+", "+hour+":"+minute+" "+(hour >= 12 ? "PM" : "AM");
    return dateTime;
}
