export interface Phrase {
  id: string;
  local: string;
}

export interface PhraseCategory {
  category: string;
  phrases: Phrase[];
}

export const getLanguageForCountry = (countryCode: string): string => {
  const map: Record<string, string> = {
    US: 'EN', GB: 'EN', CA: 'EN', AU: 'EN', NZ: 'EN', IE: 'EN',
    FR: 'FR', ES: 'ES', MX: 'ES', AR: 'ES', IT: 'IT', TR: 'TR',
    DE: 'DE', AT: 'DE', CH: 'DE', GR: 'EL', PT: 'PT', BR: 'PT',
    NL: 'NL', BE: 'NL', PL: 'PL', HR: 'HR', CZ: 'CS', DK: 'DA',
    HU: 'HU', SE: 'SV', NO: 'NO', CN: 'ZH', JP: 'JA', TH: 'TH',
    VN: 'VI', KR: 'KO', IN: 'HI'
  };
  return map[countryCode] || 'EN';
};

export const getSpeechLanguageCode = (languageCode: string): string => {
  const map: Record<string, string> = {
    EN: 'en-US', FR: 'fr-FR', ES: 'es-ES', IT: 'it-IT', TR: 'tr-TR',
    DE: 'de-DE', EL: 'el-GR', PT: 'pt-PT', NL: 'nl-NL', PL: 'pl-PL',
    HR: 'hr-HR', CS: 'cs-CZ', DA: 'da-DK', HU: 'hu-HU', SV: 'sv-SE',
    NO: 'no-NO', ZH: 'zh-CN', JA: 'ja-JP', TH: 'th-TH', VI: 'vi-VN',
    KO: 'ko-KR', HI: 'hi-IN'
  };
  return map[languageCode] || 'en-US';
};

// Generates the baseline English phrases
const englishPhrases: PhraseCategory[] = [
  {
    category: 'Basics',
    phrases: [
      { id: 'hello', local: 'Hello' },
      { id: 'goodbye', local: 'Goodbye' },
      { id: 'please', local: 'Please' },
      { id: 'thank_you', local: 'Thank you' },
      { id: 'yes', local: 'Yes' },
      { id: 'no', local: 'No' },
      { id: 'excuse_me', local: 'Excuse me' },
      { id: 'do_you_speak_english', local: 'Do you speak English?' },
    ]
  },
  {
    category: 'Shopping',
    phrases: [
      { id: 'how_much', local: 'How much does this cost?' },
      { id: 'credit_cards', local: 'Do you take credit cards?' },
      { id: 'buy_this', local: 'I would like to buy this' },
      { id: 'too_expensive', local: 'Too expensive' },
      { id: 'can_you_help', local: 'Can you help me?' },
      { id: 'fitting_room', local: 'Where is the fitting room?' },
      { id: 'just_looking', local: 'Just looking, thanks' },
    ]
  },
  {
    category: 'Hotel & Dining',
    phrases: [
      { id: 'menu', local: 'Can I see the menu?' },
      { id: 'table_for_two', local: 'A table for two, please' },
      { id: 'bill', local: 'The bill, please' },
      { id: 'water', local: 'Water, please' },
      { id: 'reservation', local: 'I have a reservation' },
      { id: 'delicious', local: 'Delicious' },
      { id: 'bathroom', local: 'Where is the bathroom?' },
    ]
  },
  {
    category: 'Emergencies',
    phrases: [
      { id: 'help', local: 'Help!' },
      { id: 'need_doctor', local: 'I need a doctor' },
      { id: 'call_police', local: 'Call the police' },
      { id: 'hospital', local: 'Where is the hospital?' },
      { id: 'lost_passport', local: 'I lost my passport' },
      { id: 'emergency', local: 'It\'s an emergency' },
      { id: 'embassy', local: 'Where is the embassy?' },
    ]
  }
];

export const PHRASES_DATA: Record<string, PhraseCategory[]> = {
  EN: englishPhrases,
  FR: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Bonjour' },
        { id: 'goodbye', local: 'Au revoir' },
        { id: 'please', local: 'S\'il vous plaît' },
        { id: 'thank_you', local: 'Merci' },
        { id: 'yes', local: 'Oui' },
        { id: 'no', local: 'Non' },
        { id: 'excuse_me', local: 'Excusez-moi' },
        { id: 'do_you_speak_english', local: 'Parlez-vous anglais ?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Combien ça coûte ?' },
        { id: 'credit_cards', local: 'Acceptez-vous les cartes de crédit ?' },
        { id: 'buy_this', local: 'Je voudrais acheter ça' },
        { id: 'too_expensive', local: 'Trop cher' },
        { id: 'can_you_help', local: 'Pouvez-vous m\'aider ?' },
        { id: 'fitting_room', local: 'Où sont les cabines d\'essayage ?' },
        { id: 'just_looking', local: 'Je regarde seulement, merci' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Puis-je voir le menu ?' },
        { id: 'table_for_two', local: 'Une table pour deux, s\'il vous plaît' },
        { id: 'bill', local: 'L\'addition, s\'il vous plaît' },
        { id: 'water', local: 'De l\'eau, s\'il vous plaît' },
        { id: 'reservation', local: 'J\'ai une réservation' },
        { id: 'delicious', local: 'Délicieux' },
        { id: 'bathroom', local: 'Où sont les toilettes ?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Au secours !' },
        { id: 'need_doctor', local: 'J\'ai besoin d\'un médecin' },
        { id: 'call_police', local: 'Appelez la police' },
        { id: 'hospital', local: 'Où est l\'hôpital ?' },
        { id: 'lost_passport', local: 'J\'ai perdu mon passeport' },
        { id: 'emergency', local: 'C\'est une urgence' },
        { id: 'embassy', local: 'Où est l\'ambassade ?' },
      ]
    }
  ],
  ES: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hola' },
        { id: 'goodbye', local: 'Adiós' },
        { id: 'please', local: 'Por favor' },
        { id: 'thank_you', local: 'Gracias' },
        { id: 'yes', local: 'Sí' },
        { id: 'no', local: 'No' },
        { id: 'excuse_me', local: 'Disculpe' },
        { id: 'do_you_speak_english', local: '¿Habla inglés?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: '¿Cuánto cuesta esto?' },
        { id: 'credit_cards', local: '¿Aceptan tarjetas de crédito?' },
        { id: 'buy_this', local: 'Me gustaría comprar esto' },
        { id: 'too_expensive', local: 'Demasiado caro' },
        { id: 'can_you_help', local: '¿Puede ayudarme?' },
        { id: 'fitting_room', local: '¿Dónde están los probadores?' },
        { id: 'just_looking', local: 'Sólo estoy mirando, gracias' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: '¿Puedo ver el menú?' },
        { id: 'table_for_two', local: 'Una mesa para dos, por favor' },
        { id: 'bill', local: 'La cuenta, por favor' },
        { id: 'water', local: 'Agua, por favor' },
        { id: 'reservation', local: 'Tengo una reserva' },
        { id: 'delicious', local: 'Delicioso' },
        { id: 'bathroom', local: '¿Dónde está el baño?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: '¡Ayuda!' },
        { id: 'need_doctor', local: 'Necesito un médico' },
        { id: 'call_police', local: 'Llame a la policía' },
        { id: 'hospital', local: '¿Dónde está el hospital?' },
        { id: 'lost_passport', local: 'He perdido mi pasaporte' },
        { id: 'emergency', local: 'Es una emergencia' },
        { id: 'embassy', local: '¿Dónde está la embajada?' },
      ]
    }
  ],
  IT: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Ciao' },
        { id: 'goodbye', local: 'Arrivederci' },
        { id: 'please', local: 'Per favore' },
        { id: 'thank_you', local: 'Grazie' },
        { id: 'yes', local: 'Sì' },
        { id: 'no', local: 'No' },
        { id: 'excuse_me', local: 'Mi scusi' },
        { id: 'do_you_speak_english', local: 'Parla inglese?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Quanto costa questo?' },
        { id: 'credit_cards', local: 'Accettate carte di credito?' },
        { id: 'buy_this', local: 'Vorrei comprare questo' },
        { id: 'too_expensive', local: 'Troppo caro' },
        { id: 'can_you_help', local: 'Può aiutarmi?' },
        { id: 'fitting_room', local: 'Dov\'è il camerino?' },
        { id: 'just_looking', local: 'Sto solo guardando, grazie' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Posso vedere il menù?' },
        { id: 'table_for_two', local: 'Un tavolo per due, per favore' },
        { id: 'bill', local: 'Il conto, per favore' },
        { id: 'water', local: 'Acqua, per favore' },
        { id: 'reservation', local: 'Ho una prenotazione' },
        { id: 'delicious', local: 'Delizioso' },
        { id: 'bathroom', local: 'Dov\'è il bagno?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Aiuto!' },
        { id: 'need_doctor', local: 'Ho bisogno di un medico' },
        { id: 'call_police', local: 'Chiami la polizia' },
        { id: 'hospital', local: 'Dov\'è l\'ospedale?' },
        { id: 'lost_passport', local: 'Ho perso il passaporto' },
        { id: 'emergency', local: 'È un\'emergenza' },
        { id: 'embassy', local: 'Dov\'è l\'ambasciata?' },
      ]
    }
  ],
  DE: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hallo' },
        { id: 'goodbye', local: 'Auf Wiedersehen' },
        { id: 'please', local: 'Bitte' },
        { id: 'thank_you', local: 'Danke' },
        { id: 'yes', local: 'Ja' },
        { id: 'no', local: 'Nein' },
        { id: 'excuse_me', local: 'Entschuldigung' },
        { id: 'do_you_speak_english', local: 'Sprechen Sie Englisch?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Wie viel kostet das?' },
        { id: 'credit_cards', local: 'Akzeptieren Sie Kreditkarten?' },
        { id: 'buy_this', local: 'Ich würde das gerne kaufen' },
        { id: 'too_expensive', local: 'Zu teuer' },
        { id: 'can_you_help', local: 'Können Sie mir helfen?' },
        { id: 'fitting_room', local: 'Wo ist die Umkleidekabine?' },
        { id: 'just_looking', local: 'Ich schaue nur, danke' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Kann ich die Speisekarte sehen?' },
        { id: 'table_for_two', local: 'Einen Tisch für zwei, bitte' },
        { id: 'bill', local: 'Die Rechnung, bitte' },
        { id: 'water', local: 'Wasser, bitte' },
        { id: 'reservation', local: 'Ich habe eine Reservierung' },
        { id: 'delicious', local: 'Lecker' },
        { id: 'bathroom', local: 'Wo ist die Toilette?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Hilfe!' },
        { id: 'need_doctor', local: 'Ich brauche einen Arzt' },
        { id: 'call_police', local: 'Rufen Sie die Polizei' },
        { id: 'hospital', local: 'Wo ist das Krankenhaus?' },
        { id: 'lost_passport', local: 'Ich habe meinen Reisepass verloren' },
        { id: 'emergency', local: 'Es ist ein Notfall' },
        { id: 'embassy', local: 'Wo ist die Botschaft?' },
      ]
    }
  ],
  JA: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'こんにちは (Konnichiwa)' },
        { id: 'goodbye', local: 'さようなら (Sayōnara)' },
        { id: 'please', local: 'お願いします (Onegaishimasu)' },
        { id: 'thank_you', local: 'ありがとうございます (Arigatō gozaimasu)' },
        { id: 'yes', local: 'はい (Hai)' },
        { id: 'no', local: 'いいえ (Iie)' },
        { id: 'excuse_me', local: 'すみません (Sumimasen)' },
        { id: 'do_you_speak_english', local: '英語を話せますか？ (Eigo o hanasemasu ka?)' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'これはいくらですか？ (Kore wa ikura desu ka?)' },
        { id: 'credit_cards', local: 'クレジットカードは使えますか？ (Kurejitto kādo wa tsukaemasu ka?)' },
        { id: 'buy_this', local: 'これを買いたいです (Kore o kaitai desu)' },
        { id: 'too_expensive', local: '高すぎます (Taka sugimasu)' },
        { id: 'can_you_help', local: '手伝ってくれますか？ (Tetsudatte moraemasu ka?)' },
        { id: 'fitting_room', local: '試着室はどこですか？ (Shichakushitsu wa doko desu ka?)' },
        { id: 'just_looking', local: '見ているだけです、ありがとう (Mite iru dake desu, arigatō)' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'メニューを見せてください (Menyū o misete moraemasu ka?)' },
        { id: 'table_for_two', local: '2人用の席をお願いします (Futari yō no tēburu o onegaishimasu)' },
        { id: 'bill', local: 'お会計をお願いします (Okaikei o onegaishimasu)' },
        { id: 'water', local: 'お水をお願いします (Mizu o onegaishimasu)' },
        { id: 'reservation', local: '予約しています (Yoyaku shite imasu)' },
        { id: 'delicious', local: '美味しい (Oishī)' },
        { id: 'bathroom', local: 'トイレはどこですか？ (Toire wa doko desu ka?)' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: '助けて！ (Tasukete!)' },
        { id: 'need_doctor', local: '医者が必要です (Isha ga hitsuyō desu)' },
        { id: 'call_police', local: '警察を呼んでください (Keisatsu o yonde kudasai)' },
        { id: 'hospital', local: '病院はどこですか？ (Byōin wa doko desu ka?)' },
        { id: 'lost_passport', local: 'パスポートをなくしました (Pasupōto o nakushimashita)' },
        { id: 'emergency', local: '緊急事態です (Kinkyū jitai desu)' },
        { id: 'embassy', local: '大使館はどこですか？ (Taishikan wa doko desu ka?)' },
      ]
    }
  ],
  PT: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Olá' },
        { id: 'goodbye', local: 'Adeus' },
        { id: 'please', local: 'Por favor' },
        { id: 'thank_you', local: 'Obrigado' },
        { id: 'yes', local: 'Sim' },
        { id: 'no', local: 'Não' },
        { id: 'excuse_me', local: 'Com licença' },
        { id: 'do_you_speak_english', local: 'Você fala inglês?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Quanto custa isso?' },
        { id: 'credit_cards', local: 'Aceitam cartões de crédito?' },
        { id: 'buy_this', local: 'Eu gostaria de comprar isso' },
        { id: 'too_expensive', local: 'Muito caro' },
        { id: 'can_you_help', local: 'Pode me ajudar?' },
        { id: 'fitting_room', local: 'Onde fica o provador?' },
        { id: 'just_looking', local: 'Só estou olhando, obrigado' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Posso ver o cardápio?' },
        { id: 'table_for_two', local: 'Uma mesa para dois, por favor' },
        { id: 'bill', local: 'A conta, por favor' },
        { id: 'water', local: 'Água, por favor' },
        { id: 'reservation', local: 'Eu tenho uma reserva' },
        { id: 'delicious', local: 'Delicioso' },
        { id: 'bathroom', local: 'Onde fica o banheiro?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Socorro!' },
        { id: 'need_doctor', local: 'Preciso de um médico' },
        { id: 'call_police', local: 'Ligue para a polícia' },
        { id: 'hospital', local: 'Onde fica o hospital?' },
        { id: 'lost_passport', local: 'Perdi meu passaporte' },
        { id: 'emergency', local: 'É uma emergência' },
        { id: 'embassy', local: 'Onde fica a embaixada?' },
      ]
    }
  ],
  TR: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Merhaba' },
        { id: 'goodbye', local: 'Hoşça kal' },
        { id: 'please', local: 'Lütfen' },
        { id: 'thank_you', local: 'Teşekkür ederim' },
        { id: 'yes', local: 'Evet' },
        { id: 'no', local: 'Hayır' },
        { id: 'excuse_me', local: 'Afedersiniz' },
        { id: 'do_you_speak_english', local: 'İngilizce biliyor musunuz?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Bu ne kadar?' },
        { id: 'credit_cards', local: 'Kredi kartı kabul ediyor musunuz?' },
        { id: 'buy_this', local: 'Bunu almak istiyorum' },
        { id: 'too_expensive', local: 'Çok pahalı' },
        { id: 'can_you_help', local: 'Bana yardım edebilir misiniz?' },
        { id: 'fitting_room', local: 'Deneme kabini nerede?' },
        { id: 'just_looking', local: 'Sadece bakıyorum, teşekkürler' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Menüyü görebilir miyim?' },
        { id: 'table_for_two', local: 'İki kişilik bir masa lütfen' },
        { id: 'bill', local: 'Hesap lütfen' },
        { id: 'water', local: 'Su lütfen' },
        { id: 'reservation', local: 'Rezervasyonum var' },
        { id: 'delicious', local: 'Lezzetli' },
        { id: 'bathroom', local: 'Tuvalet nerede?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'İmdat!' },
        { id: 'need_doctor', local: 'Doktora ihtiyacım var' },
        { id: 'call_police', local: 'Polisi arayın' },
        { id: 'hospital', local: 'Hastane nerede?' },
        { id: 'lost_passport', local: 'Pasaportumu kaybettim' },
        { id: 'emergency', local: 'Bu bir acil durum' },
        { id: 'embassy', local: 'Büyükelçilik nerede?' },
      ]
    }
  ],
  EL: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Γειά σου (Yassou)' },
        { id: 'goodbye', local: 'Αντίο (Adio)' },
        { id: 'please', local: 'Παρακαλώ (Parakalo)' },
        { id: 'thank_you', local: 'Ευχαριστώ (Efcharisto)' },
        { id: 'yes', local: 'Ναι (Ne)' },
        { id: 'no', local: 'Όχι (Ohi)' },
        { id: 'excuse_me', local: 'Συγγνώμη (Signomi)' },
        { id: 'do_you_speak_english', local: 'Μιλάτε αγγλικά; (Milate agglika?)' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Πόσο κοστίζει αυτό; (Poso kostizi afto?)' },
        { id: 'credit_cards', local: 'Δέχεστε πιστωτικές κάρτες; (Decheste pistotikes kartes?)' },
        { id: 'buy_this', local: 'Θα ήθελα να το αγοράσω (Tha ithela na to agoraso)' },
        { id: 'too_expensive', local: 'Πολύ ακριβό (Poli akrivo)' },
        { id: 'can_you_help', local: 'Μπορείτε να με βοηθήσετε; (Borite na me voithisete?)' },
        { id: 'fitting_room', local: 'Πού είναι το δοκιμαστήριο; (Pou ine ta dokimastiria?)' },
        { id: 'just_looking', local: 'Απλά κοιτάζω, ευχαριστώ (Apla kitazo, efcharisto)' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Μπορώ να δω το μενού; (Boro na do to menu?)' },
        { id: 'table_for_two', local: 'Ένα τραπέζι για δύο, παρακαλώ (Ena trapezi gia dio, parakalo)' },
        { id: 'bill', local: 'Το λογαριασμό, παρακαλώ (To logariasmo, parakalo)' },
        { id: 'water', local: 'Νερό, παρακαλώ (Nero, parakalo)' },
        { id: 'reservation', local: 'Έχω κάνει κράτηση (Echo kani kratisi)' },
        { id: 'delicious', local: 'Νόστιμο (Nostimo)' },
        { id: 'bathroom', local: 'Πού είναι η τουαλέτα; (Pou ine i toualeta?)' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Βοήθεια! (Voithia!)' },
        { id: 'need_doctor', local: 'Χρειάζομαι γιατρό (Chriazome yiatro)' },
        { id: 'call_police', local: 'Καλέστε την αστυνομία (Kaleste tin astinomia)' },
        { id: 'hospital', local: 'Πού είναι το νοσοκομείο; (Pou ine to nosokomio?)' },
        { id: 'lost_passport', local: 'Έχασα το διαβατήριό μου (Echasa to diavatirio mou)' },
        { id: 'emergency', local: 'Είναι επείγον (Ine epigon)' },
        { id: 'embassy', local: 'Πού είναι η πρεσβεία; (Pou ine i presvia?)' },
      ]
    }
  ],
  NL: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hallo' },
        { id: 'goodbye', local: 'Tot ziens' },
        { id: 'please', local: 'Alstublieft' },
        { id: 'thank_you', local: 'Dank u' },
        { id: 'yes', local: 'Ja' },
        { id: 'no', local: 'Nee' },
        { id: 'excuse_me', local: 'Pardon' },
        { id: 'do_you_speak_english', local: 'Spreekt u Engels?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Hoeveel kost dit?' },
        { id: 'credit_cards', local: 'Accepteert u creditcards?' },
        { id: 'buy_this', local: 'Ik wil dit graag kopen' },
        { id: 'too_expensive', local: 'Te duur' },
        { id: 'can_you_help', local: 'Kunt u mij helpen?' },
        { id: 'fitting_room', local: 'Waar is het pashokje?' },
        { id: 'just_looking', local: 'Ik kijk alleen maar, bedankt' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Mag ik het menu zien?' },
        { id: 'table_for_two', local: 'Een tafel voor twee, alstublieft' },
        { id: 'bill', local: 'De rekening, alstublieft' },
        { id: 'water', local: 'Water, alstublieft' },
        { id: 'reservation', local: 'Ik heb een reservering' },
        { id: 'delicious', local: 'Heerlijk' },
        { id: 'bathroom', local: 'Waar is het toilet?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Help!' },
        { id: 'need_doctor', local: 'Ik heb een dokter nodig' },
        { id: 'call_police', local: 'Bel de politie' },
        { id: 'hospital', local: 'Waar is het ziekenhuis?' },
        { id: 'lost_passport', local: 'Ik ben mijn paspoort kwijt' },
        { id: 'emergency', local: 'Het is een noodgeval' },
        { id: 'embassy', local: 'Waar is de ambassade?' },
      ]
    }
  ],
  PL: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Dzień dobry' },
        { id: 'goodbye', local: 'Do widzenia' },
        { id: 'please', local: 'Proszę' },
        { id: 'thank_you', local: 'Dziękuję' },
        { id: 'yes', local: 'Tak' },
        { id: 'no', local: 'Nie' },
        { id: 'excuse_me', local: 'Przepraszam' },
        { id: 'do_you_speak_english', local: 'Czy mówi pan/pani po angielsku?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Ile to kosztuje?' },
        { id: 'credit_cards', local: 'Czy można płacić kartą?' },
        { id: 'buy_this', local: 'Chciałbym/Chciałabym to kupić' },
        { id: 'too_expensive', local: 'Za drogo' },
        { id: 'can_you_help', local: 'Czy może mi pan/pani pomóc?' },
        { id: 'fitting_room', local: 'Gdzie jest przymierzalnia?' },
        { id: 'just_looking', local: 'Tylko oglądam, dziękuję' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Czy mogę prosić o menu?' },
        { id: 'table_for_two', local: 'Stolik dla dwóch osób, proszę' },
        { id: 'bill', local: 'Rachunek, proszę' },
        { id: 'water', local: 'Wodę, proszę' },
        { id: 'reservation', local: 'Mam rezerwację' },
        { id: 'delicious', local: 'Pyszne' },
        { id: 'bathroom', local: 'Gdzie jest toaleta?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Pomocy!' },
        { id: 'need_doctor', local: 'Potrzebuję lekarza' },
        { id: 'call_police', local: 'Proszę wezwać policję' },
        { id: 'hospital', local: 'Gdzie jest szpital?' },
        { id: 'lost_passport', local: 'Zgubiłem/Zgubiłam paszport' },
        { id: 'emergency', local: 'To nagły wypadek' },
        { id: 'embassy', local: 'Gdzie jest ambasada?' },
      ]
    }
  ],
  HR: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Dobar dan' },
        { id: 'goodbye', local: 'Doviđenja' },
        { id: 'please', local: 'Molim' },
        { id: 'thank_you', local: 'Hvala' },
        { id: 'yes', local: 'Da' },
        { id: 'no', local: 'Ne' },
        { id: 'excuse_me', local: 'Oprostite' },
        { id: 'do_you_speak_english', local: 'Govorite li engleski?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Koliko ovo košta?' },
        { id: 'credit_cards', local: 'Primate li kreditne kartice?' },
        { id: 'buy_this', local: 'Želio/Željela bih ovo kupiti' },
        { id: 'too_expensive', local: 'Preskupo' },
        { id: 'can_you_help', local: 'Možete li mi pomoći?' },
        { id: 'fitting_room', local: 'Gdje je kabina?' },
        { id: 'just_looking', local: 'Samo gledam, hvala' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Mogu li vidjeti jelovnik?' },
        { id: 'table_for_two', local: 'Stol za dvoje, molim' },
        { id: 'bill', local: 'Račun, molim' },
        { id: 'water', local: 'Vodu, molim' },
        { id: 'reservation', local: 'Imam rezervaciju' },
        { id: 'delicious', local: 'Ukusno' },
        { id: 'bathroom', local: 'Gdje je WC?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Upomoć!' },
        { id: 'need_doctor', local: 'Trebam doktora' },
        { id: 'call_police', local: 'Zovite policiju' },
        { id: 'hospital', local: 'Gdje je bolnica?' },
        { id: 'lost_passport', local: 'Izgubio/Izgubila sam putovnicu' },
        { id: 'emergency', local: 'Hitan slučaj' },
        { id: 'embassy', local: 'Gdje je ambasada?' },
      ]
    }
  ],
  CS: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Dobrý den' },
        { id: 'goodbye', local: 'Na shledanou' },
        { id: 'please', local: 'Prosím' },
        { id: 'thank_you', local: 'Děkuji' },
        { id: 'yes', local: 'Ano' },
        { id: 'no', local: 'Ne' },
        { id: 'excuse_me', local: 'Promiňte' },
        { id: 'do_you_speak_english', local: 'Mluvíte anglicky?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Kolik to stojí?' },
        { id: 'credit_cards', local: 'Berete kreditní karty?' },
        { id: 'buy_this', local: 'Rád(a) bych si to koupil' },
        { id: 'too_expensive', local: 'Příliš drahé' },
        { id: 'can_you_help', local: 'Můžete mi pomoci?' },
        { id: 'fitting_room', local: 'Kde je zkušební kabinka?' },
        { id: 'just_looking', local: 'Jen se dívám, děkuji' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Mohu vidět jídelní lístek?' },
        { id: 'table_for_two', local: 'Stůl pro dva, prosím' },
        { id: 'bill', local: 'Účet, prosím' },
        { id: 'water', local: 'Vodu, prosím' },
        { id: 'reservation', local: 'Mám rezervaci' },
        { id: 'delicious', local: 'Vynikající' },
        { id: 'bathroom', local: 'Kde je toaleta?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Pomoc!' },
        { id: 'need_doctor', local: 'Potřebuji doktora' },
        { id: 'call_police', local: 'Zavolejte policii' },
        { id: 'hospital', local: 'Kde je nemocnice?' },
        { id: 'lost_passport', local: 'Ztratil(a) jsem pas' },
        { id: 'emergency', local: 'Je to nouzová situace' },
        { id: 'embassy', local: 'Kde je velvyslanectví?' },
      ]
    }
  ],
  DA: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hej' },
        { id: 'goodbye', local: 'Farvel' },
        { id: 'please', local: 'Vær venlig' },
        { id: 'thank_you', local: 'Tak' },
        { id: 'yes', local: 'Ja' },
        { id: 'no', local: 'Nej' },
        { id: 'excuse_me', local: 'Undskyld' },
        { id: 'do_you_speak_english', local: 'Taler du engelsk?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Hvor meget koster det?' },
        { id: 'credit_cards', local: 'Tager I kreditkort?' },
        { id: 'buy_this', local: 'Jeg vil gerne købe dette' },
        { id: 'too_expensive', local: 'For dyrt' },
        { id: 'can_you_help', local: 'Kan du hjælpe mig?' },
        { id: 'fitting_room', local: 'Hvor er prøverummet?' },
        { id: 'just_looking', local: 'Kigger bare, tak' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Må jeg se menuen?' },
        { id: 'table_for_two', local: 'Et bord til to, tak' },
        { id: 'bill', local: 'Regningen, tak' },
        { id: 'water', local: 'Vand, tak' },
        { id: 'reservation', local: 'Jeg har en reservation' },
        { id: 'delicious', local: 'Lækkert' },
        { id: 'bathroom', local: 'Hvor er toilettet?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Hjælp!' },
        { id: 'need_doctor', local: 'Jeg har brug for en læge' },
        { id: 'call_police', local: 'Ring til politiet' },
        { id: 'hospital', local: 'Hvor er hospitalet?' },
        { id: 'lost_passport', local: 'Jeg har mistet mit pas' },
        { id: 'emergency', local: 'Det er et nødstilfælde' },
        { id: 'embassy', local: 'Hvor er ambassaden?' },
      ]
    }
  ],
  HU: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Szia' },
        { id: 'goodbye', local: 'Viszlát' },
        { id: 'please', local: 'Kérem' },
        { id: 'thank_you', local: 'Köszönöm' },
        { id: 'yes', local: 'Igen' },
        { id: 'no', local: 'Nem' },
        { id: 'excuse_me', local: 'Elnézést' },
        { id: 'do_you_speak_english', local: 'Beszél angolul?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Mennyibe kerül?' },
        { id: 'credit_cards', local: 'Elfogadnak hitelkártyát?' },
        { id: 'buy_this', local: 'Szeretném ezt megvenni' },
        { id: 'too_expensive', local: 'Túl drága' },
        { id: 'can_you_help', local: 'Tud segíteni?' },
        { id: 'fitting_room', local: 'Hol van a próbafülke?' },
        { id: 'just_looking', local: 'Csak nézelődöm, köszönöm' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Láthatnám az étlapot?' },
        { id: 'table_for_two', local: 'Egy asztalt két főre, kérem' },
        { id: 'bill', local: 'A számlát, kérem' },
        { id: 'water', local: 'Vizet, kérem' },
        { id: 'reservation', local: 'Van foglalásom' },
        { id: 'delicious', local: 'Finom' },
        { id: 'bathroom', local: 'Hol van a mosdó?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Segítség!' },
        { id: 'need_doctor', local: 'Orvosra van szükségem' },
        { id: 'call_police', local: 'Hívja a rendőrséget' },
        { id: 'hospital', local: 'Hol van a kórház?' },
        { id: 'lost_passport', local: 'Elvesztettem az útlevelemet' },
        { id: 'emergency', local: 'Ez vészhelyzet' },
        { id: 'embassy', local: 'Hol van a nagykövetség?' },
      ]
    }
  ],
  SV: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hej' },
        { id: 'goodbye', local: 'Hej då' },
        { id: 'please', local: 'Snälla' },
        { id: 'thank_you', local: 'Tack' },
        { id: 'yes', local: 'Ja' },
        { id: 'no', local: 'Nej' },
        { id: 'excuse_me', local: 'Ursäkta mig' },
        { id: 'do_you_speak_english', local: 'Pratar du engelska?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Hur mycket kostar det?' },
        { id: 'credit_cards', local: 'Tar ni kreditkort?' },
        { id: 'buy_this', local: 'Jag skulle vilja köpa den här' },
        { id: 'too_expensive', local: 'För dyrt' },
        { id: 'can_you_help', local: 'Kan du hjälpa mig?' },
        { id: 'fitting_room', local: 'Var är provhytten?' },
        { id: 'just_looking', local: 'Tittar bara, tack' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Kan jag få se menyn?' },
        { id: 'table_for_two', local: 'Ett bord för två, tack' },
        { id: 'bill', local: 'Notan, tack' },
        { id: 'water', local: 'Vatten, tack' },
        { id: 'reservation', local: 'Jag har en bokning' },
        { id: 'delicious', local: 'Utsökt' },
        { id: 'bathroom', local: 'Var är toaletten?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Hjälp!' },
        { id: 'need_doctor', local: 'Jag behöver en läkare' },
        { id: 'call_police', local: 'Ring polisen' },
        { id: 'hospital', local: 'Var ligger sjukhuset?' },
        { id: 'lost_passport', local: 'Jag har tappat mitt pass' },
        { id: 'emergency', local: 'Det är en nödsituation' },
        { id: 'embassy', local: 'Var ligger ambassaden?' },
      ]
    }
  ],
  NO: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hallo' },
        { id: 'goodbye', local: 'Ha det' },
        { id: 'please', local: 'Vær så snill' },
        { id: 'thank_you', local: 'Takk' },
        { id: 'yes', local: 'Ja' },
        { id: 'no', local: 'Nei' },
        { id: 'excuse_me', local: 'Unnskyld' },
        { id: 'do_you_speak_english', local: 'Snakker du engelsk?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Hvor mye koster dette?' },
        { id: 'credit_cards', local: 'Tar dere kredittkort?' },
        { id: 'buy_this', local: 'Jeg vil gjerne kjøpe denne' },
        { id: 'too_expensive', local: 'For dyrt' },
        { id: 'can_you_help', local: 'Kan du hjelpe meg?' },
        { id: 'fitting_room', local: 'Hvor er prøverommet?' },
        { id: 'just_looking', local: 'Ser bare, takk' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Kan jeg få se menyen?' },
        { id: 'table_for_two', local: 'Et bord for to, takk' },
        { id: 'bill', local: 'Regningen, takk' },
        { id: 'water', local: 'Vann, takk' },
        { id: 'reservation', local: 'Jeg har en reservasjon' },
        { id: 'delicious', local: 'Nydelig' },
        { id: 'bathroom', local: 'Hvor er toalettet?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Hjelp!' },
        { id: 'need_doctor', local: 'Jeg trenger en lege' },
        { id: 'call_police', local: 'Ring politiet' },
        { id: 'hospital', local: 'Hvor er sykehuset?' },
        { id: 'lost_passport', local: 'Jeg har mistet passet mitt' },
        { id: 'emergency', local: 'Det er et nødstilfelle' },
        { id: 'embassy', local: 'Hvor er ambassaden?' },
      ]
    }
  ],
  ZH: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: '你好 (Nǐ hǎo)' },
        { id: 'goodbye', local: '再见 (Zàijiàn)' },
        { id: 'please', local: '请 (Qǐng)' },
        { id: 'thank_you', local: '谢谢 (Xièxiè)' },
        { id: 'yes', local: '是 (Shì)' },
        { id: 'no', local: '不 (Bù)' },
        { id: 'excuse_me', local: '打扰一下 (Dǎrǎo yíxià)' },
        { id: 'do_you_speak_english', local: '你会说英语吗？ (Nǐ huì shuō Yīngyǔ ma?)' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: '这个多少钱？ (Zhège duōshǎo qián?)' },
        { id: 'credit_cards', local: '你们接受信用卡吗？ (Nǐmen shōu xìnyòngkǎ ma?)' },
        { id: 'buy_this', local: '我想买这个 (Wǒ xiǎng mǎi zhège)' },
        { id: 'too_expensive', local: '太贵了 (Tài guì le)' },
        { id: 'can_you_help', local: '你能帮我吗？ (Nǐ néng bāng wǒ ma?)' },
        { id: 'fitting_room', local: '试衣间在哪里？ (Shìyījiān zài nǎlǐ?)' },
        { id: 'just_looking', local: '我只是看看，谢谢 (Wǒ zhǐshì kànkàn, xièxiè)' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: '我可以看菜单吗？ (Wǒ néng kàn kàn càidān ma?)' },
        { id: 'table_for_two', local: '两人的桌子，谢谢 (Liǎng wèi, qǐng)' },
        { id: 'bill', local: '买单 (Mǎidān, qǐng)' },
        { id: 'water', local: '请给我水 (Qǐng gěi wǒ bēi shuǐ)' },
        { id: 'reservation', local: '我有预订 (Wǒ yǒu yùdìng)' },
        { id: 'delicious', local: '好吃 (Hěn hào chī)' },
        { id: 'bathroom', local: '洗手间在哪里？ (Xǐshǒujiān zài nǎlǐ?)' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: '救命！ (Jiùmìng!)' },
        { id: 'need_doctor', local: '我需要医生 (Wǒ xūyào yīshēng)' },
        { id: 'call_police', local: '报警 (Bào jǐng)' },
        { id: 'hospital', local: '医院在哪里？ (Yīyuàn zài nǎlǐ?)' },
        { id: 'lost_passport', local: '我护照丢了 (Wǒ gǎodiūle hùzhào)' },
        { id: 'emergency', local: '这是紧急情况 (Zhè shì jǐnjí qíngkuàng)' },
        { id: 'embassy', local: '大使馆在哪里？ (Dàshǐguǎn zài nǎlǐ?)' },
      ]
    }
  ],
  TH: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'สวัสดี (Sawatdee)' },
        { id: 'goodbye', local: 'ลาก่อน (La gon)' },
        { id: 'please', local: 'กรุณา (Prot)' },
        { id: 'thank_you', local: 'ขอบคุณ (Khop khun)' },
        { id: 'yes', local: 'ใช่ (Chai)' },
        { id: 'no', local: 'ไม่ (Mai chai)' },
        { id: 'excuse_me', local: 'ขอโทษ (Khor thot)' },
        { id: 'do_you_speak_english', local: 'คุณพูดภาษาอังกฤษได้ไหม (Khun phut pa-sa ang-krit dai mai?)' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'อันนี้ราคาเท่าไหร่ (Ra-kha tao rai?)' },
        { id: 'credit_cards', local: 'รับบัตรเครดิตไหม (Rap bat khre-dit mai?)' },
        { id: 'buy_this', local: 'ฉันอยากซื้ออันนี้ (Yak ja seu an ni)' },
        { id: 'too_expensive', local: 'แพงเกินไป (Phaeng pai)' },
        { id: 'can_you_help', local: 'ช่วยฉันหน่อยได้ไหม (Chuay noi dai mai?)' },
        { id: 'fitting_room', local: 'ห้องลองเสื้ออยู่ที่ไหน (Hong long seua yoo tee nai?)' },
        { id: 'just_looking', local: 'ขอดูเฉยๆ ขอบคุณ (Khae doo, khop khun)' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'ขอดูเมนูหน่อย (Khor doo me-noo noi?)' },
        { id: 'table_for_two', local: 'ขอโต๊ะสำหรับสองคน (Khor toh sam-rap song khon)' },
        { id: 'bill', local: 'เก็บเงินด้วย (Gep ngern duay)' },
        { id: 'water', local: 'ขอน้ำเปล่า (Khor nam plao)' },
        { id: 'reservation', local: 'ฉันจองไว้แล้ว (Chan jong wai laew)' },
        { id: 'delicious', local: 'อร่อย (A-roy)' },
        { id: 'bathroom', local: 'ห้องน้ำอยู่ที่ไหน (Hong nam yoo tee nai?)' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'ช่วยด้วย! (Chuay duay!)' },
        { id: 'need_doctor', local: 'ฉันต้องการหมอ (Tong-gan mor)' },
        { id: 'call_police', local: 'โทรเรียกตำรวจ (Riang tam-ruat)' },
        { id: 'hospital', local: 'โรงพยาบาลอยู่ที่ไหน (Rong-pha-ya-ban yoo tee nai?)' },
        { id: 'lost_passport', local: 'พาสปอร์ตของฉันหาย (Chan tam phat-sa-pot hai)' },
        { id: 'emergency', local: 'นี่เป็นเรื่องฉุกเฉิน (Ni khu rueang chuk-choen)' },
        { id: 'embassy', local: 'สถานทูตอยู่ที่ไหน (Sa-than-thut yoo tee nai?)' },
      ]
    }
  ],
  VI: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Xin chào' },
        { id: 'goodbye', local: 'Tạm biệt' },
        { id: 'please', local: 'Làm ơn' },
        { id: 'thank_you', local: 'Cảm ơn' },
        { id: 'yes', local: 'Vâng' },
        { id: 'no', local: 'Không' },
        { id: 'excuse_me', local: 'Xin lỗi' },
        { id: 'do_you_speak_english', local: 'Bạn có nói tiếng Anh không?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Cái này bao nhiêu tiền?' },
        { id: 'credit_cards', local: 'Bạn có nhận thẻ tín dụng không?' },
        { id: 'buy_this', local: 'Tôi muốn mua cái này' },
        { id: 'too_expensive', local: 'Đắt quá' },
        { id: 'can_you_help', local: 'Bạn có thể giúp tôi không?' },
        { id: 'fitting_room', local: 'Phòng thử đồ ở đâu?' },
        { id: 'just_looking', local: 'Tôi chỉ xem thôi, cảm ơn' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Cho tôi xem thực đơn' },
        { id: 'table_for_two', local: 'Một bàn cho hai người' },
        { id: 'bill', local: 'Tính tiền, làm ơn' },
        { id: 'water', local: 'Cho tôi nước' },
        { id: 'reservation', local: 'Tôi đã đặt chỗ' },
        { id: 'delicious', local: 'Ngon' },
        { id: 'bathroom', local: 'Nhà vệ sinh ở đâu?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Cứu tôi!' },
        { id: 'need_doctor', local: 'Tôi cần bác sĩ' },
        { id: 'call_police', local: 'Gọi cảnh sát' },
        { id: 'hospital', local: 'Bệnh viện ở đâu?' },
        { id: 'lost_passport', local: 'Tôi làm mất hộ chiếu' },
        { id: 'emergency', local: 'Đây là trường hợp khẩn cấp' },
        { id: 'embassy', local: 'Đại sứ quán ở đâu?' },
      ]
    }
  ],
  KO: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: '안녕하세요 (Annyeonghaseyo)' },
        { id: 'goodbye', local: '안녕히 가세요 (Annyeonghi gaseyo)' },
        { id: 'please', local: '부탁합니다 (Jebal)' },
        { id: 'thank_you', local: '감사합니다 (Gamsahamnida)' },
        { id: 'yes', local: '네 (Ne)' },
        { id: 'no', local: '아니요 (Aniyo)' },
        { id: 'excuse_me', local: '실례합니다 (Sillyehamnida)' },
        { id: 'do_you_speak_english', local: '영어를 하실 수 있나요? (Yeongeohal su isseoyo?)' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: '얼마인가요? (Igeo eolmayeyo?)' },
        { id: 'credit_cards', local: '신용카드 받나요? (Sinyongkadeu doeynayo?)' },
        { id: 'buy_this', local: '이것을 사고 싶어요 (Igeo sago sipeoyo)' },
        { id: 'too_expensive', local: '너무 비싸요 (Neomu bissayo)' },
        { id: 'can_you_help', local: '도와주실 수 있나요? (Dowa jusil su isseoyo?)' },
        { id: 'fitting_room', local: '피팅룸은 어디인가요? (Taleuisil-i eodi isseoyo?)' },
        { id: 'just_looking', local: '구경만 할게요, 감사합니다 (Geunyang boneun geoyeyo, gamsahamnida)' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: '메뉴판을 볼 수 있을까요? (Menyu jom bol su isseulkayo?)' },
        { id: 'table_for_two', local: '두 명 자리 부탁합니다 (Du myeong jari butakdeurimnida)' },
        { id: 'bill', local: '계산서 주세요 (Gyesanseo juseyo)' },
        { id: 'water', local: '물 좀 주세요 (Mul jom juseyo)' },
        { id: 'reservation', local: '예약했습니다 (Yeyakhaesseumnida)' },
        { id: 'delicious', local: '맛있어요 (Masisikseyo)' },
        { id: 'bathroom', local: '화장실은 어디인가요? (Hwajangsil-i eodi isseoyo?)' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: '도와주세요! (Dowa juseyo!)' },
        { id: 'need_doctor', local: '의사가 필요해요 (Uisaga piryohaeyo)' },
        { id: 'call_police', local: '경찰을 불러주세요 (Gyeongchal-eul bulleojuseyo)' },
        { id: 'hospital', local: '병원은 어디인가요? (Byeong-won-i eodi isseoyo?)' },
        { id: 'lost_passport', local: '여권을 잃어버렸어요 (Yeogwon-eul ileobeoryeosseoyo)' },
        { id: 'emergency', local: '응급 상황입니다 (Eunggeup sanghwang-ieyo)' },
        { id: 'embassy', local: '대사관은 어디인가요? (Daesagwan-i eodi isseoyo?)' },
      ]
    }
  ],
  HI: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'नमस्ते' },
        { id: 'goodbye', local: 'अलविदा' },
        { id: 'please', local: 'कृपया' },
        { id: 'thank_you', local: 'धन्यवाद' },
        { id: 'yes', local: 'हाँ' },
        { id: 'no', local: 'नहीं' },
        { id: 'excuse_me', local: 'माफ़ कीजिए' },
        { id: 'do_you_speak_english', local: 'क्या आप अंग्रेज़ी बोलते हैं?' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'यह कितने का है?' },
        { id: 'credit_cards', local: 'क्या आप क्रेडिट कार्ड लेते हैं?' },
        { id: 'buy_this', local: 'मैं यह खरीदना चाहूँगा/चाहूँगी' },
        { id: 'too_expensive', local: 'बहुत महँगा है' },
        { id: 'can_you_help', local: 'क्या आप मेरी मदद कर सकते हैं?' },
        { id: 'fitting_room', local: 'फिटिंग रूम कहाँ है?' },
        { id: 'just_looking', local: 'बस देख रहा/रही हूँ, धन्यवाद' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'क्या मैं मेन्यू देख सकता/सकती हूँ?' },
        { id: 'table_for_two', local: 'दो लोगों के लिए एक मेज़, कृपया' },
        { id: 'bill', local: 'बिल ले आइए' },
        { id: 'water', local: 'पानी, कृपया' },
        { id: 'reservation', local: 'मेरी बुकिंग है' },
        { id: 'delicious', local: 'स्वादिष्ट' },
        { id: 'bathroom', local: 'शौचालय कहाँ है?' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'बचाओ!' },
        { id: 'need_doctor', local: 'मुझे डॉक्टर की ज़रूरत है' },
        { id: 'call_police', local: 'पुलिस को बुलाओ' },
        { id: 'hospital', local: 'अस्पताल कहाँ है?' },
        { id: 'lost_passport', local: 'मेरा पासपोर्ट खो गया है' },
        { id: 'emergency', local: 'यह एक आपात स्थिति है' },
        { id: 'embassy', local: 'दूतावास कहाँ है?' },
      ]
    }
  ]
};
