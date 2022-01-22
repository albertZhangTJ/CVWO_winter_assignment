export function parse_vcal(str){
    var ans=[];
    var raw=str.split("\n");
    for (var i=0; i<raw.lnegth; i++){
        if (raw[i]=="BEGIN:VEVENT" || raw[i]=="BEGIN: VEVENT"){
            var to_add={
                UID: "",
                SUMMARY: "",
                DTSTAMP: "",
                ORGANIZER: "",
                MAILTO: "",
                DTSTART: "",
                DTEND: "",
                DESCRIPTION: ""
            };
            for (var j=i+1; j<raw.length; j++){
                if (raw[j].length>8 && raw[j].toUpperCase().substring(0,8)=="SUMMARY:"){
                    if (raw[j][8]==' '){
                        to_add.SUMMARY=raw[j].substring(9);
                    }
                    else {
                        to_add.SUMMARY=raw[j].substring(8);
                    }
                }
                else if (raw[j].length>8 && raw[j].toUpperCase().substring(0,8)=="DTSTAMP:"){
                    if (raw[j][8]==' '){
                        to_add.DTSTAMP=raw[j].substring(9);
                    }
                    else {
                        to_add.DTSTAMP=raw[j].substring(8);
                    }
                }
                else if (raw[j].length>8 && raw[j].toUpperCase().substring(0,8)=="DTSTART:"){
                    if (raw[j][8]==' '){
                        to_add.DTSTART=raw[j].substring(9);
                    }
                    else {
                        to_add.DTSTART=raw[j].substring(8);
                    }
                }
                else if (raw[j].length>6 && raw[j].toUpperCase().substring(0,6)=="DTEND:"){
                    if (raw[j][6]==' '){
                        to_add.DTEND=raw[j].substring(7);
                    }
                    else {
                        to_add.DTEND=raw[j].substring(6);
                    }
                }
                else if (raw[j].length>10 && raw[j].toUpperCase().substring(0,10)=="DESCRIPTION:"){
                    if (raw[j][10]==' '){
                        to_add.DESCRIPION=raw[j].substring(11);
                    }
                    else {
                        to_add.DESCRIPTION=raw[j].substring(10);
                    }
                }
                else if (raw[j].length>7 && raw[j].toUpperCase().substring(0,7)=="MAILTO:"){
                    if (raw[j][7]==' '){
                        to_add.MAILTO=raw[j].substring(8);
                    }
                    else {
                        to_add.MAILTO=raw[j].substring(7);
                    }
                }
                else if (raw[j].length>10 && raw[j].toUpperCase().substring(0,10)=="ORGANIZER:"){
                    if (raw[j][10]==' '){
                        to_add.ORGANIZER=raw[j].substring(11);
                    }
                    else {
                        to_add.ORGANIZER=raw[j].substring(10);
                    }
                }
                else if (raw[j].length>4 && raw[j].toUpperCase().substring(0,4)=="UID:"){
                    if (raw[j][4]==' '){
                        to_add.MAILTO=raw[j].substring(5);
                    }
                    else {
                        to_add.MAILTO=raw[j].substring(4);
                    }
                }
                else if (raw[i]=="END:VEVENT" || raw[i]=="END: VEVENT"){
                    if (to_add.DTSTART!="" && to_add.DTEND!=""){
                        i=j;
                        ans.push(to_add);
                        break;
                    }
                }
            }
        }
    }
    return ans;
}

export function generate_vcal(data){
    var ans="BEGIN: VCALENDAR\n";
    for (var i=0; i<data.length; i++){
        var event=data[i];
        ans=ans+"BEGIN:VEVENT";
        ans=ans+"UID:"+event.UID+"\n";
        ans=ans+"SUMMARY:"+event.SUMMARY+"\n";
        ans=ans+"DTSTAMP:"+event.DTSTAMP+"\n";
        ans=ans+"DTSTART:"+event.DTSTART+"\n";
        ans=ans+"DTEND:"+event.DTEND+"\n";
        ans=ans+"DESCRIPTION:"+event.DESCRIPION+"\n";
        ans=ans+"MAILTO:"+event.MAILTO+"\n";
        ans=ans+"ORGANIZER:"+event.ORGANIZER+"\n";
        ans=ans+"END:VEVENT\n";
    }
    ans=ans+"END:VCALENDAR\n";
    return ans;
    
}
