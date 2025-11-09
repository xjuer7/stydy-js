export default class Student {
    constructor(name, lastname, surname, birthday, studyStart, faculty, id) {
        this.name = name
        this.surname = surname
        this.lastname = lastname
        this.birthday = birthday
        this.studyStart = studyStart
        this.faculty = faculty
        this.id = id
    }

    //делаем функцию свойством, чтобы получить ФИО
    get fio() {
        return `${this.surname} ${this.name} ${this.lastname}`
    }

    get educationEndDate() {
        return this.studyStart + 4;
    } 

    getStudyCourse() {
        //берем сентябрь начала года обучения, в августе еще студент
        let year = currentTime.getFullYear() - this.studyStart;
        let month = (currentTime.getMonth() + 1) - 9;
        if (year > 0) {
            if (year > 0 && year <= 4 && month > 0) {
                return (`${year} курс`);
            } else if (year > 0 && year < 4 && month === 0) {
                return (`${year + 1} курс`);
            } else if (year = 4 && month > 0){
                return ('Закончил');
            }  
        } else {
            return (`Будет на ${Math.abs(year)} курсе`);
        }
        
        
    }

    getBirthDate() {
    let yyyy = this.birthday.getFullYear();
    let mm = this.birthday.getMonth() + 1;
    let dd = this.birthday.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
    }

   getAge() {
    let age = currentTime.getFullYear() - this.birthday.getFullYear();
    let mm = (currentTime.getMonth() + 1) - this.birthday.getMonth();
    if (mm < 0 || (mm === 0 && currentTime.getDate() < this.birthday.getDate())) {
        age--;
    }

    if (age === 21 || age === 31 || age === 41 || age === 51 || age === 61) {
        return (`${age} год`);
    } else if (age > 21 && age < 25 || age > 31 && age < 35 || age > 41 && age < 45 || age > 51 && age < 55 || age > 61 && age < 65 ) {
        return (`${age} года`);
    } return (`${age} лет`)
}
}



let currentTime = new Date();

