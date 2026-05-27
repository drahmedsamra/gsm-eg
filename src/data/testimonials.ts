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
      en: `The institute is a respected and valuable place. I really love improving myself and I continuously take courses, and this place is one of the best places where I have taken courses.`,
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
      en: `Great and cooperative staff. You need to arrive early so you don’t miss anything from the explanation. The place is very organized and the engineers are highly skilled.`,
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
      en: `One of the best training academies in Egypt. The classrooms are spacious, the lighting is excellent, and every student has their own workspace and tools. The instructors constantly follow up with students.`,
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
      en: `GSM are excellent when it comes to practical mobile repair training. Everyone in the group was very happy, and the place is truly special. The instructors are very dedicated to teaching.`,
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
      en: `Honestly, this is one of the best places I have learned in. The course is heavily focused on practical training, and every student has their own workspace and tools while instructors follow up step by step.`,
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
      en: `The place is very organized and the classrooms are comfortable and clean. The explanations are simple even if you don’t have much background knowledge, and there is a lot of practical training.`,
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
      en: `I was hesitant before joining, but after the first lecture I felt that I made the right choice. The instructors are very respectful and explain everything in a very simple way.`,
    },
    rating: 5,
    avatarPlaceholder: "yousef",
  },

  {
    id: "8",
    name: { ar: "محمد ممدوح", en: "Mohamed Mamouh" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `الناس هناك بتحب المجال فعلًا وده بيظهر في طريقة الشرح والتعامل. مهما تغلط أو تسأل بيعيدوا الشرح عادي جدًا لحد ما تفهم. تجربة جميلة جدًا وأنصح أي حد عايز يتعلم إلكترونيات أو صيانة موبايل إنه يجرب بنفسه `,
      en: `The people there truly love what they do, and that shows in the way they teach and deal with students. No matter how many mistakes you make or questions you ask, they patiently explain everything again until you understand. It was a great experience, and I recommend it to anyone interested in electronics or mobile repair.`,
    },
    rating: 5,
    avatarPlaceholder: "mamdouh",
  },



  {  
  id: "9",
    name: { ar: "اسلام بدر ", en: "Islam Badr" },
    role: {
      ar: "كورس-صيانة-الموبايل",
      en: "Mobile Maintenance Course",
    },
    content: {
      ar: `أكتر حاجة فرقت معايا إن الكورس عملي بشكل حقيقي، مش مجرد كلام نظري. اشتغلنا بإيدينا على أعطال وتطبيقات كتير جدًا، وده خلاني أكتسب ثقة كبيرة. المكان محترم جدًا والناس فيه بتحب تساعد بجد`,
      en: `What made the biggest difference for me is that the course is truly practical, not just theoretical talk. We worked with our hands on many real repairs and applications, which gave me a lot of confidence. The place is very professional, and the people genuinely care about helping students.`,
    },
    rating: 5,
    avatarPlaceholder: "islam",


  },


  {  
    id: "10",
      name: { ar: "سيد بركات", en: "Sayed barakat" },
      role: {
        ar: "كورس الإلكترونيات",
        en: "Elecronics Course",
      },
      content: {
        ar: `عرفت الأكاديمية من اليوتيوب ومن كلام الناس عنها، ولما حضرت لقيت فعلاً المستوى ممتاز. التنظيم محترم جدًا وكل حاجة ماشية بسيستم واضح. حتى التعامل من أول الحجز كان مريح واحترافي`,
        en: `I found out about the academy through YouTube and people’s reviews, and when I joined, I found the level exactly as people described. The organization is excellent and everything follows a professional system. Even the registration process was smooth and professional.`,
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
          ar: `مكنتش متوقع إني بعد الكورس بفترة قصيرة أقدر أفتح محل صيانة موبايل خاص بيا، لكن الحمد لله بدأت أشتغل فعلاً والناس بقت تيجيلي من ترشيحات. أكتر حاجة فادتني إنهم كانوا مركزين جدًا على العملي، ف لما بدأت شغل مكنتش حاسس إني داخل المجال جديد.  `,
          en: `I honestly didn’t expect that shortly after finishing the course I would be able to open my own mobile repair shop, but thankfully I already started working and getting customers through recommendations. What helped me the most was the strong practical training, so when I started working I didn’t feel new to the field. Huge respect to the instructors for all the effort they put into teaching us.`,
        },
        rating: 5,
        avatarPlaceholder: "saad",
    
    
      },


      {  
        id: "12",
          name: { ar: "أسامه أشرف ", en: "Osama Ashraf" },
          role: {
            ar: "كورس الإلكترونيات",
            en: "Elecronics Course",
          },
          content: {
            ar: `المهندسين كفائتهم عالية جدًا والشرح ممتاز، وكل واحد فيهم واضح إنه عنده خبرة حقيقية في المجال. مدة الكورس كانت مناسبة جدًا وفيها وقت كافي للتطبيق العملي. يمكن العيب الوحيد إن السعر يعتبر عالي شوية، لكن بصراحة بعد ما بدأت الكورس وفهمت كمية العملي والمتابعة حسيت إن الموضوع يستحق`,
            en: `The instructors are highly skilled and the teaching quality is excellent. You can clearly see that they have real experience in the field. The course duration was very suitable and gave enough time for practical training. The only downside might be that the price is a bit high, but honestly after starting the course and seeing the amount of practical work and support, I felt it was worth it.`,
          },
          rating: 4,
          avatarPlaceholder: "osama",
      
      
        },



















];