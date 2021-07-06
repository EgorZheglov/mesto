export class UserInfo{
    constructor(nameSelector, professionSelector, avatarSelector){
        this.name = document.querySelector(nameSelector);
        this.profession = document.querySelector(professionSelector);
        this.avatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        return [this.name.textContent, this.profession.textContent];
    }

    setUserInfo(userName, profession){
        this.name.textContent = userName;
        this.profession.textContent = profession;
    }

    setUserAvatar(link){
        this.avatar.src = link;
    }
}
