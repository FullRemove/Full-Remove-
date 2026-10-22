import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  isArabic: boolean;
  t: (key: string) => string;
}

const LANGUAGE_STORAGE_KEY = 'full_remove_language_v1';

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Brand & General
    'brand.name': 'FULL REMOVE',
    'brand.subtitle': 'خدمة المساعدة في إزالة المحتوى الرقمي',
    'brand.slogan': 'لن نترك أي شيء وراءنا.',
    'brand.slogan_full': '"لن نترك أي شيء وراءنا."',
    'brand.security_guarantee_title': 'ضمان أمان فول ريموف:',
    'brand.security_guarantee_desc': 'لن نطلب منك مطلقاً كلمات مرور حساباتك أو بيانات تسجيل دخولك.',
    'brand.security_guarantee_short': 'لا نطلب كلمات المرور أبداً.',
    'brand.admin_active': 'حساب المشرف نشط',
    'brand.admin_portal': 'بوابة الإدارة',
    'brand.dashboard': 'لوحة التحكم',
    'brand.exit': 'خروج',
    'brand.sign_out': 'تسجيل الخروج',
    'brand.my_cases': 'طلباتي',

    // Nav Links
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.submit': 'تقديم طلب',
    'nav.track': 'متابعة الطلب',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.legal': 'السياسات والإشعار القانوني',
    'nav.submit_cta': 'تقديم طلب إزالة',
    'nav.admin_login': 'دخول موظفي الإدارة',

    // Hero Section
    'hero.badge': 'خدمة مستقلة للمساعدة في حذف المحتوى وحماية الخصوصية',
    'hero.title_start': 'المساعدة في إزالة المحتوى والحذف من',
    'hero.title_gradient': 'منصات التواصل الاجتماعي',
    'hero.desc': 'استعد كرامتك وخصوصيتك الرقمية. نساعد الأفراد، صناع المحتوى، والمهنيين في إزالة الحسابات المزيفة، المقاطع والصور غير المصرح بنشرها، حملات التشهير، وتسريبات البيانات الشخصية عبر إنستغرام، فيسبوك، تيك توك، إكس، ويوتيوب.',
    'hero.cta_submit': 'تقديم طلب إزالة محتوى',
    'hero.cta_track': 'متابعة حالة طلب موجود',
    'hero.pill_passwords': 'لا نطلب كلمات المرور نهائياً',
    'hero.pill_confidential': 'سرية تامة وموثقة بنسبة 100%',
    'hero.pill_tos': 'تصعيد قانوني وفق شروط الخدمة',

    // Hero Quick Track Box
    'hero.track_title': 'مركز استقبال طلبات الإزالة',
    'hero.track_subtitle': 'خدمة مساعدة مستقلة للحقوق الرقمية',
    'hero.track_label': 'لديك طلب حالي؟ تتبعه مباشرة الآن:',
    'hero.track_placeholder': 'مثال: FR-2026-8842',
    'hero.track_btn': 'تتبع الآن',
    'hero.track_demo': 'معرف تجريبي للاختبار:',
    'hero.trust_no_false_title': 'لا وعود وهمية أو خادعة',
    'hero.trust_no_false_desc': 'نحن صريحون تماماً: المنصات تحتفظ بالقرار النهائي للحذف، لكن مذكراتنا النظامية ترفع نسب النجاح لأقصى حد.',
    'hero.trust_discretion_title': 'سرية وحماية مشددة',
    'hero.trust_discretion_desc': 'أدلتك وبياناتك الشخصية تُعامل بسرية بالغة ويتم إتلافها فور إغلاق القضية بنجاح.',
    'hero.explore_services': 'استعرض كافة خدمات المنصات',

    // Supported Strip
    'strip.title': 'مساعدة متخصصة عبر كبرى شبكات التواصل ومراكز المحتوى',

    // Home Services Grid
    'home.services_kicker': 'مجالات اختصاصنا الرئيسية',
    'home.services_title': 'خدمات احترافية لإزالة المحتوى الرقمي',
    'home.services_desc': 'عندما تفشل أزرار الإبلاغ التقليدية أو ترد عليك روبوتات الدعم الآلية بأنه "لا توجد مخالفة"، يتدخل فريق فول ريموف بإعداد ملفات طعن قانونية مدعومة بالأدلة وبنود شروط الخدمة.',
    'home.srv_impersonation_title': 'إلغاء الحسابات المزيفة وانتحال الشخصية',
    'home.srv_impersonation_desc': 'الحسابات المنسوخة التي تسرق اسمك وصورك لخداع متابعيك، طلب الأموال، أو ابتزاز معارفك على إنستغرام وفيسبوك وتيك توك.',
    'home.srv_impersonation_stat': 'معدل معالجة المنصة: 24 - 48 ساعة',
    'home.srv_media_title': 'حذف الصور ومقاطع الفيديو غير المصرح بها',
    'home.srv_media_desc': 'المحتوى المنشور دون موافقتك، المقاطع المصورة سراً، أو التسريبات الشخصية المنتهكة لخصوصيتك في الأماكن المغلقة.',
    'home.srv_media_stat': 'مسار عاجل لانتهاكات الخصوصية والـ NCII',
    'home.srv_defamation_title': 'تصعيد قضايا التشهير والقذف الرقمي',
    'home.srv_defamation_desc': 'الادعاءات الملفقة، التقييمات الوهمية لتشويه السمعة، وحملات الإساءة المنسقة ضد سمعتك الشخصية أو نشاطك التجاري.',
    'home.srv_defamation_stat': 'توثيق انتهاك معايير المجتمع لمكافحة المضايقة',
    'home.srv_doxxing_title': 'تسريب البيانات الشخصية (الدوكسينغ)',
    'home.srv_doxxing_desc': 'تدخل طارئ لحذف عناوين السكن المنشورة، أرقام الهواتف، الوثائق الرسمية، ومعلومات العائلة المسربة بهدف التهديد.',
    'home.srv_doxxing_stat': 'طابور طوارئ ذو أولوية حرجة (< 24 ساعة)',
    'home.view_all_services': 'عرض التفاصيل الكاملة لإجراءات وأسباب الحذف',

    // 4-Step Process
    'process.kicker': 'منهجية العمل',
    'process.title': 'كيف تعمل خدمة FULL REMOVE',
    'process.desc': 'نستبدل بلاغات المنصات السطحية بمذكرات انتهاك رسمية مبنية على بنود السياسات والحقوق الرقمية المعترف بها.',
    'process.step1_title': 'فحص الأدلة وهيكلة الملف',
    'process.step1_desc': 'تزودنا بالروابط وتفاصيل الواقعة. نقوم بمطابقتها مع بنود شروط الخدمة الدقيقة للمنصة المعنية وسياسات الخصوصية الدولية.',
    'process.step2_title': 'صياغة المذكرة الرسمية',
    'process.step2_desc': 'نحرر إخطار إزالة نظامي ومحكم يحدد بدقة معايير المجتمع المخترقة، حقوق الملكية الفكرية، أو انتهاكات الخصوصية.',
    'process.step3_title': 'التصعيد عبر قنوات الأمان الموثوقة',
    'process.step3_desc': 'يتم رفع القضية مباشرة إلى مكاتب الثقة والأمان (Trust & Safety)، مسؤولي الخصوصية، ومكاتب نزاعات حقوق الطبع والنشر للمنصات.',
    'process.step4_title': 'المتابعة والتحقق النهائي',
    'process.step4_desc': 'نتابع مراجعة المنصة خطوة بخطوة حتى يتم إغلاق الحساب أو مسح الرابط نهائياً، مع إشعارك بالتحديثات لحظة بلحظة.',
    'process.standard_proc': 'إجراء احترافي منظم',
    'process.banner_kicker': 'التزامنا الحاسم تجاهك',
    'process.banner_title': '"لن نترك أي شيء وراءنا."',
    'process.banner_desc': 'سواء كان حساباً منسوخاً، مقاطع فيديو أعيد رفعها، أو روابط فرعية متفرعة، فإننا نلاحق كل أثر مسيء حتى يُطهر فضاؤك الرقمي بالكامل.',
    'process.banner_btn': 'قدّم طلب إزالة الآن',

    // Real-world scenarios
    'scenarios.kicker': 'حالات واقعية شائعة',
    'scenarios.title': 'متى تحتاج إلى التواصل مع FULL REMOVE؟',
    'scenarios.c1_tag': 'انتحال هوية مهنية وتجارية',
    'scenarios.c1_title': 'حساب منسوخ يراسل العملاء للاحتيال',
    'scenarios.c1_desc': '"قام شخص مجهول بسرقة صوري وسيرتي الذاتية وأنشأ حساباً مشابهاً وبدأ بمراسلة زبائني لطلب تحويلات مالية عاجلة."',
    'scenarios.c1_res': '36 ساعة (تعطيل الحساب نهائياً عبر إنستغرام)',
    'scenarios.c2_tag': 'حملة تشهير وتشويه سمعة',
    'scenarios.c2_title': 'فيديو تيك توك يحتوي افتراءات مفبركة',
    'scenarios.c2_desc': '"تم نشر مقطع بمحادثات مزورة يتهمني بالنصب والاحتيال التجاري. البلاغات العادية كانت تُرفض آلياً."',
    'scenarios.c2_res': '48 ساعة (حذف المقطع لمخالفته إرشادات تيك توك)',
    'scenarios.c3_tag': 'انتهاك خصوصية ومقاطع سرية',
    'scenarios.c3_title': 'تسريب تسجيل مصور في مكان خاص',
    'scenarios.c3_desc': '"تسجيل فيديو تم التقاطه داخل مكان خاص ونُشر دون علمي أو إذني في منتدى مفتوح ومجموعات تواصل."',
    'scenarios.c3_res': '18 ساعة (إشعار طوارئ لانتهاك الخصوصية)',

    // FAQ
    'faq.title': 'الأسئلة الشائعة',
    'faq.desc': 'إجابات واضحة وشفافة قبل تقديم طلبك.',
    'faq.q1': 'هل ستطلبون مني كلمة مرور حسابي في أي وقت؟',
    'faq.a1': 'مستحيل ونهائياً. لا تطلب فول ريموف تحت أي ظرف كلمات المرور، أو رموز التحقق بخطوتين (2FA)، أو صلاحيات الدخول إلى حسابك. جميع طلبات الحذف تتم خارجياً عبر آليات الطعن والإبلاغ الرسمية للمنصات والمذكرات النظامية.',
    'faq.q2': 'هل تقدمون ضماناً بنسبة 100% لنجاح الإزالة؟',
    'faq.a2': 'لا يمكن لأي خدمة صادقة تقديم ضمان مطلق بنسبة 100%، فالقرار السيادي والتقني النهائي يعود دائماً لإدارات المنصات (ميتا، تيك توك، إكس، جوجل). لكن صياغتنا الاحترافية للبلاغات وتوثيق الانتهاكات القانونية يرفع بشكل حاسم فرص قبول الإزالة وإلغاء المحتوى.',
    'faq.q3': 'هل أنتم شركاء رسميون لمنصة إنستغرام أو تيك توك؟',
    'faq.a3': 'لا. فول ريموف هي خدمة حرة ومستقلة للمساعدة في الحقوق الرقمية وحذف المحتوى المسيء. نحن لا ندعي أي شراكة رسمية أو رعاية مع أي من تلك الشركات.',
    'faq.q4': 'كيف أتابع حالة طلبي بعد التقديم؟',
    'faq.a4': 'سيتم تزويدك برقم قضية فريد (مثل FR-2026-XXXX). يمكنك الانتقال لصفحة "متابعة الطلب" وإدخال الرمز وبريدك للاطلاع على التحديثات والملاحظات المباشرة أولاً بأول.',
    'faq.cta_ready': 'هل أنت مستعد لاتخاذ إجراء ضد المحتوى المسيء؟',
    'faq.cta_sub': 'لا تنتظر حتى ينتشر المحتوى المؤذي أكثر. أرسل الروابط اليوم وسيبدأ خبراؤنا في تجهيز مذكرة الإزالة.',
    'faq.cta_btn': 'قدّم قضيتك للمراجعة الآن',

    // Services Page
    'services.header_kicker': 'تخصصات FULL REMOVE الميدانية',
    'services.header_title': 'خدمات متخصصة في إزالة المحتوى الرقمي',
    'services.header_desc': 'نقدم مساعدة منهجية ومدعومة بالأدلة للأفراد والشركات المستهدفة بحملات الإساءة الإلكترونية، الحسابات المنسوخة، والوسائط غير المصرح بها.',
    'services.filter_all': 'كافة الخدمات',
    'services.filter_impersonation': 'انتحال الشخصية والحسابات المزيفة',
    'services.filter_media': 'الوسائط المسربة وغير المصرح بها',
    'services.filter_defamation': 'التشهير وتشويه السمعة',
    'services.filter_doxxing': 'تسريب البيانات (الدوكسينغ)',
    'services.btn_request_this': 'طلب إزالة لهذا النوع',
    'services.detailed_desc': 'الوصف التفصيلي للإجراء',
    'services.legal_basis': 'الأسس القانونية وسياسات المنصات المعتمدة:',
    'services.supported_platforms': 'المنصات المدعومة',
    'services.expected_window': 'فترة المعالجة المتوقعة',
    'services.window_note': 'تعتمد المدة على سرعة استجابة فرق مراجعة المنصة، ونقوم بمتابعة وتذكير المكاتب دورياً.',
    'services.required_from_you': 'المعلومات المطلوبة منك:',
    'services.reminder_no_pass': 'تذكير أمني: لا نطلب كلمات المرور أو بيانات الدخول نهائياً.',
    'services.boundaries_title': 'حدود عملنا ومعاييرنا الأخلاقية',
    'services.boundaries_desc': 'نلتزم بالشفافية المطلقة والامتثال للأنظمة. إليك ما نفعله وما نرفضه تماماً:',
    'services.what_we_do_title': 'ما يقوم به فريق FULL REMOVE',
    'services.what_we_do_1': 'جمع وتوثيق الأدلة الرقمية وأرشفة الروابط والطوابع الزمنية قبل قيام الجناة بإخفائها.',
    'services.what_we_do_2': 'ربط المخالفة بدقة ببنود شروط الخدمة ومعايير المجتمع وقوانين الخصوصية وقانون الألفية (DMCA).',
    'services.what_we_do_3': 'صياغة مذكرات انتهاك مهنية وتقديمها عبر قنوات النزاعات الرسمية ومكاتب الثقة والأمان.',
    'services.what_we_do_4': 'تزويدك بمتابعة مستمرة وشفافة حتى التأكد من إزالة الرابط المسيء نهائياً.',
    'services.what_we_never_title': 'ما لا نفعله نهائياً (خطوط حمراء)',
    'services.what_we_never_1': 'لا نطلب كلمات المرور: لن نطلب أبداً كلمة سر حسابك أو رموز المصادقة الثنائية.',
    'services.what_we_never_2': 'لا اختراق ولا قرصنة: لا نقوم باختراق الحسابات أو هجمات السيرفرات؛ كل أعمالنا قانونية وإدارية.',
    'services.what_we_never_3': 'لا ادعاءات شراكة وهمية: لا نزعم أننا موظفون في شركة ميتا أو تيك توك أو جهات أمنية.',
    'services.what_we_never_4': 'لا ضمانات زائفة: لا نضمن الحذف المطلق في حالات النقد المشروع أو الأخبار العامة المحمية قانونياً.',

    // Submit Request Page
    'submit.kicker': 'تسجيل واقعة وتقديم الأدلة',
    'submit.title': 'تقديم طلب إزالة محتوى',
    'submit.desc': 'يرجى تقديم تفاصيل وروابط المحتوى المسيء. سيقوم خبراؤنا المستقلون بمراجعة المخالفة وتجهيز ملف طلب الإزالة فوراً.',
    'submit.sec1_title': '1. معلومات التواصل والهوية',
    'submit.sec1_desc': 'تُستخدم حصرياً لإرسال إشعارات القضية وإثبات الأهلية في إقرارات المنصات الرسمية.',
    'submit.name_label': 'الاسم الكامل أو اسم الجهة الرسمية',
    'submit.email_label': 'البريد الإلكتروني لاستلام التحديثات',
    'submit.phone_label': 'رقم الهاتف (اختياري للرسائل العاجلة)',
    'submit.messenger_label': 'حساب فيسبوك ماسنجر أو المعرف (اختياري)',
    'submit.sec2_title': '2. تصنيف المنصة ونوع المخالفة',
    'submit.platform_label': 'منصة التواصل الاجتماعي المعنية',
    'submit.category_label': 'سبب الإزالة / نوع الانتهاك',
    'submit.urgency_label': 'مستوى الأهمية والسرعة المطلوبة',
    'submit.urgency_std': 'قياسي (مراجعة خلال 48-72 ساعة)',
    'submit.urgency_high': 'أولوية عالية (تصعيد خلال 24-48 ساعة)',
    'submit.urgency_crit': 'حالة طارئة حرجة (تدخل فوري خلال أقل من 24 ساعة)',
    'submit.sec3_title': '3. الروابط المسيئة وتفاصيل الواقعة',
    'submit.urls_label': 'رابط المحتوى أو الحساب المسيء مباشرة',
    'submit.add_url': 'إضافة رابط آخر (حتى 5 روابط)',
    'submit.reason_label': 'سبب الإزالة ووصف تفصيلي للواقعة',
    'submit.reason_placeholder': 'اشرح كيف ينتهك هذا المحتوى خصوصيتك أو حقوقك أو قواعد المنصة (مثال: هذا الحساب سرق صوري لانتحال شخصيتي وخداع الناس؛ هذا الفيديو التُقط دون إذني في مكان خاص)...',
    'submit.reason_hint': 'تزويدنا بتفاصيل دقيقة يعزز من قوة المذكرة الرسمية. الحد الأدنى 20 حرفاً.',
    'submit.evidence_desc_label': 'تفاصيل الأدلة ووسائل الإثبات الداعمة',
    'submit.evidence_desc_placeholder': 'اذكر ما تملكه من إثباتات: تاريخ النشر الأصلي، الصور الأصلية بجودة عالية، شهادات العلامة التجارية، لقطات شاشة واضحة للمحادثات...',
    'submit.files_label': 'إرفاق ملفات إثبات داعمة (لقطات شاشة، هوية مموهة، إلخ)',
    'submit.files_browse': 'اضغط هنا لاختيار الملفات من جهازك',
    'submit.files_types': 'PNG, JPG, PDF, أو ZIP (خزينة أدلة سرية مشفرة)',
    'submit.sec4_title': 'إقرارات والتزامات العميل الإلزامية',
    'submit.check_passwords': 'سياسة عدم طلب كلمات المرور: أقر بأنني لم أقم ولن أقوم بمشاركة كلمة مرور حسابي أو رموز التحقق مع فول ريموف.',
    'submit.check_no_guarantee': 'خدمة مستقلة وعدم ضمان النتيجة: أدرك أن فول ريموف هي خدمة حرة للمساعدة في الحذف وليست شريكاً رسمياً للمنصات، وأن قرار الحذف يعود لسياسات مشرفي المنصات.',
    'submit.check_terms': 'صحة المعلومات والموافقة على الشروط: أؤكد أن جميع ادعاءاتي في هذا النموذج صحيحة، وأوافق على سياسة الخدمة وسياسة الخصوصية لفول ريموف.',
    'submit.submitting': 'جارٍ تسجيل ملف القضية...',
    'submit.submit_btn': 'إرسال طلب الإزالة للمراجعة',
    'submit.success_title': 'تم استلام وتسجيل طلب الإزالة',
    'submit.success_desc': 'تم تحويل ملف قضيتك إلى مكتب فحص البلاغات. يرجى الاحتفاظ برقم القضية أدناه لمتابعة الإجراءات:',
    'submit.case_id_label': 'رقم تتبع القضية الخاص بك',
    'submit.copy_id': 'نسخ رقم القضية',
    'submit.copied': 'تم النسخ بنجاح!',
    'submit.track_now_btn': 'تتبع مراحل القضية الآن',
    'submit.submit_another': 'تقديم طلب جديد',

    // Track Request Page
    'track.kicker': 'بوابة تتبع العملاء الآمنة',
    'track.title': 'متابعة حالة طلب الإزالة',
    'track.desc': 'أدخل رقم القضية (Case ID) والبريد الإلكتروني للتحقق من أحدث التحديثات والملاحظات الميدانية.',
    'track.case_id_label': 'رقم القضية',
    'track.case_id_placeholder': 'مثال: FR-2026-8842',
    'track.email_label': 'بريدك الإلكتروني (للتحقق والسرية)',
    'track.lookup_btn': 'استعلام',
    'track.demo_title': 'نماذج تجريبية سريعة:',
    'track.status_pending': 'قيد الانتظار',
    'track.status_review': 'قيد المراجعة',
    'track.status_submitted': 'تم التقديم للمنصة',
    'track.status_resolved': 'تم حذف المحتوى بنجاح',
    'track.status_rejected': 'مرفوض من المنصة',
    'track.step1': '1. استلام الطلب',
    'track.step1_sub': 'تم تسجيل الطلب وتصنيفه في جدول المراجعة',
    'track.step2': '2. فحص الأدلة',
    'track.step2_sub': 'المختص يقوم بصياغة المذكرة القانونية',
    'track.step3': '3. التصعيد للمنصة',
    'track.step3_sub': 'رُفع البلاغ لمكتب الثقة والأمان بالمنصة',
    'track.step4': '4. حسم القضية',
    'track.step4_sub': 'إزالة المحتوى أو إلغاء الحساب المخالف',
    'track.specialist_update': 'آخر تحديث من مسؤول القضية',
    'track.docket_ref': 'رقم التذكرة بمرجع المنصة:',
    'track.target_info': 'معلومات المحتوى المستهدف',
    'track.reported_circumstances': 'تفاصيل البلاغ والأدلة',
    'track.activity_log': 'سجل الإجراءات والأنشطة',
    'track.have_evidence': 'هل تود إضافة أدلة إضافية أو صور جديدة؟',
    'track.contact_specialist': 'تواصل مع مسؤول القضية',
    'track.all_user_cases': 'جميع القضايا المسجلة للبريد',

    // About Page
    'about.kicker': 'حقوق رقمية ومساعدة مستقلة',
    'about.title': 'عن منصة FULL REMOVE',
    'about.desc': 'ممارسة مهنية مستقلة لمساعدة الأفراد والمهنيين وصناع المحتوى في إزالة المحتوى المؤذي واستعادة خصوصيتهم الرقمية.',
    'about.story_title': 'قصتنا ورسالتنا كخدمة مساعدة مستقلة',
    'about.story_p1': 'عندما يقوم معتدٍ بنشر صور خاصة دون إذن، أو انتحال هوية شخص عبر تزييف حسابه، أو نشر شائعات وافتراءات، غالباً ما يتلقى الضحايا ردوداً آلية ومحبطة من المنصات الكبرى تفيد بأنه "لم يتم العثور على أي انتهاك". قنوات البلاغ المعتادة تخذل الناس في أغلب الأحيان.',
    'about.story_p2': 'في المقابل، تطلب مكاتب المحاماة مبالغ باهظة مجرد فتح ملف استشارة. تم تأسيس فول ريموف كخدمة حرة مستقلة لسد هذه الفجوة: تقديم مساعدة متخصصة ومصممة خصيصاً لإسقاط المحتوى المخالف بتكاليف مناسبة ودون تعقيدات بيروقراطية.',
    'about.story_p3': 'نتعامل مع كل حالة بالأهمية والاهتمام الإنساني الذي تستحقه. بمجرد تسجيل طلبك معنا، ننظم الأدلة، نحدد الانتهاكات القانونية واللائحية، ونخاطب لجان الأمان الرسمية بالمنصات بلغة لا يمكنهم تجاهلها.',
    'about.slogan_box_title': 'لماذا شعارنا هو "لن نترك أي شيء وراءنا"؟',
    'about.slogan_box_desc': 'لأن المحتوى المسيء نادراً ما يقف عند منشور واحد؛ فالحسابات المزيفة تستنسخ، والفيديوهات يعاد رفعها على مواقع أخرى. فلسفتنا هي الشمولية والاجتهاد: لا نكتفي بالإبلاغ عن الرابط الأساسي، بل نتعقب الروابط الفرعية والحسابات التابعة حتى يعود سجلك الرقمي نظيفاً وخالياً من أي أثر مؤذٍ.',
    'about.principles_title': 'المبادئ الأخلاقية الخمسة غير القابلة للمساومة',
    'about.p1_title': '1. حظر طلب كلمات المرور قطعياً',
    'about.p1_desc': 'لن نطلب أبداً كلمة سر حسابك أو رموز الدخول. أي جهة تطلب كلمة سرك تمثل خطراً على أمانك. جميع إجراءاتنا تتم خارجياً عبر القنوات القانونية المعتمدة.',
    'about.p2_title': '2. الصدق المطلق وتجنب الوعود الزائفة',
    'about.p2_desc': 'لا نطلق وعوداً كاذبة بالحذف الحتمي، فالمنصات تملك القرار النهائي على خوادمها. ما نضمنه لك هو أقصى جهد مهني وتنسيق قانوني محكم.',
    'about.p3_title': '3. استقلالية تامة ونزاهة مهنية',
    'about.p3_desc': 'نحن مستقلون بالكامل، ولا ندعي شراكات خاصة أو علاقات سرية مع مدراء ميتا أو تيك توك. قوتنا نابعة من فهمنا العميق لقوانينهم وسياساتهم.',
    'about.p4_title': '4. السرية التامة وإتلاف البيانات',
    'about.p4_desc': 'أدلتك ووثائقك تحفظ في بيئة مشفرة ومعزولة. فور اكتمال القضية بنجاح، يتم إتلاف وحذف المستندات الحساسة نهائياً.',
    'about.p5_title': '5. أساليب قانونية وأخلاقية 100%',
    'about.p5_desc': 'نعتمد فقط على إخطارات الـ DMCA وشروط الاستخدام ومذكرات انتهاك الخصوصية الرسمية. لا نمارس أي اختراق أو ابتزاز مضاد.',
    'about.disclosure_title': 'إفصاح الاستقلالية والحدود القانونية',
    'about.disclosure_desc': 'فول ريموف تقدم استشارات إجرائية ومساعدة إدارية لحذف المحتوى. لسنا مكتب محاماة ولا نقدم تمثيلاً قضائياً أمام المحاكم. إذا كانت قضيتك تستدعي دعوى مدنية أو ملاحقة جنائية رسمية، سننصحك بالاستعانة بمحامٍ مرخص أو إبلاغ السلطات الأمنية.',

    // Legal Page
    'legal.kicker': 'الامتثال والشفافية القانونية',
    'legal.title': 'السياسات، الشروط والإشعار القانوني',
    'legal.desc': 'إفصاح شفاف عن سياسات عملنا، معايير حماية البيانات، وإخلاء المسؤولية القانوني الإلزامي.',
    'legal.tab_privacy': 'سياسة الخصوصية',
    'legal.tab_service': 'سياسة الخدمة والشروط',
    'legal.tab_impressum': 'الإشعار القانوني (Impressum)',

    // Contact Page
    'contact.kicker': 'مكتب المساعدة المباشر',
    'contact.title': 'تواصل مع فريق FULL REMOVE',
    'contact.desc': 'لديك استفسار قبل التقديم أو تحتاج لنصيحة عاجلة بشأن حساب منتحل أو تسريب؟ تواصل معنا عبر النموذج أو فيسبوك ماسنجر.',
    'contact.messenger_title': 'فيسبوك ماسنجر (Facebook Messenger)',
    'contact.messenger_desc': 'تواصل مع مكتب المساعدة الحرة لدينا عبر ماسنجر لإجراء فحص أولي سريع ومشاركة المستندات.',
    'contact.open_messenger': 'فتح محادثة ماسنجر',
    'contact.sla_title': 'أوقات الاستجابة المتوقعة',
    'contact.sla_urgent': 'الحالات الحرجة والدوكسينغ: أقل من 12 ساعة',
    'contact.sla_std': 'الاستفسارات العامة: أقل من 24 ساعة (طوال أيام الأسبوع)',
    'contact.victim_tip_title': 'نصيحة طوارئ عاجلة للمتضررين',
    'contact.victim_tip_desc': 'قبل أن تتواصل مع المبتز أو تعلق على المنشور المسيء، التقط لقطات شاشة واضحة تشمل شريط الرابط بالأعلى وتاريخ النشر واسم الحساب. غالباً ما يغير الجناة أسماء حساباتهم بمجرد شعورهم بالخطر.',
    'contact.form_title': 'إرسال استفسار مباشر إلى فول ريموف',
    'contact.form_name': 'اسمك الكريم',
    'contact.form_email': 'بريدك الإلكتروني',
    'contact.form_subject': 'موضوع الرسالة',
    'contact.form_msg': 'تفاصيل استفسارك',
    'contact.form_send': 'إرسال الرسالة',
    'contact.msg_sent_title': 'تم استلام رسالتك بنجاح!',
    'contact.msg_sent_desc': 'شكراً لتواصلك. رقم مرجع استفسارك هو',

    // Admin Console
    'admin.title': 'لوحة تحكم إدارة FULL REMOVE',
    'admin.operator': 'المشرف المصرح له:',
    'admin.tab_requests': 'طلبات الإزالة',
    'admin.tab_messages': 'رسائل الاستفسار',
    'admin.tab_hosting': 'دليل الاستضافة المجانية والتحذير المالي',
    'admin.total_cases': 'إجمالي الطلبات',
    'admin.status_update_title': 'تحديث حالة القضية',
    'admin.public_note_label': 'الملاحظة العلنية (تظهر للعميل في صفحة التتبع)',
    'admin.private_note_label': 'ملاحظات المشرف الداخلية (سرية)',
    'admin.ticket_ref_label': 'رقم التذكرة بمرجع المنصة (اختياري)',
    'admin.save_btn': 'حفظ وتحديث القضية',
    'admin.case_inspector_title': 'فحص الأدلة وملف القضية الكامل',
    'admin.cost_warning_title': 'تحذير بشأن الخدمات المدفوعة',
    'admin.cost_warning_desc': 'تمت برمجة هذا النظام ليعمل بنسبة 100% ضمن الحدود المجانية (Free-Tier). احرص على عدم تفعيل خطط الدفع المدفوعة مثل خطة Blaze في فايربيس طالما أن عدد طلباتك يقل عن 50,000 استعلام يومياً.',

    // Footer
    'footer.disclaimer_title': 'تنبيه هام حول الاستقلالية والحدود القانونية:',
    'footer.disclaimer_text': 'تعمل FULL REMOVE كخدمة حرة ومستقلة تماماً للمساعدة في حذف المحتوى وإدارته. نحن لسنا مكتب محاماة ولا نقدم تمثيلاً قضائياً رسمياً. لا ندعي أي شراكة أو رعاية رسمية مع منصات ميتا (فيسبوك وإنستغرام)، تيك توك، إكس، جوجل، أو غيرها. قرارات الحذف تخضع حصرياً للسياسات وسلطة المنصات المستضيفة للمحتوى، ولا تقدم الخدمة ضماناً بنسبة 100% لإلغاء كل محتوى.',
    'footer.rights': 'جميع الحقوق محفوظة. "لن نترك أي شيء وراءنا."',
    'footer.privacy_link': 'سياسة الخصوصية',
    'footer.terms_link': 'شروط الخدمة',
    'footer.impressum_link': 'الإشعار القانوني'
  },
  en: {
    // Brand & General
    'brand.name': 'FULL REMOVE',
    'brand.subtitle': 'Online Content Removal & Takedown Assistance',
    'brand.slogan': "We Won't Leave Anything Behind.",
    'brand.slogan_full': '"We Won\'t Leave Anything Behind."',
    'brand.security_guarantee_title': 'Full Remove Security Guarantee:',
    'brand.security_guarantee_desc': 'We will NEVER request your account passwords or login credentials.',
    'brand.security_guarantee_short': 'Never ask for passwords.',
    'brand.admin_active': 'Admin Active',
    'brand.admin_portal': 'Admin Portal',
    'brand.dashboard': 'Dashboard',
    'brand.exit': 'Exit',
    'brand.sign_out': 'Sign out',
    'brand.my_cases': 'My Cases',

    // Nav Links
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.submit': 'Submit Request',
    'nav.track': 'Track Request',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.legal': 'Legal & Impressum',
    'nav.submit_cta': 'Submit Request',
    'nav.admin_login': 'Admin Staff Login',

    // Hero Section
    'hero.badge': 'Independent Cyber-Rights & Takedown Assistance',
    'hero.title_start': 'Online Content Removal &',
    'hero.title_gradient': 'Takedown Assistance',
    'hero.desc': 'Reclaim your digital dignity. We assist individuals, creators, and professionals in eradicating unauthorized media, fake impersonating profiles, defamation, and leaked private data from major social media platforms.',
    'hero.cta_submit': 'Submit a Removal Request',
    'hero.cta_track': 'Track My Request Status',
    'hero.pill_passwords': 'Never Ask For Passwords',
    'hero.pill_confidential': '100% Confidential Handling',
    'hero.pill_tos': 'Legitimate TOS Escalation',

    // Hero Quick Track Box
    'hero.track_title': 'Takedown Case Dispatch',
    'hero.track_subtitle': 'Independent Privacy Assistance',
    'hero.track_label': 'Have an active case? Track it instantly:',
    'hero.track_placeholder': 'e.g. FR-2026-8842',
    'hero.track_btn': 'Track',
    'hero.track_demo': 'Demo test ID:',
    'hero.trust_no_false_title': 'No False Promises',
    'hero.trust_no_false_desc': 'We are fully honest: social platforms retain ultimate removal authority, but our statutory notices maximize success.',
    'hero.trust_discretion_title': 'Complete Discretion',
    'hero.trust_discretion_desc': 'Your evidence and identification are kept strictly confidential and purged post-resolution.',
    'hero.explore_services': 'Explore all platform services',

    // Supported Strip
    'strip.title': 'Assistance Across Major Social Networks & Content Hubs',

    // Home Services Grid
    'home.services_kicker': 'Our Core Practice',
    'home.services_title': 'Specialized Content Removal Capabilities',
    'home.services_desc': 'When standard platform reporting buttons fail or return automated "no violation" bots, Full Remove intervenes with structured, statutory evidence packets.',
    'home.srv_impersonation_title': 'Fake Profile & Impersonation Takedown',
    'home.srv_impersonation_desc': 'Cloned profiles copying your identity, profile pictures, and name to scam followers, solicit funds, or harass contacts on Instagram, Facebook, and TikTok.',
    'home.srv_impersonation_stat': 'Average 24–48h platform processing',
    'home.srv_media_title': 'Unauthorized Photos & Video Removal',
    'home.srv_media_desc': 'Non-consensual imagery, intimate media, leaked private recordings, or unauthorized photographs published without authorization.',
    'home.srv_media_stat': 'Expedited privacy violation filings',
    'home.srv_defamation_title': 'Defamatory Content & Slander Escalation',
    'home.srv_defamation_desc': 'Fabricated allegations, fake customer reviews, smear campaigns, and harmful falsehoods designed to damage your personal reputation or business.',
    'home.srv_defamation_stat': 'TOS Harassment & Defamation packaging',
    'home.srv_doxxing_title': 'Doxxing & Personal Data Leaks',
    'home.srv_doxxing_desc': 'Emergency removal assistance when bad actors publish your residential address, phone number, private emails, or family details online.',
    'home.srv_doxxing_stat': 'Critical priority emergency queue',
    'home.view_all_services': 'View Full Breakdown of Removal Grounds & Procedures',

    // 4-Step Process
    'process.kicker': 'Takedown Methodology',
    'process.title': 'How Full Remove Works',
    'process.desc': 'We replace frustrating automated report forms with targeted, legally-grounded violation documentation.',
    'process.step1_title': 'Evidence Audit & Case Packaging',
    'process.step1_desc': 'You submit the offending URL and situation details. We analyze the violation against the platform’s specific Terms of Service and statutory privacy policies.',
    'process.step2_title': 'Formal Notice Drafting',
    'process.step2_desc': 'We draft and format an ironclad takedown report citing exact community guidelines, copyright rules, or privacy terms violated.',
    'process.step3_title': 'Dedicated Platform Escalation',
    'process.step3_desc': 'Your case is submitted directly through verified trust & safety, privacy desk, and DMCA escalation channels.',
    'process.step4_title': 'Verification & Post-Audit',
    'process.step4_desc': 'We track the platform review until the content is fully removed or de-indexed, providing you with real-time status updates.',
    'process.standard_proc': 'Standardized Procedure',
    'process.banner_kicker': 'Our Uncompromising Commitment',
    'process.banner_title': '"We Won\'t Leave Anything Behind."',
    'process.banner_desc': 'Whether it is a cloned profile, re-uploaded video clips, or mirror links, we pursue every lingering footprint until your digital space is cleared.',
    'process.banner_btn': 'File a Removal Request Now',

    // Real-world scenarios
    'scenarios.kicker': 'Common Case Scenarios',
    'scenarios.title': 'When Should You Call Full Remove?',
    'scenarios.c1_tag': 'Executive Impersonation',
    'scenarios.c1_title': 'Cloned Profile Soliciting Network',
    'scenarios.c1_desc': '"An attacker downloaded my LinkedIn and Instagram photos, set up a duplicate account, and was actively messaging my clients requesting money transfers."',
    'scenarios.c1_res': '36 Hours (Instagram deactivation)',
    'scenarios.c2_tag': 'Defamatory Smear Campaign',
    'scenarios.c2_title': 'Fabricated TikTok Allegations',
    'scenarios.c2_desc': '"A viral smear video containing altered chat logs was posted anonymously, accusing our small company of fraud. Standard reporting did nothing."',
    'scenarios.c2_res': '48 Hours (TikTok Guidelines takedown)',
    'scenarios.c3_tag': 'Privacy & Intimate Media',
    'scenarios.c3_title': 'Unauthorized Personal Video',
    'scenarios.c3_desc': '"Private video recording taken in a private setting was uploaded without my knowledge or consent into an open public forum thread."',
    'scenarios.c3_res': '18 Hours (Emergency privacy notice)',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.desc': 'Clear answers before you submit your case.',
    'faq.q1': 'Will you ever ask for my social media password?',
    'faq.a1': 'Never. Under no circumstances will Full Remove ask for your password, 2FA codes, or account access credentials. All takedown actions are conducted through external platform reporting, DMCA statutory notices, and Terms of Service violation escalation.',
    'faq.q2': 'Do you guarantee 100% removal success?',
    'faq.a2': 'No honest service can guarantee 100% removal, as social media platforms (Meta, TikTok, X, Google) hold exclusive legal discretion over their servers. However, our specialized evidence formatting and TOS violation packaging yield high resolution rates by removing ambiguity for the platform\'s Trust & Safety review teams.',
    'faq.q3': 'Are you an official partner of Instagram or TikTok?',
    'faq.a3': 'No. Full Remove is an independent freelance cyber-rights and takedown assistance practice. We do not claim official partnership with or endorsement by any social media corporation.',
    'faq.q4': 'How do I track my request after submitting?',
    'faq.a4': 'You will be assigned a unique Case ID (e.g., FR-2026-XXXX). You can visit the "Track My Request" tab at any time with your Case ID and email to view stage updates, specialist notes, and platform reference numbers.',
    'faq.cta_ready': 'Ready to Take Action Against Harmful Content?',
    'faq.cta_sub': "Don't wait while harmful content spreads. Submit your URLs today and let us start preparing your takedown escalation packet.",
    'faq.cta_btn': 'Submit Your Case for Review',

    // Services Page
    'services.header_kicker': 'Full Remove Practice Areas',
    'services.header_title': 'Specialized Removal Services',
    'services.header_desc': 'We provide structured, evidence-based takedown assistance for individuals and businesses targeted by online abuse, impersonation, and unauthorized media.',
    'services.filter_all': 'All Services',
    'services.filter_impersonation': 'Impersonation & Fake Profiles',
    'services.filter_media': 'Unauthorized Media & Leaks',
    'services.filter_defamation': 'Defamation & Slander',
    'services.filter_doxxing': 'Doxxing & Data Leaks',
    'services.btn_request_this': 'Request Removal for This',
    'services.detailed_desc': 'Detailed Description',
    'services.legal_basis': 'Applicable Legal & Policy Grounds:',
    'services.supported_platforms': 'Supported Platforms',
    'services.expected_window': 'Expected Processing Window',
    'services.window_note': 'Actual turnaround depends on platform review team volume. We actively monitor and ping unaddressed filings.',
    'services.required_from_you': 'Required Information From You:',
    'services.reminder_no_pass': 'Reminder: We NEVER ask for passwords or account login credentials.',
    'services.boundaries_title': 'Clear Boundaries & Standards',
    'services.boundaries_desc': 'We operate with 100% legal compliance and ethical transparency. Here is what you can and cannot expect:',
    'services.what_we_do_title': 'What Full Remove Does',
    'services.what_we_do_1': 'Conduct thorough evidence collection, archiving timestamps, URLs, and screenshots before perpetrators can delete proof.',
    'services.what_we_do_2': 'Map specific infractions directly to platform Terms of Service, Community Standards, and DMCA provisions.',
    'services.what_we_do_3': 'Submit structured, lawyer-vetted violation notices through official platform dispute and Trust & Safety escalation channels.',
    'services.what_we_do_4': 'Provide you with ongoing transparent tracking and verified confirmation upon successful URL eradication.',
    'services.what_we_never_title': 'What Full Remove NEVER Does',
    'services.what_we_never_1': 'Never ask for your password: We will never ask for login credentials, two-factor authentication codes, or session tokens.',
    'services.what_we_never_2': 'No illegal hacking or DDoS: We do not engage in unauthorized access, server breaches, or cyberattacks. Everything is strictly legal.',
    'services.what_we_never_3': 'No false partner claims: We do not misrepresent ourselves as Meta employees, TikTok staff, or law enforcement officers.',
    'services.what_we_never_4': 'No guarantee scams: We do not guarantee 100% removal in cases where content is legally protected speech, public record, or deemed non-violating by platforms.',

    // Submit Request Page
    'submit.kicker': 'Intake & Evidence Submission',
    'submit.title': 'Submit a Removal Request',
    'submit.desc': 'Provide the details and links regarding the offending social media content. Our independent specialists will audit the violation and compile the takedown escalation packet.',
    'submit.sec1_title': '1. Contact & Identity Information',
    'submit.sec1_desc': 'Used strictly for case updates and platform identity verification affidavits.',
    'submit.name_label': 'Full Legal Name / Entity Name',
    'submit.email_label': 'Notification Email',
    'submit.phone_label': 'Phone Number (Optional, for urgent SMS)',
    'submit.messenger_label': 'Facebook Messenger / Handle (Optional)',
    'submit.sec2_title': '2. Platform & Incident Classification',
    'submit.platform_label': 'Target Social Media Platform',
    'submit.category_label': 'Reason for Removal / Category',
    'submit.urgency_label': 'Urgency / Timeline Priority',
    'submit.urgency_std': 'Standard (48–72h Audit)',
    'submit.urgency_high': 'High Priority (24–48h Escalation)',
    'submit.urgency_crit': 'Critical Incident (<24h Immediate)',
    'submit.sec3_title': '3. Offending Content URL(s) & Circumstances',
    'submit.urls_label': 'Direct Content URL(s) / Profile Link(s)',
    'submit.add_url': 'Add another URL (up to 5)',
    'submit.reason_label': 'Reason for Removal & Detailed Situation Description',
    'submit.reason_placeholder': 'Explain why this content violates your privacy, rights, or the platform rules (e.g. this profile stole my photos to scam followers; this video was recorded without consent in my private home)...',
    'submit.reason_hint': 'Provide as much context as possible to strengthen our formal report. Minimum 20 characters.',
    'submit.evidence_desc_label': 'Supporting Evidence & Verification Details',
    'submit.evidence_desc_placeholder': 'Describe any evidence you hold: original publication dates, original high-res media files, proof of official identity, trademark certificates, or screenshot archive...',
    'submit.files_label': 'Attach Supporting Evidence Files (Screenshots, masked ID, etc.)',
    'submit.files_browse': 'Click to browse files',
    'submit.files_types': 'PNG, JPG, PDF, or ZIP (Confidential evidence vault)',
    'submit.sec4_title': 'Mandatory Declarations & Acknowledgments',
    'submit.check_passwords': 'Zero Password Policy: I confirm that I have not included and will never share my personal social media passwords or 2FA codes with Full Remove.',
    'submit.check_no_guarantee': 'Independent Service & No Outcome Guarantee: I understand that Full Remove is an independent freelance takedown assistance service not officially affiliated with Meta, TikTok, X, or Google, and that final takedown decisions rest entirely with platform moderators.',
    'submit.check_terms': "Accuracy & Terms Agreement: I certify that all claims made herein are truthful and accurate, and I accept Full Remove's Service Policy and Privacy Policy.",
    'submit.submitting': 'Generating Case File...',
    'submit.submit_btn': 'Submit Takedown Request',
    'submit.success_title': 'Takedown Request Submitted',
    'submit.success_desc': 'Your case file has been assigned to our review triage desk. Please save your unique Case ID below to track resolution progress:',
    'submit.case_id_label': 'Your Tracking Case ID',
    'submit.copy_id': 'Copy Case ID',
    'submit.copied': 'Copied to Clipboard!',
    'submit.track_now_btn': 'Track Case Progress Now',
    'submit.submit_another': 'Submit Another Case',

    // Track Request Page
    'track.kicker': 'Secure Client Tracking',
    'track.title': 'Track My Removal Request',
    'track.desc': 'Enter your Case ID and the contact email provided during submission to check real-time progress and escalation notes.',
    'track.case_id_label': 'Case ID',
    'track.case_id_placeholder': 'e.g. FR-2026-8842',
    'track.email_label': 'Client Email (Optional verify)',
    'track.lookup_btn': 'Lookup',
    'track.demo_title': 'Quick Demo Samples:',
    'track.status_pending': 'Pending Audit',
    'track.status_review': 'Under Review',
    'track.status_submitted': 'Submitted to Platform',
    'track.status_resolved': 'Content Removed',
    'track.status_rejected': 'Platform Rejected',
    'track.step1': '1. Request Received',
    'track.step1_sub': 'Case audited and registered into triage queue',
    'track.step2': '2. Evidence Review',
    'track.step2_sub': 'Specialist formats statutory TOS violation brief',
    'track.step3': '3. Platform Escalation',
    'track.step3_sub': 'Notice filed with platform Trust & Safety desk',
    'track.step4': '4. Case Resolution',
    'track.step4_sub': 'Offending media removed or de-indexed',
    'track.specialist_update': 'Latest Takedown Specialist Update',
    'track.docket_ref': 'Platform Reference Docket:',
    'track.target_info': 'Target Information',
    'track.reported_circumstances': 'Reported Circumstances',
    'track.activity_log': 'Case Activity Log',
    'track.have_evidence': 'Have additional evidence or screenshots to append?',
    'track.contact_specialist': 'Contact Assigned Specialist',
    'track.all_user_cases': 'All Cases Registered for',

    // About Page
    'about.kicker': 'Independent Cyber-Rights & Takedown Assistance',
    'about.title': 'About FULL REMOVE',
    'about.desc': 'An independent freelance practice helping individuals, professionals, and creators scrub malicious content and reclaim their online privacy.',
    'about.story_title': 'Our Story & Independent Freelance Mission',
    'about.story_p1': 'When bad actors upload unauthorized private photos, clone someone\'s social media identity, or spread fabricated slander, victims are almost universally met with generic, automated "no violation found" emails from major tech platforms. Standard reporting mechanisms often fail ordinary people.',
    'about.story_p2': 'Traditional cyber-law firms charge thousands of dollars in non-refundable retainers just to open a file. Full Remove was founded as an independent freelance service to bridge that gap: providing knowledgeable, tenacious takedown assistance and terms of service escalation at accessible rates.',
    'about.story_p3': 'We treat every case with the urgency and empathy it deserves. From the moment you file a case with us, we organize the evidence, identify exact statutory violations, and demand accountability from platform safety desks.',
    'about.slogan_box_title': 'Why Our Slogan is "We Won\'t Leave Anything Behind."',
    'about.slogan_box_desc': 'When harmful content goes live, it rarely stays in one place. Clone accounts duplicate usernames; screenshots spread to mirror forums; defamatory clips get reshared. Our philosophy is thoroughness: we don\'t just report the primary post and walk away. We monitor secondary mirrors and related mentions until the trail is cleared.',
    'about.principles_title': 'Our Five Golden Principles',
    'about.p1_title': '1. Zero Password Access Policy',
    'about.p1_desc': 'We will never ask for your account password, two-factor authentication codes, or session tokens. Any agency asking for your login credentials is a security liability. All our takedown filings are conducted from external legal and reporting perimeters.',
    'about.p2_title': '2. Honesty Over False Guarantees',
    'about.p2_desc': 'We do not make fraudulent guarantees of 100% removal success. Social media platforms retain sole authority over their servers. What we promise is exhaustive preparation, professional escalation, and meticulous tracking.',
    'about.p3_title': '3. Strict Independent Status',
    'about.p3_desc': 'We are completely independent. We do not claim official partnerships, backchannel deals, or insider access with Meta, TikTok, Google, or X Corp. Our success is built on understanding their published rules better than the bad actors do.',
    'about.p4_title': '4. Confidentiality & Data Purging',
    'about.p4_desc': 'Your evidence, government ID copies, and case history are held in an encrypted silo. Once a case is formally resolved or closed, sensitive verification materials are securely purged.',
    'about.p5_title': '5. Strictly Lawful & Ethical Methods',
    'about.p5_desc': 'Full Remove uses only legal avenues: DMCA notices, Terms of Service violation reports, statutory privacy escalations, and official trust & safety channels. We do not hack, phish, or harass perpetrators.',
    'about.disclosure_title': 'Independent Freelance Disclosure & Legal Limits',
    'about.disclosure_desc': 'Full Remove provides non-attorney takedown consulting and administrative escalation assistance. We are not a law firm and do not provide legal representation in court. If your situation requires civil litigation, court-ordered subpoenas, or criminal charges, we will advise you to consult licensed legal counsel or local law enforcement.',

    // Legal Page
    'legal.kicker': 'Compliance & Transparency',
    'legal.title': 'Legal, Policies & Impressum',
    'legal.desc': 'Transparent disclosure of our operating policies, privacy safeguards, and mandatory legal disclaimers.',
    'legal.tab_privacy': 'Privacy Policy',
    'legal.tab_service': 'Service Policy & Terms',
    'legal.tab_impressum': 'Impressum & Legal Notice',

    // Contact Page
    'contact.kicker': 'Direct Assistance Desk',
    'contact.title': 'Contact Full Remove',
    'contact.desc': 'Have questions before filing or need rapid advice on an ongoing impersonation or leak? Reach out directly via our assistance form or Facebook Messenger.',
    'contact.messenger_title': 'Facebook Messenger',
    'contact.messenger_desc': 'Connect with our freelance takedown desk on Messenger for rapid initial triage and document sharing.',
    'contact.open_messenger': 'Open Facebook Messenger',
    'contact.sla_title': 'Response Expectations',
    'contact.sla_urgent': 'Critical Incidents & Doxxing: Under 12 hours response window',
    'contact.sla_std': 'Standard Inquiries: Under 24 hours Monday to Saturday',
    'contact.victim_tip_title': 'Emergency Tip for Victims',
    'contact.victim_tip_desc': 'Before alerting perpetrators or commenting on offending posts, capture clear full-screen screenshots including the URL bar, timestamps, and account handle. Once bad actors suspect escalation, they often rename handles or hide evidence.',
    'contact.form_title': 'Send an Inquiry to Full Remove',
    'contact.form_name': 'Your Name',
    'contact.form_email': 'Your Email',
    'contact.form_subject': 'Subject / Concern',
    'contact.form_msg': 'Message Details',
    'contact.form_send': 'Send Message',
    'contact.msg_sent_title': 'Message Dispatched!',
    'contact.msg_sent_desc': 'Thank you. Your inquiry reference is',

    // Admin Console
    'admin.title': 'Full Remove Admin Console',
    'admin.operator': 'Operator:',
    'admin.tab_requests': 'Takedown Requests',
    'admin.tab_messages': 'Contact Inquiries',
    'admin.tab_hosting': 'Free-Tier Hosting & Cost Warning',
    'admin.total_cases': 'Total Cases',
    'admin.status_update_title': 'Update Case Status',
    'admin.public_note_label': 'Public Status Note (Customer Facing)',
    'admin.private_note_label': 'Private Internal Admin Notes (Staff Only)',
    'admin.ticket_ref_label': 'Platform Reference Docket / Ticket # (Optional)',
    'admin.save_btn': 'Save & Update Case',
    'admin.case_inspector_title': 'Case Audit File',
    'admin.cost_warning_title': 'Important Paid Service Warning',
    'admin.cost_warning_desc': 'Full Remove is designed to run 100% on free-tier services. Never activate paid services or enter billing credit cards on Firebase Blaze plans unless case volume exceeds 50,000 queries/day.',

    // Footer
    'footer.disclaimer_title': 'Important Legal Limitations & Independence Notice',
    'footer.disclaimer_text': 'Full Remove operates strictly as an independent freelance takedown assistance service. We are not a law firm, attorneys-at-law, or official process servers, and we do not provide legal representation in court. We do not claim official affiliation, sponsorship, or partnership with Meta Platforms (Facebook, Instagram, WhatsApp), TikTok (ByteDance), X Corp, Google LLC (YouTube), Reddit Inc., or any other third-party platform. All content removal and moderation outcomes depend solely on the policies, discretion, and actions of the respective host platforms. Full Remove does not guarantee 100% removal in every circumstance.',
    'footer.rights': 'All rights reserved. "We Won\'t Leave Anything Behind."',
    'footer.privacy_link': 'Privacy Policy',
    'footer.terms_link': 'Terms of Service',
    'footer.impressum_link': 'Impressum'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (stored === 'ar' || stored === 'en') return stored;
    }
    // Default to Arabic as requested by user
    return 'ar';
  });

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';
  const isArabic = language === 'ar';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', language);
    }
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, isArabic, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
