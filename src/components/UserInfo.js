export class UserInfo{
    constructor(nameSelector, professionSelector){
        this.name = document.querySelector(nameSelector);
        this.profession = document.querySelector(professionSelector);
    }

    getUserInfo(){
        return [this.name.textContent, this.profession.textContent];
    }

    setUserInfo(userName, profession){
        this.name.textContent = userName;
        this.profession.textContent = profession;
    }
}
