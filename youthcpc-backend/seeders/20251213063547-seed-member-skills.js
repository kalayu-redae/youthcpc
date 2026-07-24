'use strict';

module.exports = {

    async up(queryInterface) {

        const now = new Date();

        const [members] = await queryInterface.sequelize.query(
            'SELECT id FROM MemberProfiles ORDER BY id LIMIT 2'
        );


        const [skills] = await queryInterface.sequelize.query(
            'SELECT id FROM Skills ORDER BY id LIMIT 4'
        );


        if (members.length < 1 || skills.length < 1)
            return;


        const data = [];


        data.push({

            memberProfileId: members[0].id,
            skillId: skills[0].id,
            level: 'ADVANCED',
            yearsOfExperience: 5,
            remarks: 'Core competency',
            isActive: true,
            createdAt: now,
            updatedAt: now

        });


        if (skills[1]) {

            data.push({

                memberProfileId: members[0].id,
                skillId: skills[1].id,
                level: 'INTERMEDIATE',
                yearsOfExperience: 2,
                remarks: '',
                isActive: true,
                createdAt: now,
                updatedAt: now

            });

        }



        if (members[1] && skills[2]) {

            data.push({

                memberProfileId: members[1].id,
                skillId: skills[2].id,
                level: 'BEGINNER',
                yearsOfExperience: 1,
                remarks: '',
                isActive: true,
                createdAt: now,
                updatedAt: now

            });

        }



        await queryInterface.bulkInsert(
            'MemberSkills',
            data
        );


    },


    async down(queryInterface) {

        await queryInterface.bulkDelete(
            'MemberSkills',
            null,
            {}
        );

    }

};