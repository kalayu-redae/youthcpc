'use strict';

module.exports = {

    async up(queryInterface) {

        const now = new Date();

        const [users] = await queryInterface.sequelize.query(`SELECT id FROM Users LIMIT 1`);
        const [zones] = await queryInterface.sequelize.query(`SELECT id,regionId FROM Zones LIMIT 1`);
        const [woredas] = await queryInterface.sequelize.query(`SELECT id,zoneId FROM Woredas LIMIT 1`);
        const [tabiyas] = await queryInterface.sequelize.query(`SELECT id,woredaId FROM Tabiyas LIMIT 1`);
        const [educationLevels] = await queryInterface.sequelize.query(`SELECT id FROM EducationLevels LIMIT 1`);
        const [professions] = await queryInterface.sequelize.query(`SELECT id FROM Professions LIMIT 1`);

        if (!users.length || !zones.length || !woredas.length || !tabiyas.length || !educationLevels.length || !professions.length) {
            throw new Error('Please seed Users, Zones, Woredas, Tabiyas, EducationLevels and Professions first.');
        }

        await queryInterface.bulkInsert('MemberProfiles', [{

            userId: users[0].id,

            membershipNumber: 'CPCT-000001',

            gender: 'MALE',

            dateOfBirth: '1998-01-01',

            maritalStatus: 'SINGLE',

            nationality: 'Ethiopian',

            regionId: zones[0].regionId,

            zoneId: zones[0].id,

            woredaId: woredas[0].id,

            tabiyaId: tabiyas[0].id,

            educationLevelId: educationLevels[0].id,

            professionId: professions[0].id,

            occupation: 'Software Developer',

            organization: 'CPCT Youth Wing',

            employmentStatus: 'EMPLOYED',

            monthlyIncome: 5000.00,

            availabilityStatus: 'AVAILABLE',

            availabilityNote: 'Available for youth activities',

            emergencyContactName: 'Redae',

            emergencyContactPhone: '0911111111',

            membershipDate: now,

            experience: 'Youth organizer since 2023.',

            certifications: 'Leadership Training,Digital Skills',

            volunteerExperience: 'Community volunteer for youth awareness campaigns.',

            aspirations: 'Become a regional youth leader.',

            socialMedia: JSON.stringify({
                facebook: 'https://facebook.com/kalayu',
                telegram: '@kalayu',
                linkedin: 'https://linkedin.com/in/kalayu'
            }),

            bio: 'Active CPCT Youth member.',

            isVerified: true,

            verificationDate: now,

            verifiedBy: users[0].id,

            isActive: true,

            createdAt: now,

            updatedAt: now

        }]);

    },

    async down(queryInterface) {

        await queryInterface.bulkDelete('MemberProfiles', null, {});

    }

};