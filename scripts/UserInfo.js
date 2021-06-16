export class UserInfo{
    constructor(nameSelector, professionSelector){
        this.name = document.querySelector(nameSelector).textContent;
        this.profession = document.querySelector(professionSelector).textContent;
    }

    getUserInfo(){
        return [this.name, this.profession];
    }

    setUserInfo(name, profession){
        document.querySelector('.profile__name').textContent = name;
        document.querySelector('.profile__profession').textContent = profession;
        this.name = name;
        this.profession = profession;
    }
}