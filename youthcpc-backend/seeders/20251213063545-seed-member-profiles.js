'use strict';

module.exports = {

    async up(queryInterface) {

        const now = new Date();

        const [[user]] = await queryInterface.sequelize.query("SELECT id FROM Users WHERE phoneNumber='0943662611' LIMIT 1");

        const [[tabiya]] = await queryInterface.sequelize.query("SELECT id FROM Tabiyas WHERE name='Waereb Deqali' LIMIT 1");

        if (!user) throw new Error('User not found');

        await queryInterface.bulkInsert('MemberProfiles', [{

            userId: user.id,

            membershipNumber: 'CPCT-000001',

            firstName: 'Kalayu',

            middleName: 'Redae',

            lastName: 'Gebreab',

            gender: 'MALE',

            dateOfBirth: '1998-01-01',

            maritalStatus: 'SINGLE',

            nationality: 'Ethiopian',

            tabiyaId: tabiya ? tabiya.id : null,

            occupation: 'Software Developer',

            organization: 'CPCT Youth',

            employmentStatus: 'EMPLOYED',

            monthlyIncome: 0,

            skills: ['Leadership', 'Programming'],

            interests: ['Peace Building', 'Technology'],

            aspirations: ['Community Leadership', 'AI Research'],

            availabilityStatus: 'AVAILABLE',

            emergencyContactName: 'Mereseit',

            emergencyContactPhone: '0911000000',

            membershipDate: now,

            bio: 'System administrator.',

            createdAt: now,

            updatedAt: now

        }]);

    },

    async down(queryInterface) {

        await queryInterface.bulkDelete('MemberProfiles', null, {});

    }

};