'use strict';

module.exports = {

    async up(queryInterface) {

        const now = new Date();

        const [users] = await queryInterface.sequelize.query('SELECT id FROM Users LIMIT 1');

        const repliedBy = users.length ? users[0].id : null;

        await queryInterface.bulkInsert('ContactMessages', [

            {
                fullName: 'Kalayu Redae',
                email: 'kalayuredae2016@gmail.com',
                phone: '0943662611',
                subject: 'Membership Registration',
                message: 'I would like to know how to register as a member.',
                status: 'NEW',
                reply: null,
                repliedBy: null,
                repliedAt: null,
                isActive: true,
                createdAt: now,
                updatedAt: now
            },

            {
                fullName: 'Abraham Tesfay',
                email: 'abraham@example.com',
                phone: '0911223344',
                subject: 'Youth Leadership Training',
                message: 'When will the next leadership training start?',
                status: 'READ',
                reply: null,
                repliedBy: null,
                repliedAt: null,
                isActive: true,
                createdAt: now,
                updatedAt: now
            },

            {
                fullName: 'Sara Berhe',
                email: 'sara@example.com',
                phone: '0922334455',
                subject: 'Volunteer Program',
                message: 'I would like to volunteer for upcoming community activities.',
                status: 'REPLIED',
                reply: 'Thank you for contacting us. Volunteer registration will open next week. Please keep checking our website for announcements.',
                repliedBy: repliedBy,
                repliedAt: now,
                isActive: true,
                createdAt: now,
                updatedAt: now
            },

            {
                fullName: 'Daniel Gebru',
                email: 'daniel@example.com',
                phone: '0933445566',
                subject: 'Account Assistance',
                message: 'I forgot my membership number. Can you help me recover it?',
                status: 'CLOSED',
                reply: 'Your membership information has been sent to your registered email address. If you need additional assistance, please contact us again.',
                repliedBy: repliedBy,
                repliedAt: now,
                isActive: true,
                createdAt: now,
                updatedAt: now
            }

        ]);

    },

    async down(queryInterface) {

        await queryInterface.bulkDelete('ContactMessages', null, {});

    }

};