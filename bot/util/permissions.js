exports.calculate = function(member) {
    if (member.id == "208666671194439681" || member.id == "276397437869096960") {
        return 2;
    };

    if (member.roles.find("name", "Zap commander")) {
        return 1;
    };

    return 0;
};
