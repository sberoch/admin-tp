const ROLES = {
    Rescuer: 'Rescuer',
    Adopter: 'Adopter'
}

const UserPostPath = {
    Rescuer: '/rescuers',
    Adopter: '/adopters',
    Pets: '/pets' 
};

const HomeRedirection = {
    Rescuer: '/homeRescuer',
    Adopter: '/homeAdopter' 
}

module.exports = { ROLES, UserPostPath, HomeRedirection };