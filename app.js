
const { createApp } = Vue;

createApp({
  data() {
    return {
      searchQuery: '',
      activeTab: 'directors',
      copied: false,
      selectedTarget: 'runway',
      customSubject: 'A cybernetic wanderer standing on a rain-drenched rooftop in Neo-Tokyo, reflective puddles, distant skyscrapers enveloped in fog',
      
      aiTargets: [
        { id: 'runway', name: 'Runway Gen-3 / Gen-2', suffix: '--mode cinematic' },
        { id: 'kling', name: 'Kling AI 1.5 HD', suffix: 'ultra-detailed, 4k' },
        { id: 'midjourney', name: 'Midjourney v6.1', suffix: '--v 6.1 --style raw' },
        { id: 'luma', name: 'Luma Dream Machine', suffix: 'photorealistic motion' }
      ],

      subjectPresets: [
        { id: 1, titleFa: 'سامورایی در کولاک', prompt: 'A lone ronin warrior meditating in a violent snow blizzard, bamboo forest background, snow crystals clinging to dark wool kimono' },
        { id: 2, titleFa: 'سفینه در مدار زحل', prompt: 'An exploration spacecraft slowly drifting near the rings of Saturn, deep cosmic void, ice reflections on titanium hull' },
        { id: 3, titleFa: 'کارآگاه در کافه بارانی', prompt: 'A weary noir detective smoking by a Venetian-blind window inside a dimly lit diner, rain droplets sliding down the glass' },
        { id: 4, titleFa: 'مسابقه رالی صحرا', prompt: 'Heavy armored dune buggies racing at breakneck speed across sand dunes, dust plumes billowing behind, sunset horizon' }
      ],

      categories: [
        { id: 'directors', nameFa: 'کارگردانان و مؤلفان', icon: '🎬' },
        { id: 'cameras', nameFa: 'دوربین و فیلم خام', icon: '📹' },
        { id: 'lenses', nameFa: 'لنز و اپتیک', icon: '🔍' },
        { id: 'lighting', nameFa: 'نورپردازی و اتمسفر', icon: '💡' },
        { id: 'shots', nameFa: 'نما و حرکت دوربین', icon: '🎥' },
        { id: 'mediums', nameFa: 'موتور گیم و انیمیشن', icon: '🕹️' },
        { id: 'color', nameFa: 'رنگ و پالت تصویری', icon: '🎨' },
        { id: 'ratio', nameFa: 'نسبت تصویر (AR)', icon: '📐' }
      ],

      selected: {
        directors: [],
        cameras: [],
        lenses: [],
        lighting: [],
        shots: [],
        mediums: [],
        colors: []
      },
      selectedRatio: null,

      directors: [
        { id: 'stanley_kubrick', nameFa: 'استنلی کوبریک', nameEn: 'Stanley Kubrick', eraFa: 'مدرن کلاسیک', styleFa: 'پرسپکتیو یک نقطه‌ای متقارن، حرکات دوربین تراکینگ شات کشیده، ترکیب‌بندی هندسی منظم و لنزهای واید.', promptTag: 'in the distinct visual style of Stanley Kubrick, one-point perspective, meticulous symmetrical framing' },
        { id: 'denis_villeneuve', nameFa: 'دنی ویلنوو', nameEn: 'Denis Villeneuve', eraFa: 'سینمای معاصر', styleFa: 'معماری بروتالیست با مقیاس غول‌آسا، اتمسفر مه‌آلود سنگین، پالت رنگی خردلی و خاکستری خفه.', promptTag: 'directed by Denis Villeneuve, brutalist monolithic scale, atmospheric volumetric haze, minimalist composition' },
        { id: 'christopher_nolan', nameFa: 'کریستوفر نولان', nameEn: 'Christopher Nolan', eraFa: 'سینمای معاصر', styleFa: 'فیلمبرداری آنالوگ IMAX 70mm، اکشن مکانیکی و پرهیز از تاری حرکتی، کنتراست عمیق طبیعی.', promptTag: 'in the cinematic style of Christopher Nolan, IMAX 70mm cinematography, grand scale practical realism' },
        { id: 'ridley_scott', nameFa: 'ریدلی اسکات', nameEn: 'Ridley Scott', eraFa: 'مدرن کلاسیک', styleFa: 'نورپردازی ضد نور سیلوئت، دود و غبار اتمسفریک، باران و جزییات صنعتی سایبرپانک.', promptTag: 'in the visual style of Ridley Scott, industrial atmospheric smoke and rain, backlit silhouette, dense textures' },
        { id: 'david_fincher', nameFa: 'دیوید فینچر', nameEn: 'David Fincher', eraFa: 'سینمای معاصر', styleFa: 'رنگ‌های زرد و سبز لجنی کدر، حرکات مکانیکی دوربین روی ریل بدون لرزش، کنتراست تاریک تمیز.', promptTag: 'directed by David Fincher, precise robotic camera pan, dark moody green and amber color grading, shadow detail' },
        { id: 'wes_anderson', nameFa: 'وس اندرسون', nameEn: 'Wes Anderson', eraFa: 'سینمای معاصر', styleFa: 'تقارن کامل مرکزی، پالت رنگی پاستلی زنده، حرکات سریع ۹۰ درجه دوربین (Whip pan).', promptTag: 'Wes Anderson visual style, perfect centered symmetry, pastel color palette, storybook diorama aesthetic' },
        { id: 'akira_kurosawa', nameFa: 'آکیرا کوروساوا', nameEn: 'Akira Kurosawa', eraFa: 'کلاسیک ژاپن', styleFa: 'حرکت همزمان المان‌های آب‌وهوا (باران، باد)، فشرده‌سازی پرسپکتیو با لنز تله، کمپوزیسیون محوری.', promptTag: 'Akira Kurosawa cinematic style, dynamic weather elements, telephoto depth compression, axial cut framing' },
        { id: 'andrei_tarkovsky', nameFa: 'آندری تارکوفسکی', nameEn: 'Andrei Tarkovsky', eraFa: 'سینمای شاعرانه', styleFa: 'پلان سکانس‌های بسیار کشیده و آهسته، بافت نم‌کشیده و خاکستری، انعکاس آب و رازآلودگی زمین.', promptTag: 'in the poetic style of Andrei Tarkovsky, meditative slow tracking shot, weathered earthy textures, damp atmosphere' },
        { id: 'alfred_hitchcock', nameFa: 'آلفرد هیچکاک', nameEn: 'Alfred Hitchcock', eraFa: 'کلاسیک هالیوود', styleFa: 'زاویه دید سوبژکتیو معلق، تکنیک دالی زوم، تعلیق بصری از طریق سایه‌های پرکنتراست.', promptTag: 'in the style of Alfred Hitchcock, intense visual suspense, subjective camera angle, high-contrast tension' },
        { id: 'quentin_tarantino', nameFa: 'کوئنتین تارانتینو', nameEn: 'Quentin Tarantino', eraFa: 'سینمای معاصر', styleFa: 'نمای از داخل صندوق عقب، پالت رنگی زرد و قرمز اشباع، زوم‌های ناگهانی شلاقی.', promptTag: 'in the style of Quentin Tarantino, vintage 1970s saturated color palette, dynamic trunk shot perspective' },
        { id: 'wong_kar_wai', nameFa: 'وونگ کار وای', nameEn: 'Wong Kar-wai', eraFa: 'سینمای معاصر', styleFa: 'تکنیک Step-printing، چراغ‌های نئونی شبانه و بارانی، کادربندی ووایوریستی از لای اشیا.', promptTag: 'in the visual style of Wong Kar-wai, step-printing motion blur, moody rainy neon cityscapes, nostalgic longing' },
        { id: 'david_lynch', nameFa: 'دیوید لینچ', nameEn: 'David Lynch', eraFa: 'سینمای سوررئال', styleFa: 'فضاهای کابوس‌گونه، نورهای سوسوزن صنعتی، ناهنجاری در اعماق سایه‌ها.', promptTag: 'David Lynch surrealist style, uncanny dreamlike atmosphere, flickering industrial lighting, eerie shadows' },
        { id: 'george_miller', nameFa: 'جورج میلر', nameEn: 'George Miller', eraFa: 'سینمای معاصر', styleFa: 'اکشن پرسرعت، تمرکز سوژه در مرکز تقاطع فریم، رنگ‌های گرم بیابانی تند.', promptTag: 'George Miller kinetic action style, centered cross-hair framing, frenetic pace, vibrant wasteland palette' },
        { id: 'robert_eggers', nameFa: 'رابرت اگرز', nameEn: 'Robert Eggers', eraFa: 'سینمای معاصر', styleFa: 'نورپردازی طبیعی فقط با شمع و فانوس، نسبت تصویر کلاسیک، بافت زبر کهنه تاریخی.', promptTag: 'Robert Eggers period aesthetic, natural candlelit darkness, authentic historical gritty texture, 1.33:1 ratio' }
      ],

      cameras: [
        { id: 'imax_65mm', nameFa: 'دوربین آی‌مکس ۶۵ میلی‌متری (IMAX MSM 9802)', typeFa: 'فیلم نگاتیو', descFa: 'بالاترین رزولوشن نوری مکانیکی، وضوح خارق‌العاده لبه‌ها، گرین بسیار متراکم و عمق واقعی.', promptTag: 'shot on 65mm IMAX MSM 9802, ultra-fine silver halide grain, breathtaking medium-format clarity' },
        { id: 'arri_alexa_65', nameFa: 'آری الکسا ۶۵ (ARRI ALEXA 65)', typeFa: 'دیجیتال لارج‌فرمت', descFa: 'سنسور غول‌پیکر با داینامیک رنج بی‌نظیر، های‌لایت‌های مخملی و پوست کاملا طبیعی.', promptTag: 'shot on ARRI ALEXA 65, large format cinematic look, organic highlight rolloff, smooth micro-contrast' },
        { id: 'red_v_raptor', nameFa: 'رد وی-رپتور ۸کی (RED V-Raptor XL 8K)', typeFa: 'دیجیتال پرسرعت', descFa: 'تصویر سوپر شارپ با خطوط هندسی دقیق، مناسب جلوه‌های ویژه سنگین، علمی-تخیلی و اکشن.', promptTag: 'shot on RED V-Raptor XL 8K VV, razor-sharp edge definition, hyper-detailed futuristic texture' },
        { id: 'sony_venice_2', nameFa: 'سونی ونیس ۲ (Sony VENICE 2)', typeFa: 'دیجیتال فول‌فریم', descFa: 'عمق رنگ بالا در تاریکی، ثبت جزئیات بدون گرین مصنوعی در شب‌های کم‌نور شهری.', promptTag: 'shot on Sony VENICE 2, dual-native ISO low-light purity, cinematic color depth' },
        { id: 'super_16mm', nameFa: 'سوپر ۱۶ میلی‌متری (ARRI 416 Super 16)', typeFa: 'فیلم نگاتیو زبر', descFa: 'بافت گرین ارگانیک درشت، مناسب فضاهای گرانج، مستندهای مستقل و ویدیو موزیک‌های آلترناتیو.', promptTag: 'shot on Super 16mm film, ARRI 416, tactile heavy film grain, nostalgic indie grit' },
        { id: 'kodak_vision3_500t', nameFa: 'نگاتیو کداک ویژن ۳ ۵۰۰تی (Kodak 5219)', typeFa: 'نگاتیو تنگستن', descFa: 'استاندارد سینمای شب، هالیشن قرمز دور چراغ‌ها، رنگ‌های گرم و عمق دراماتیک سایه‌ها.', promptTag: 'Kodak Vision3 500T 5219 film stock, subtle red halation, rich shadow latitude, tungsten balance' },
        { id: 'technicolor_3strip', nameFa: 'تکنیکالر ۳ نواری (Technicolor Process 4)', typeFa: 'نگاتیو کلاسیک', descFa: 'سه نوار تفکیک شده رنگی، قرمزی‌های مخملی، آبی‌های عمیق و اشباع رویایی هالیوود کلاسیک.', promptTag: '1940s Technicolor three-strip process, deeply saturated primary colors, glorious golden-age glow' },
        { id: 'vx1000_minidv', nameFa: 'سونی وی‌ایکس ۱۰۰۰ (Sony DCR-VX1000)', typeFa: 'دیجیتال وینتیج MiniDV', descFa: 'تصویر دیجیتال دهه ۹۰، خطوط اینترلیس، استاتیک اسکیت‌بردی و رنگ‌های سرد و خام.', promptTag: 'shot on vintage 1995 Sony DCR-VX1000 MiniDV camcorder, 3CCD sensor, tape static, interlaced lines' },
        { id: 'bodycam_cctv', nameFa: 'بادی‌کم پلیس و دوربین مداربسته (CCTV)', typeFa: 'مستند و نظارتی', descFa: 'زاویه واید با دیستورشن بشکه‌ای، لرزش شلاقی سینه، نور مادون قرمز شبانه و تایم‌استمپ.', promptTag: 'raw police bodycam footage, wide angle barrel distortion, chest-mount motion shake, high exposure clipping' }
      ],

      lenses: [
        { id: 'panavision_c_anamorphic', nameFa: 'پانویژن سری سی آنامورفیک (Panavision C-Series)', typeFa: 'آنامورفیک هالیوودی', descFa: 'بوکه‌های بیضی‌شکل عمودی، فلیرهای خطی آبی ملایم، افت فوکوس مخملی در اطراف کادر.', promptTag: 'Panavision C-Series anamorphic lens, oval bokeh, subtle horizontal blue lens flares, edge falloff' },
        { id: 'cooke_s4i', nameFa: 'کوک اس۴/آی (Cooke S4/i Prime)', typeFa: 'اسفریکال سینمایی', descFa: 'لوک معروف کوک (Cooke Look)، گرمی و نرمی فوق‌العاده در بافت چهره انسان، انتقال لطیف فوکوس.', promptTag: 'Cooke S4/i prime lens, signature warm Cooke look, organic skin texture, creamy focus transition' },
        { id: 'zeiss_master_prime', nameFa: 'زایس مستر پرایم (Zeiss Master Prime)', typeFa: 'اسفریکال مدرن', descFa: 'وضوح خیره‌کننده لبه به لبه، اعوجاج نوری صفر، شارپنس بدون افت کیفیت در بازترین دیافراگم.', promptTag: 'Zeiss Master Prime lens, optical perfection, edge-to-edge sharpness, zero chromatic aberration' },
        { id: 'helios_44_2', nameFa: 'هلیوس ۴۴-۲ (Helios 44-2 58mm)', typeFa: 'وینتیج بوکه دوار', descFa: 'بوکه‌های چرخشی و گردابی دور کادر، پس‌زمینه خواب‌گونه و رویایی در مرکز متمرکز.', promptTag: 'Helios 44-2 58mm lens, distinctive swirly circular bokeh, dreamy vintage optical character' },
        { id: 'laowa_probe_24mm', nameFa: 'لنز لوله‌ای ماکرو لئووا (Laowa 24mm Probe)', typeFa: 'ماکرو سوزنی', descFa: 'نفوذ به درون اشیا، زاویه باز در فاصله چند میلی‌متری، عمق میدان ناممکن و نمای حشره‌ای.', promptTag: 'Laowa 24mm f/14 probe lens, bug-eye macro perspective, extreme deep close-up pass-through' },
        { id: 'fisheye_8mm', nameFa: 'لنز فیش‌آی ۸ میلی‌متری (Extreme Fisheye)', typeFa: 'سوپر واید ۱۸۰ درجه', descFa: 'اعوجاج شدید کروی لبه‌ها، حس جنون و دگرگونی پرسپکتیو، متداول در آثار یورگوس لانتیموس.', promptTag: '8mm extreme fisheye lens, 180-degree spherical distortion, curved dramatic horizons' }
      ],

      lighting: [
        { id: 'chiaroscuro', nameFa: 'کیاروسکورو (Chiaroscuro)', nameEn: 'High Contrast Shadow', descFa: 'کنتراست شدید نور و تاریکی مطلق الهام‌گرفته از نقاشی‌های کاراواجو.', promptTag: 'dramatic chiaroscuro lighting, deep black shadows, stark single directional key light' },
        { id: 'volumetric_godrays', nameFa: 'نورهای حجمی خورشیدی (God Rays)', nameEn: 'Volumetric Shafts', descFa: 'پرتوهای موازی نور نفوذی از میان غبار، پنجره‌های صنعتی یا مه جنگل.', promptTag: 'dense volumetric lighting, atmospheric dusty god rays piercing through shadows' },
        { id: 'neon_noir', nameFa: 'نئون نوآر (Neon Noir)', nameEn: 'Reflective Night Neon', descFa: 'بازتاب لامپ‌های نئونی ارغوانی و فیروزه‌ای بر سطح خیابان‌های خیس از باران.', promptTag: 'neon noir lighting, vibrant cyan and magenta practical lights reflecting on wet asphalt' },
        { id: 'rembrandt', nameFa: 'نورپردازی رامبراند (Rembrandt Lighting)', nameEn: 'Triangle Cheek Key', descFa: 'ایجاد مثلث نوری زیر چشم در سمت سایه چهره، عمق‌بخشی به کاراکتر.', promptTag: 'Rembrandt portrait lighting, classic triangular light on shadowed cheek, dramatic mood' },
        { id: 'practical_candle', nameFa: 'نور طبیعی شمع و آتش (Candlelight & Fire)', nameEn: 'Practical Firelight', descFa: 'روشنایی انحصاری با منابع زنده گرم صحنه، سوسوی شعله با افت نور سریع.', promptTag: 'illuminated solely by practical candlelight, flickering warm amber illumination, deep natural blacks' },
        { id: 'golden_hour', nameFa: 'ساعت طلایی (Golden Hour)', nameEn: 'Low Sun Warmth', descFa: 'آفتاب زاویه‌دار قبل از غروب با سایه‌های کشیده و درخشش مخملی کهربایی.', promptTag: 'golden hour natural sunlight, warm rim light, elongated evening shadows' },
        { id: 'bioluminescent', nameFa: 'درخشش بیولومینسنت (Bioluminescence)', nameEn: 'Organic Glow', descFa: 'روشنایی جلبک‌ها و موجودات ارگانیک در اعماق تاریک با طیف آبی و فیروزه‌ای فسفری.', promptTag: 'ethereal bioluminescent lighting, glowing cyan and emerald spores in deep pitch-black environment' }
      ],

      shots: [
        { id: 'extreme_wide_els', nameFa: 'اکستریم لانگ‌شات (Extreme Wide Shot)', typeFa: 'اندازه‌نما', descFa: 'سوژه بسیار کوچک در برابر منظره غول‌پیکر طبیعی یا سیاره‌ای.', promptTag: 'extreme wide shot, vast expansive scale, lone tiny figure against colossal environment' },
        { id: 'close_up_cu', nameFa: 'کلوزآپ چهره (Intense Close-Up)', typeFa: 'اندازه‌نما', descFa: 'پوشش کامل سر تا گردن با فوکوس روی احساسات و مردمک چشم.', promptTag: 'cinematic close-up shot, intense emotional focus, detailed facial expressions' },
        { id: 'dolly_zoom', nameFa: 'دالی زوم سرگیجه (Vertigo Effect / Zolly)', typeFa: 'حرکت دوربین', descFa: 'ثابت ماندن سوژه در حالی که پس‌زمینه با شوک بصری منبسط یا فشرده می‌شود.', promptTag: 'dolly zoom vertigo effect, background stretching dynamically while subject stays static' },
        { id: 'low_angle_hero', nameFa: 'لو انگل قدرتمند (Heroic Low-Angle)', typeFa: 'زاویه دوربین', descFa: 'دوربین پایین‌تر از سوژه و نگاه رو به بالا، القای حس هیبت و اقتدار.', promptTag: 'powerful low-angle perspective, heroic upward framing, commanding presence' },
        { id: 'birds_eye_topdown', nameFa: 'دید پرنده از بالا (Bird’s-Eye View 90°)', typeFa: 'زاویه دوربین', descFa: 'عمود کامل ۹۰ درجه از آسمان به زمین، نگاه هندسی نقشه‌وار به رخدادها.', promptTag: 'top-down bird's-eye view, 90-degree zenith camera angle, geometric overhead framing' },
        { id: 'tracking_dolly', nameFa: 'تراکینگ شات روان (Smooth Tracking Dolly)', typeFa: 'حرکت دوربین', descFa: 'حرکت موازی یا دنبال‌کننده روان دوربین هم‌گام با سوژه در راهرو یا خیابان.', promptTag: 'smooth tracking dolly shot, dynamic steady forward camera motion' },
        { id: 'handheld_shaky', nameFa: 'دوربین روی دست مستند (Handheld Shaky-Cam)', typeFa: 'حرکت دوربین', descFa: 'لرزش‌های واقع‌گرایانه دست فیلمبردار، ایجاد استرس، خطر و میدان نبرد.', promptTag: 'visceral handheld shaky-cam, documentary kinetic camera movement' }
      ],

      mediums: [
        { id: 'unreal_engine_5', nameFa: 'آنریل انجین ۵.۴ (Unreal Engine 5.4 Lumen)', categoryFa: 'موتور گیم نکس‌جن', descFa: 'نورپردازی ریل‌تایم لومن، جزئیات میکروسکوپی نانایت و متریال‌های فیزیکی بی‌نقص.', promptTag: 'Unreal Engine 5.4 render, Lumen global illumination, Nanite micro-poly geometry, 8k PBR textures' },
        { id: 'path_traced_cinematic', nameFa: 'پث تریسینگ سینمایی (Photorealistic Path-Tracing)', categoryFa: 'رندرینگ ۳بعدی', descFa: 'ردگیری فوتون‌های واقعی نور، بازتاب‌های آینه‌ای دقیق و انسداد سایه‌های عمیق.', promptTag: 'photorealistic path-traced rendering, Octane Render, physical camera simulation, ray-traced shadows' },
        { id: 'ps1_retro_game', nameFa: 'استایل بازی رترو پی‌اس۱ (Retro PSX / PS1)', categoryFa: 'گیم کلاسیک', descFa: 'پلی‌گان‌های لرزان، تکسچرهای شطرنجی پیکسلی و افکت نوستالژیک دهه ۹۰.', promptTag: 'retro PS1 low-poly game aesthetic, pixelated textures, vertex jitter, CRT scanlines, 1998 polygon graphics' },
        { id: 'anime_sakuga', nameFa: 'انیمه ساکوگا دستی (Hand-Drawn Anime Sakuga)', categoryFa: 'انیمیشن کلاسیک ژاپن', descFa: 'فریم‌های کلیدی متراکم، افکت‌های دستی آب و باد در استایل استودیو جیبلی و آکیرا.', promptTag: 'hand-drawn anime sakuga animation style, fluid keyframes, painted watercolor backdrops, Studio Ghibli cel-shaded' },
        { id: 'stop_motion_clay', nameFa: 'استاپ موشن خمیری (Stop-Motion Claymation)', categoryFa: 'انیمیشن فیزیکی', descFa: 'بافت واقعی اثر انگشت، لرزش ۱۲ فریم در ثانیه و متریال‌های واقعی استودیویی.', promptTag: 'tactile stop-motion claymation, 12fps tactile movement, visible clay fingerprints, miniature studio lighting' },
        { id: 'analog_found_footage', nameFa: 'ویدیو فاند فوتیج و آنالوگ هارور (Analog Horror)', categoryFa: 'ژانر ویدیویی', descFa: 'تصویر نوارهای VHS آسیب‌دیده، رنگ‌رفتگی مغناطیسی، خطوط نویز و حس وحشت مستند.', promptTag: 'analog horror found footage, degraded magnetic VHS tape, tracking glitch artifacts, eerie authenticity' }
      ],

      colors: [
        { id: 'teal_orange', nameFa: 'تیل و نارنجی بلاک‌باستری (Teal and Orange)', nameEn: 'Hollywood Blockbuster', descFa: 'رنگ پوست گرم کهربایی در تقابل با سایه‌ها و آسمان فیروزه‌ای خنک.', promptTag: 'cinematic teal and orange color grading, complementary color contrast, rich skin warmth' },
        { id: 'bleach_bypass', nameFa: 'بلیچ بای‌پاس نقره‌ای (Bleach Bypass)', nameEn: 'Silver Retention', descFa: 'کاهش شدید اشباع رنگ‌ها همراه با کنتراست خشن و سایه‌های قیرمانند فلزی.', promptTag: 'bleach bypass silver retention process, desaturated gritty look, harsh contrast, metallic shadows' },
        { id: 'monochrome_bw', nameFa: 'سیاه و سفید پرکنتراست (Monochrome Noir B&W)', nameEn: 'Black and White', descFa: 'تمرکز روی بافت و نور به جای رنگ، سایه‌های مرکبی عمیق با سفیدی شفاف.', promptTag: 'striking high-contrast black and white, deep inky blacks, silvery luminous highlights' },
        { id: 'cross_process', nameFa: 'کراس پروسسینگ (Cross-Processing)', nameEn: 'Chemical Shift', descFa: 'جابجایی شیمیایی رنگ‌ها، آسمان‌های سبز لجنی و سایه‌های ارغوانی وینتیج.', promptTag: 'vintage cross-processed film look, shifted cyan greens and magenta shadow tones' },
        { id: 'pastel_muted', nameFa: 'پالت پاستلی ملایم (Soft Pastel Tones)', nameEn: 'Pastel Palette', descFa: 'رنگ‌های لطیف و یکدست با کنتراست ملایم، روشنایی کنترل‌شده بدون تاریکی مطلق.', promptTag: 'soft muted pastel color palette, low-contrast gentle illumination, elegant harmonious tones' }
      ],

      aspectRatios: [
        { id: 'ar_239', ratio: '2.39:1', nameFa: 'اسکوپ آنامورفیک عریض', descFa: 'استاندارد حماسی هالیوود و فیلم‌های بلاک‌باستر', mjFlag: '--ar 21:9' },
        { id: 'ar_185', ratio: '1.85:1', nameFa: 'استاندارد سینمایی فلت', descFa: 'استاندارد فیلم‌های درام، کمدی و سریال‌ها', mjFlag: '--ar 16:9' },
        { id: 'ar_143', ratio: '1.43:1', nameFa: 'آی‌مکس نیتیو (IMAX 70mm)', descFa: 'عظیم‌ترین ابعاد پرده‌های غول‌آسا', mjFlag: '--ar 1.43:1' },
        { id: 'ar_133', ratio: '1.33:1 (4:3)', nameFa: 'کادر آکادمی کلاسیک', descFa: 'حس نوستالژی، تلویزیون‌های CRT و فیلم‌های کلاسیک', mjFlag: '--ar 4:3' },
        { id: 'ar_916', ratio: '9:16', nameFa: 'عمودی شبکه‌های اجتماعی', descFa: 'مناسب ریلز اینستاگرام، تیک‌تاک و یوتیوب شورتس', mjFlag: '--ar 9:16' },
        { id: 'ar_11', ratio: '1:1', nameFa: 'مربع کامل', descFa: 'قاب‌بندی متقارن و پرتره‌های ایزوله', mjFlag: '--ar 1:1' }
      ]
    };
  },

  computed: {
    filteredDirectors() {
      if (!this.searchQuery) return this.directors;
      const q = this.searchQuery.toLowerCase();
      return this.directors.filter(d => 
        d.nameFa.toLowerCase().includes(q) || 
        d.nameEn.toLowerCase().includes(q) || 
        d.styleFa.toLowerCase().includes(q)
      );
    },
    filteredCameras() {
      if (!this.searchQuery) return this.cameras;
      const q = this.searchQuery.toLowerCase();
      return this.cameras.filter(c => 
        c.nameFa.toLowerCase().includes(q) || 
        c.descFa.toLowerCase().includes(q)
      );
    },
    filteredLenses() {
      if (!this.searchQuery) return this.lenses;
      const q = this.searchQuery.toLowerCase();
      return this.lenses.filter(l => 
        l.nameFa.toLowerCase().includes(q) || 
        l.descFa.toLowerCase().includes(q)
      );
    },
    filteredLighting() {
      if (!this.searchQuery) return this.lighting;
      const q = this.searchQuery.toLowerCase();
      return this.lighting.filter(lt => 
        lt.nameFa.toLowerCase().includes(q) || 
        lt.nameEn.toLowerCase().includes(q) || 
        lt.descFa.toLowerCase().includes(q)
      );
    },
    filteredShots() {
      if (!this.searchQuery) return this.shots;
      const q = this.searchQuery.toLowerCase();
      return this.shots.filter(s => 
        s.nameFa.toLowerCase().includes(q) || 
        s.descFa.toLowerCase().includes(q)
      );
    },
    filteredMediums() {
      if (!this.searchQuery) return this.mediums;
      const q = this.searchQuery.toLowerCase();
      return this.mediums.filter(m => 
        m.nameFa.toLowerCase().includes(q) || 
        m.descFa.toLowerCase().includes(q)
      );
    },
    filteredColors() {
      if (!this.searchQuery) return this.colors;
      const q = this.searchQuery.toLowerCase();
      return this.colors.filter(col => 
        col.nameFa.toLowerCase().includes(q) || 
        col.nameEn.toLowerCase().includes(q) || 
        col.descFa.toLowerCase().includes(q)
      );
    },
    totalSelectedCount() {
      return Object.values(this.selected).reduce((sum, arr) => sum + arr.length, 0) + (this.selectedRatio ? 1 : 0);
    },
    generatedPrompt() {
      const parts = [];

      // 1. Subject & Narrative
      if (this.customSubject.trim()) {
        parts.push(this.customSubject.trim());
      }

      // 2. Shot & Camera Movement
      if (this.selected.shots.length) {
        parts.push(this.selected.shots.map(s => s.promptTag).join(', '));
      }

      // 3. Director Visual Style
      if (this.selected.directors.length) {
        parts.push(this.selected.directors.map(d => d.promptTag).join(', '));
      }

      // 4. Camera Hardware & Film Stock
      if (this.selected.cameras.length) {
        parts.push(this.selected.cameras.map(c => c.promptTag).join(', '));
      }

      // 5. Lenses & Optics
      if (this.selected.lenses.length) {
        parts.push(this.selected.lenses.map(l => l.promptTag).join(', '));
      }

      // 6. Lighting Atmosphere
      if (this.selected.lighting.length) {
        parts.push(this.selected.lighting.map(lt => lt.promptTag).join(', '));
      }

      // 7. Medium, Render Engine, or Art Style
      if (this.selected.mediums.length) {
        parts.push(this.selected.mediums.map(m => m.promptTag).join(', '));
      }

      // 8. Color Palette & Grading
      if (this.selected.colors.length) {
        parts.push(this.selected.colors.map(col => col.promptTag).join(', '));
      }

      let mainPrompt = parts.join(', ');

      // Target AI parameters & Aspect Ratio
      if (this.selectedTarget === 'midjourney') {
        if (this.selectedRatio) {
          mainPrompt += ` ${this.selectedRatio.mjFlag}`;
        }
        mainPrompt += ' --v 6.1 --style raw';
      } else {
        if (this.selectedRatio) {
          mainPrompt += `, ${this.selectedRatio.ratio} aspect ratio`;
        }
        const targetObj = this.aiTargets.find(t => t.id === this.selectedTarget);
        if (targetObj && targetObj.suffix) {
          mainPrompt += `, ${targetObj.suffix}`;
        }
      }

      return mainPrompt || 'لطفاً سوژه یا گزینه‌های مورد نظر خود را از لیست انتخاب کنید تا پرامپت تولید شود...';
    },
    wordCount() {
      if (!this.generatedPrompt) return 0;
      return this.generatedPrompt.trim().split(/\s+/).length;
    }
  },

  methods: {
    toggleSelection(category, item) {
      const idx = this.selected[category].findIndex(i => i.id === item.id);
      if (idx > -1) {
        this.selected[category].splice(idx, 1);
      } else {
        this.selected[category].push(item);
      }
    },
    isSelected(category, item) {
      return this.selected[category].some(i => i.id === item.id);
    },
    getSelectedCount(catId) {
      if (catId === 'ratio') return this.selectedRatio ? 1 : 0;
      return this.selected[catId] ? this.selected[catId].length : 0;
    },
    resetSelections() {
      Object.keys(this.selected).forEach(key => {
        this.selected[key] = [];
      });
      this.selectedRatio = null;
    },
    resetAll() {
      this.resetSelections();
      this.customSubject = '';
    },
    randomizeAll() {
      this.resetSelections();
      
      // Random subject
      const randSub = this.subjectPresets[Math.floor(Math.random() * this.subjectPresets.length)];
      this.customSubject = randSub.prompt;

      // Random picks
      const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
      
      this.selected.directors.push(getRandomItem(this.directors));
      this.selected.cameras.push(getRandomItem(this.cameras));
      this.selected.lenses.push(getRandomItem(this.lenses));
      this.selected.lighting.push(getRandomItem(this.lighting));
      this.selected.shots.push(getRandomItem(this.shots));
      this.selected.colors.push(getRandomItem(this.colors));
      this.selectedRatio = getRandomItem(this.aspectRatios);
    },
    async copyPrompt() {
      if (!this.generatedPrompt) return;
      try {
        await navigator.clipboard.writeText(this.generatedPrompt);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = this.generatedPrompt;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      }
    }
  },

  mounted() {
    // Default cinematic setup on initial load
    this.selected.directors.push(this.directors.find(d => d.id === 'ridley_scott'));
    this.selected.cameras.push(this.cameras.find(c => c.id === 'imax_65mm'));
    this.selected.lenses.push(this.lenses.find(l => l.id === 'panavision_c_anamorphic'));
    this.selected.lighting.push(this.lighting.find(lt => lt.id === 'neon_noir'));
    this.selected.shots.push(this.shots.find(s => s.id === 'tracking_dolly'));
    this.selected.colors.push(this.colors.find(col => col.id === 'teal_orange'));
    this.selectedRatio = this.aspectRatios.find(ar => ar.id === 'ar_239');
  }
}).mount('#app');
