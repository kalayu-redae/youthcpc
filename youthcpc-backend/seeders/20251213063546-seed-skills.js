'use strict';

module.exports = {

    async up(queryInterface) {

        const now = new Date();

        await queryInterface.bulkInsert('Skills', [

            { name: 'Leadership', category: 'Soft Skill', description: 'Leadership ability', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Communication', category: 'Soft Skill', description: 'Communication skill', isActive: true, createdAt: now, updatedAt: now },
            { name: 'JavaScript', category: 'Technology', description: 'JavaScript Programming', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Node.js', category: 'Technology', description: 'Backend Development', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Vue.js', category: 'Technology', description: 'Frontend Development', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Public Speaking', category: 'Soft Skill', description: 'Public speaking', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Photography', category: 'Creative', description: 'Photography', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Graphic Design', category: 'Creative', description: 'Graphic Design', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Agriculture', category: 'Agriculture', description: 'Agricultural Skill', isActive: true, createdAt: now, updatedAt: now }

        ]);

    },

    async down(queryInterface) {

        await queryInterface.bulkDelete('Skills', null, {});

    }

};