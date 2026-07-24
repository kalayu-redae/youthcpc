'use strict';

module.exports = {


    async up(queryInterface) {


        const now = new Date();


        await queryInterface.bulkInsert('ContactMessages', [


            {

                fullName: 'Abebe Kebede',

                email: 'abebe@gmail.com',

                phone: '0911111111',

                subject: 'Membership Information',

                message: 'I want information about joining CPCT Youth.',

                status: 'NEW',

                reply: null,

                repliedBy: null,

                repliedAt: null,

                isActive: true,

                createdAt: now,

                updatedAt: now

            },


            {

                fullName: 'Hana Tesfay',

                email: 'hana@gmail.com',

                phone: '0922222222',

                subject: 'Training Request',

                message: 'I am interested in youth technology training.',

                status: 'READ',

                reply: null,

                repliedBy: null,

                repliedAt: null,

                isActive: true,

                createdAt: now,

                updatedAt: now

            }


        ]);


    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            'ContactMessages',
            null,
            {}
        );

    }


};