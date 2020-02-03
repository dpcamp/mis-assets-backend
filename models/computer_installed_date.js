'use strict';
module.exports = (sequelize, DataTypes) => {
    const ComputerInstalledDate = sequelize.define('computer_installed_date', {
        computer_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        install_date: {
            type: DataTypes.DATE
        },
    }, {
            freezeTableName: true,
            timestamps: false,
            underscored: true
        });
        ComputerInstalledDate.associate = function(models) {}
    return ComputerInstalledDate;
};