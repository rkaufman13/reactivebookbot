

function titleCase(title){
    title = title.toLowerCase();
    
    const splitstr = title.split(" ");
    
    for (let i = 0; i < splitstr.length; i++){
        splitstr[i]=splitstr[i].charAt(0).toUpperCase() + splitstr[i].slice(1);
    }
    title = splitstr.join(" ");
    return title;
}

function reverseAuthor(authorBackwards){
  const splitstr = authorBackwards.split(",");
        let author = [];
        for (let i = 0; i < splitstr.length; i++) {
            author[i] = splitstr[splitstr.length - 1 - i];
        }
        author = author.join(" ");
        return author;
}

function randomDate(start,end){
    var d = new Date(Math.floor(Math.random()*(end.getTime()-start.getTime())+start.getTime()));
           let month = '' + (d.getMonth() + 1);
           let day = '' + d.getDate();
           const year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

function randomDateYYYYMMDD(){
const start = new Date(2009,0,1);
const end = new Date(2018,11,31);
const arandomDate = randomDate(start,end)

return arandomDate;

}

function shortenDescription(desc){
    let shortDesc = desc.substring(0,200);
    shortDesc = shortDesc+ "...";
    return shortDesc;
}




export {titleCase,reverseAuthor, randomDateYYYYMMDD,shortenDescription}