// import {AppDataSource} from '../data-source';
// import {Skills} from '../entities/raketistaProfile/skills.entity';

// const predefinedSkills = [
//   { skill_Id: '', skillName: '', category: '' },
//   { skill_Id: '', skillName: '', category: '' },
//   { skill_Id: '', skillName: '', category: '' },
//   { skill_Id: '', skillName: '', category: '' },
// ];

// async function seedSkills() {
//   await AppDataSource.initialize();
//   const skillRepo = AppDataSource.getRepository(Skills);

//   for (const skillData of predefinedSkills) {
//     const exists = await skillRepo.findOneBy({ skill_Id: skillData.skill_Id });
//     if (!exists) {
//       const newSkill = skillRepo.create(skillData);
//       await skillRepo.save(newSkill);
//       console.log(`Inserted skill: ${skillData.skillName}`);
//     } else {
//       console.log(`Skipped: ${skillData.skillName} already exists`);
//     }
//   }

//   await AppDataSource.destroy();
// }

// seedSkills().catch((err) => {
//   console.error('Error:', err);
// });
