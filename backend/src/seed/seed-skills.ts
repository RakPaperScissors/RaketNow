import {AppDataSource} from '../data-source';
import {Skills} from '../entities/skills/entities/skill.entity';

const categories = [
  "Maintenance & Repair",
  "Tech & Electronics",
  "Personal & Home Care",
  "Events & Entertainment",
  "Food & Beverage",
  "Education and Tutoring",
  "Graphic & Digital Design",
  "Business & Professional Services",
  "Automotive",
  "Moving & Delivery Services",
];


const predefinedSkills = [
  { skill_Id: 1, skillName: 'Carpentry', category: 'Maintenance & Repair' },
  { skill_Id: 2, skillName: 'Gardening', category: 'Maintenance & Repair' },
  { skill_Id: 3, skillName: 'House Cleaning', category: 'Maintenance & Repair' },
  { skill_Id: 4, skillName: 'Plumbing', category: 'Maintenance & Repair' },
  { skill_Id: 5, skillName: 'Electrician', category: 'Maintenance & Repair' },
  { skill_Id: 6, skillName: 'Handyman Services', category: 'Maintenance & Repair' },
  { skill_Id: 7, skillName: 'Aircon Cleaning & Repair', category: 'Maintenance & Repair' },
  { skill_Id: 8, skillName: 'Appliance Repair', category: 'Maintenance & Repair' },
  { skill_Id: 9, skillName: 'Roof Repair', category: 'Maintenance & Repair' },
  { skill_Id: 10, skillName: 'Pest Control', category: 'Maintenance & Repair' },
  { skill_Id: 11, skillName: 'Computer Technician', category: 'Tech & Electronics' },
  { skill_Id: 12, skillName: 'Phone Technician', category: 'Tech & Electronics' },
  { skill_Id: 13, skillName: 'CCTV Installer', category: 'Tech & Electronics' },
  { skill_Id: 14, skillName: 'Software Developer', category: 'Tech & Electronics' },
  { skill_Id: 15, skillName: 'Network Setup & Troubleshooting', category: 'Tech & Electronics' },
  { skill_Id: 16, skillName: 'Smart Home Setup', category: 'Tech & Electronics' },
  { skill_Id: 17, skillName: 'Printer Repair', category: 'Tech & Electronics' },
  { skill_Id: 18, skillName: 'Data Recovery', category: 'Tech & Electronics' },
  { skill_Id: 19, skillName: 'Masseuse', category: 'Personal & Home Care' },
  { skill_Id: 20, skillName: 'Hair Services', category: 'Personal & Home Care' },
  { skill_Id: 21, skillName: 'Nail Services', category: 'Personal & Home Care' },
  { skill_Id: 22, skillName: 'Makeup Services', category: 'Personal & Home Care' },
  { skill_Id: 23, skillName: 'Barber Services', category: 'Personal & Home Care' },
  { skill_Id: 24, skillName: 'Skincare & Facial Treatments', category: 'Personal & Home Care' },
  { skill_Id: 25, skillName: 'Home Service Spa', category: 'Personal & Home Care' },
  { skill_Id: 26, skillName: 'Driver', category: 'Personal & Home Care' },
  { skill_Id: 27, skillName: 'Assistant/Helper', category: 'Personal & Home Care' },
  { skill_Id: 28, skillName: 'Elderly Caregiver', category: 'Personal & Home Care' },
  { skill_Id: 29, skillName: 'Babysitting', category: 'Personal & Home Care' },
  { skill_Id: 30, skillName: 'Event Hosting', category: 'Events & Entertainment' },
  { skill_Id: 31, skillName: 'Event Planning & Logistics', category: 'Events & Entertainment' },
  { skill_Id: 32, skillName: 'Photographer / Videographer', category: 'Events & Entertainment' },
  { skill_Id: 33, skillName: 'DJ / Musician', category: 'Events & Entertainment' },
  { skill_Id: 34, skillName: 'Lights & Sounds Setup', category: 'Events & Entertainment' },
  { skill_Id: 35, skillName: 'Party Coordinator', category: 'Events & Entertainment' },
  { skill_Id: 36, skillName: 'Photobooth Operator', category: 'Events & Entertainment' },
  { skill_Id: 37, skillName: 'Home Cook', category: 'Food & Beverage' },
  { skill_Id: 38, skillName: 'Catering', category: 'Food & Beverage' },
  { skill_Id: 39, skillName: 'Baker / Pastry Maker', category: 'Food & Beverage' },
  { skill_Id: 40, skillName: 'Food Quality Control', category: 'Food & Beverage' },
  { skill_Id: 41, skillName: 'Bartender / Mixologist', category: 'Food & Beverage' },
  { skill_Id: 42, skillName: 'Waiting Staff', category: 'Food & Beverage' },
  { skill_Id: 43, skillName: 'Academic Tutor', category: 'Education and Tutoring' },
  { skill_Id: 44, skillName: 'Language Tutor', category: 'Education and Tutoring' },
  { skill_Id: 45, skillName: 'Music Tutor', category: 'Education and Tutoring' },
  { skill_Id: 46, skillName: 'Art Tutor', category: 'Education and Tutoring' },
  { skill_Id: 47, skillName: 'Exam & Test Reviewer', category: 'Education and Tutoring' },
  { skill_Id: 48, skillName: 'Homeschooling Coach', category: 'Education and Tutoring' },
  { skill_Id: 49, skillName: 'Thesis Assistance', category: 'Education and Tutoring' },
  { skill_Id: 50, skillName: 'Logo Designer', category: 'Graphic & Digital Design' },
  { skill_Id: 51, skillName: 'Social Media Conent Designer', category: 'Graphic & Digital Design' },
  { skill_Id: 52, skillName: 'Branding Kits', category: 'Graphic & Digital Design' },
  { skill_Id: 53, skillName: 'UI/UX Designer', category: 'Graphic & Digital Design' },
  { skill_Id: 54, skillName: 'Presentation Design', category: 'Graphic & Digital Design' },
  { skill_Id: 55, skillName: 'Photo / Video Editors', category: 'Graphic & Digital Design' },
  { skill_Id: 56, skillName: 'Animation & Motion Graphics', category: 'Graphic & Digital Design' },
  { skill_Id: 57, skillName: 'Illustrator', category: 'Graphic & Digital Design' },
  { skill_Id: 58, skillName: 'Digital Marketing / Advertisement Manager', category: 'Business & Professional Services' },
  { skill_Id: 59, skillName: 'Social Media Management', category: 'Business & Professional Services' },
  { skill_Id: 60, skillName: 'Content Writing & Copywriting', category: 'Business & Professional Services' },
  { skill_Id: 61, skillName: 'Virtual Assistant', category: 'Business & Professional Services' },
  { skill_Id: 62, skillName: 'Human Resource & Recruitment Services', category: 'Business & Professional Services' },
  { skill_Id: 63, skillName: 'Business Registration Assistance', category: 'Business & Professional Services' },
  { skill_Id: 64, skillName: 'Inventory & Stock Management', category: 'Business & Professional Services' },
  { skill_Id: 65, skillName: 'Bookkeeping & Accounting', category: 'Business & Professional Services' },
  { skill_Id: 66, skillName: 'Resume Writing', category: 'Business & Professional Services' },
  { skill_Id: 67, skillName: 'Transcription Services', category: 'Business & Professional Services' },
  { skill_Id: 68, skillName: 'Data Entry', category: 'Business & Professional Services' },
  { skill_Id: 69, skillName: 'Vehicle Repair & Maintenance', category: 'Automotive' },
  { skill_Id: 70, skillName: 'Auto Dealing', category: 'Automotive' },
  { skill_Id: 71, skillName: 'Car Wash Home Service', category: 'Automotive' },
  { skill_Id: 72, skillName: 'Car Interior Cleaning', category: 'Automotive' },
  { skill_Id: 73, skillName: 'Motorcycle Repair', category: 'Automotive' },
  { skill_Id: 74, skillName: 'Mobile Mechanic', category: 'Automotive' },
  { skill_Id: 75, skillName: 'Battery Replacement', category: 'Automotive' },
  { skill_Id: 76, skillName: 'House Moving Services', category: 'Moving & Delivery Services' },
  { skill_Id: 77, skillName: 'Office Relocation', category: 'Moving & Delivery Services' },
  { skill_Id: 78, skillName: 'Vehicle Rental', category: 'Moving & Delivery Services' },
  { skill_Id: 79, skillName: 'Motorcycle Courier', category: 'Moving & Delivery Services' },
];

async function seedSkills() {
  await AppDataSource.initialize();
  const skillRepo = AppDataSource.getRepository(Skills);

  for (const skillData of predefinedSkills) {
    const exists = await skillRepo.findOneBy({ skill_Id: skillData.skill_Id });
    if (!exists) {
      const newSkill = skillRepo.create(skillData);
      await skillRepo.save(newSkill);
    }
  }

  await AppDataSource.destroy();
}

seedSkills().catch((err) => {
  console.error('Error:', err);
});
