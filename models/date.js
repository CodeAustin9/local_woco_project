module.exports = function (sequelize, DataTypes) {
    var date = sequelize.define("Date", {

        // Creates a "Date" model that matches up with DB
        singleName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        singlePhoto: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        singleEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            // validate: {
            //     isEmail: true
            // }
        },

        // TO DO: Add option to associate date score
        singleScores: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },

       
    });

    return date;
};