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
        var d = new Date(start.getTime() + Math.floor(Math.random()) * (end.getTime() - start.getTime())),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
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



export {titleCase,reverseAuthor, randomDateYYYYMMDD}