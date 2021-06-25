const ROLES = {
    Rescuer: 'Rescuer',
    Adopter: 'Adopter'
}

const UserPostPath = {
    Rescuer: '/rescuers',
    Adopter: '/adopters' 
};

const HomeRedirection = {
    Rescuer: '/homeRescuer',
    Adopter: '/homeAdopter' 
}

module.exports = { ROLES, UserPostPath, HomeRedirection };