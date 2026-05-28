import type { LocalizedString } from "@/lib/i18n/types";

export type Testimonial = {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  content: LocalizedString;
  rating: number;
  avatarPlaceholder: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: { ar: "أحمد محمود", en: "Ahmed Mahmoud" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `المعهد مكان محترم ذو قيمة. بحب أطور من نفسي جدًا وباخد دورات باستمرار والمكان ده من أفضل الأماكن اللي أخدت فيها دورات.`,
      en: `The institute is a respected and valuable place. I really enjoy improving myself and taking courses here.`,
    },
    rating: 5,
    avatarPlaceholder: "ahmed",
  },

  {
    id: "2",
    name: { ar: "محمد مجدي", en: "Mohamed Magdy" },
    role: {
      ar: "كورس-الإلكترونيات",
      en: "Electronics Course",
    },
    content: {
      ar: `جميل ومتعاونين، بس لازم الحضور بدري عشان ميفوتكش أي حاجة من الشرح. المكان منظم جدًا ومستوى المهندسين عالي فعلًا.`,
      en: `Great and cooperative staff. The place is very organized and the instructors are highly skilled.`,
    },
    rating: 5,
    avatarPlaceholder: "magdy",
  },

  {
    id: "3",
    name: { ar: "كريم حسن", en: "Karim Hassan" },
    role: {
      ar: "طالب — الإلكترونيات والروبوتات",
      en: "Student — Electronics & Robotics",
    },
    content: {
      ar: `أفضل أكاديمية تدريب في مصر. القاعات واسعة والإضاءة ممتازة وكل طالب له مكانه الخاص وأدواته، وفي متابعة مستمرة من المهندسين.`,
      en: `One of the best training academies in Egypt. The classrooms are spacious and the instructors constantly follow up with students.`,
    },
    rating: 5,
    avatarPlaceholder: "karim",
  },

  {
    id: "4",
    name: { ar: "محمد محسن", en: "Mohamed Mohsen" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `جي إس إم ممتازين في الشغل العملي لصيانة الموبايل. الجروب كله كان مبسوط جدًا، والمكان فعلًا مميز والناس هناك مخلصين جدًا في تعليمهم.`,
      en: `GSM are excellent in practical mobile repair training. The instructors are very dedicated to teaching.`,
    },
    rating: 5,
    avatarPlaceholder: "mohsen",
  },

  {
    id: "5",
    name: { ar: "محمود نصر", en: "Mahmoud Nasr" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `بصراحة من أفضل الأماكن اللي اتعلمت فيها. الكورس عملي جدًا وكل طالب له مكانه وأدواته، والمهندسين بيتابعوا مع الكل خطوة بخطوة.`,
      en: `One of the best places I have learned in. The course is highly practical and instructors follow up step by step.`,
    },
    rating: 5,
    avatarPlaceholder: "nasr",
  },

  {
    id: "6",
    name: { ar: "مصطفى صلاح", en: "Mostafa Salah" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `المكان منظم جدًا والقاعات مريحة ونظيفة. الشرح بسيط جدًا حتى لو معندكش خلفية كبيرة، وفي نفس الوقت التطبيق العملي كتير جدًا.`,
      en: `The place is very organized and the explanations are simple with lots of practical training.`,
    },
    rating: 5,
    avatarPlaceholder: "mostafa",
  },

  {
    id: "7",
    name: { ar: "يوسف محمود", en: "Yousef Mahmoud" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `كنت متردد قبل ما أبدأ، لكن بعد أول محاضرة حسيت إني اخترت المكان الصح. المهندسين محترمين جدًا وبيوصلوا المعلومة بطريقة سهلة.`,
      en: `I was hesitant before joining, but after the first lecture I knew I made the right choice.`,
    },
    rating: 5,
    avatarPlaceholder: "yousef",
  },

  {
    id: "8",
    name: { ar: "محمد ممدوح", en: "Mohamed Mamdouh" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `الناس هناك بتحب المجال فعلًا وده بيظهر في طريقة الشرح والتعامل. مهما تغلط أو تسأل بيعيدوا الشرح عادي جدًا لحد ما تفهم.`,
      en: `The instructors truly love what they do, and they patiently explain everything until you fully understand.`,
    },
    rating: 5,
    avatarPlaceholder: "mamdouh",
  },

  {
    id: "9",
    name: { ar: "اسلام بدر", en: "Islam Badr" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `أكتر حاجة فرقت معايا إن الكورس عملي بشكل حقيقي، مش مجرد كلام نظري.`,
      en: `The course is truly practical, not just theoretical talk. It gave me real confidence.`,
    },
    rating: 5,
    avatarPlaceholder: "islam",
  },

  {
    id: "10",
    name: { ar: "سيد بركات", en: "Sayed Barakat" },
    role: {
      ar: "كورس الإلكترونيات",
      en: "Electronics Course",
    },
    content: {
      ar: `عرفت الأكاديمية من اليوتيوب ومن كلام الناس عنها، ولما حضرت لقيت فعلاً المستوى ممتاز.`,
      en: `I found out about the academy through YouTube and the level was exactly as people described.`,
    },
    rating: 5,
    avatarPlaceholder: "sayed",
  },

  {
    id: "11",
    name: { ar: "سعد سامي", en: "Saad Samy" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `مكنتش متوقع إني بعد الكورس بفترة قصيرة أقدر أفتح محل صيانة موبايل خاص بيا.`,
      en: `Shortly after finishing the course, I was able to start my own mobile repair business.`,
    },
    rating: 5,
    avatarPlaceholder: "saad",
  },

  {
    id: "12",
    name: { ar: "أسامه أشرف", en: "Osama Ashraf" },
    role: {
      ar: "كورس الإلكترونيات",
      en: "Electronics Course",
    },
    content: {
      ar: `المهندسين كفائتهم عالية جدًا والشرح ممتاز. يمكن العيب الوحيد إن السعر عالي شوية، لكن كمية العملي والمتابعة تستحق.`,
      en: `The instructors are highly skilled and the practical training makes the course worth it.`,
    },
    rating: 4,
    avatarPlaceholder: "osama",
  },
];