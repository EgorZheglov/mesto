export class UserInfo{
    constructor(nameSelector, professionSelector){
        this.nameSelector = nameSelector;
        this.professionSelector = professionSelector;
    }

    getUserInfo(){
        const userName = document.querySelector(this.nameSelector).textContent;
        const profession = document.querySelector(this.professionSelector).textContent;
        return [userName, profession];
    }

    setUserInfo(userName, profession){
        document.querySelector(this.nameSelector).textContent = userName;
        document.querySelector(this.professionSelector).textContent = profession;
    }
}

//В таком случае не увидел смысла в конструкторе вообще.
//Просто если те две строчки удалить, то информация в инпутах обновлялась неправильно.