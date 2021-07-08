export class UserInfo{
    constructor(nameSelector, professionSelector, avatarSelector){
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        return [this._name.textContent, this._profession.textContent];
    }

    setUserInfo(userName, profession){
        this._name.textContent = userName;
        this._profession.textContent = profession;
    }

    setUserAvatar(link){
        this._avatar.src = link;
    }
}
