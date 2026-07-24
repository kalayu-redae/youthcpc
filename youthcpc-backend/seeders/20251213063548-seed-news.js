'use strict';

module.exports = {

    async up(queryInterface) {

        const now = new Date();


        const [users] = await queryInterface.sequelize.query(
            `SELECT id FROM Users LIMIT 1`
        );


        if (!users.length) {

            throw new Error('Please create user first');

        }


        await queryInterface.bulkInsert('News', [

            {

                title: 'CPCT Youth Platform Launch',

                slug: 'cpct-youth-platform-launch',

                summary: 'CPCT Youth online platform has been launched.',

                content: 'The CPCT Youth Platform helps young members register, manage profiles and access opportunities.',

                image: 'news1.jpg',

                category: 'Announcement',

                authorId: users[0].id,

                status: 'PUBLISHED',

                publishedDate: now,

                views: 0,

                isActive: true,

                createdAt: now,

                updatedAt: now

            },


            {

                title: 'Youth Leadership Training',

                slug: 'youth-leadership-training',

                summary: 'Leadership training organized for youth members.',

                content: 'A leadership and capacity building training program was conducted for CPCT youth members.',

                image: 'training.jpg',

                category: 'Training',

                authorId: users[0].id,

                status: 'PUBLISHED',

                publishedDate: now,

                views: 0,

                isActive: true,

                createdAt: now,

                updatedAt: now

            }


        ]);


    },


    async down(queryInterface) {

        await queryInterface.bulkDelete('News', null, {});

    }

};