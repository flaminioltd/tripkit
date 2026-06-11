export interface Phrase {
  id: string;
  local: string;
  phonetic: string;
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
      { id: 'hello', local: 'Hello', phonetic: 'heh-low' },
      { id: 'goodbye', local: 'Goodbye', phonetic: 'good-bye' },
      { id: 'please', local: 'Please', phonetic: 'pleez' },
      { id: 'thank_you', local: 'Thank you', phonetic: 'thangk yoo' },
      { id: 'yes', local: 'Yes', phonetic: 'yes' },
      { id: 'no', local: 'No', phonetic: 'noh' },
      { id: 'excuse_me', local: 'Excuse me', phonetic: 'ex-kyooz mee' },
      { id: 'do_you_speak_english', local: 'Do you speak English?', phonetic: 'doo yoo speek ing-glish' },
    ]
  },
  {
    category: 'Shopping',
    phrases: [
      { id: 'how_much', local: 'How much does this cost?', phonetic: 'how much duz this kawst' },
      { id: 'credit_cards', local: 'Do you take credit cards?', phonetic: 'doo yoo tayk kreh-dit kards' },
      { id: 'buy_this', local: 'I would like to buy this', phonetic: 'eye wood lyk too by this' },
      { id: 'too_expensive', local: 'Too expensive', phonetic: 'too ex-pen-siv' },
      { id: 'can_you_help', local: 'Can you help me?', phonetic: 'kan yoo help mee' },
      { id: 'fitting_room', local: 'Where is the fitting room?', phonetic: 'wair iz the fih-ting room' },
      { id: 'just_looking', local: 'Just looking, thanks', phonetic: 'just loo-king thangks' },
    ]
  },
  {
    category: 'Hotel & Dining',
    phrases: [
      { id: 'menu', local: 'Can I see the menu?', phonetic: 'kan eye see the meh-nyoo' },
      { id: 'table_for_two', local: 'A table for two, please', phonetic: 'uh tay-buhl for too pleez' },
      { id: 'bill', local: 'The bill, please', phonetic: 'the bil pleez' },
      { id: 'water', local: 'Water, please', phonetic: 'wah-ter pleez' },
      { id: 'reservation', local: 'I have a reservation', phonetic: 'eye hav uh reh-zer-vay-shun' },
      { id: 'delicious', local: 'Delicious', phonetic: 'deh-lih-shus' },
      { id: 'bathroom', local: 'Where is the bathroom?', phonetic: 'wair iz the bath-room' },
    ]
  },
  {
    category: 'Emergencies',
    phrases: [
      { id: 'help', local: 'Help!', phonetic: 'help' },
      { id: 'need_doctor', local: 'I need a doctor', phonetic: 'eye need uh dok-ter' },
      { id: 'call_police', local: 'Call the police', phonetic: 'kall the puh-lees' },
      { id: 'hospital', local: 'Where is the hospital?', phonetic: 'wair iz the hos-pih-tal' },
      { id: 'lost_passport', local: 'I lost my passport', phonetic: 'eye lawst my pass-port' },
      { id: 'emergency', local: 'It\'s an emergency', phonetic: 'its an ee-mer-jen-see' },
      { id: 'embassy', local: 'Where is the embassy?', phonetic: 'wair iz the em-buh-see' },
    ]
  }
];

export const PHRASES_DATA: Record<string, PhraseCategory[]> = {
  EN: englishPhrases,
  FR: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Bonjour', phonetic: 'bohn-zhoor' },
        { id: 'goodbye', local: 'Au revoir', phonetic: 'oh ruh-vwahr' },
        { id: 'please', local: 'S\'il vous plaît', phonetic: 'seel voo play' },
        { id: 'thank_you', local: 'Merci', phonetic: 'mair-see' },
        { id: 'yes', local: 'Oui', phonetic: 'wee' },
        { id: 'no', local: 'Non', phonetic: 'nohn' },
        { id: 'excuse_me', local: 'Excusez-moi', phonetic: 'ex-kew-zay mwah' },
        { id: 'do_you_speak_english', local: 'Parlez-vous anglais ?', phonetic: 'par-lay voo ahn-glay' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Combien ça coûte ?', phonetic: 'kohm-byan sa koot' },
        { id: 'credit_cards', local: 'Acceptez-vous les cartes de crédit ?', phonetic: 'ahk-sep-tay voo lay kahrt duh kray-dee' },
        { id: 'buy_this', local: 'Je voudrais acheter ça', phonetic: 'zhuh voo-dray ah-shuh-tay sa' },
        { id: 'too_expensive', local: 'Trop cher', phonetic: 'troh shair' },
        { id: 'can_you_help', local: 'Pouvez-vous m\'aider ?', phonetic: 'poo-vay voo may-day' },
        { id: 'fitting_room', local: 'Où sont les cabines d\'essayage ?', phonetic: 'oo sohn lay kah-been des-say-yahzh' },
        { id: 'just_looking', local: 'Je regarde seulement, merci', phonetic: 'zhuh ruh-gard suhl-mahn mair-see' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Puis-je voir le menu ?', phonetic: 'pweezh vwahr luh muh-new' },
        { id: 'table_for_two', local: 'Une table pour deux, s\'il vous plaît', phonetic: 'ewn tah-bluh poor duh seel voo play' },
        { id: 'bill', local: 'L\'addition, s\'il vous plaît', phonetic: 'lah-dee-syohn seel voo play' },
        { id: 'water', local: 'De l\'eau, s\'il vous plaît', phonetic: 'duh loh seel voo play' },
        { id: 'reservation', local: 'J\'ai une réservation', phonetic: 'zhay ewn ray-zair-vah-syohn' },
        { id: 'delicious', local: 'Délicieux', phonetic: 'day-lee-syuh' },
        { id: 'bathroom', local: 'Où sont les toilettes ?', phonetic: 'oo sohn lay twah-let' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Au secours !', phonetic: 'oh suh-koor' },
        { id: 'need_doctor', local: 'J\'ai besoin d\'un médecin', phonetic: 'zhay buh-zwan dahn mayd-san' },
        { id: 'call_police', local: 'Appelez la police', phonetic: 'ah-puh-lay lah poh-lees' },
        { id: 'hospital', local: 'Où est l\'hôpital ?', phonetic: 'oo eh loh-pee-tahl' },
        { id: 'lost_passport', local: 'J\'ai perdu mon passeport', phonetic: 'zhay pair-dew mohn pahs-pohr' },
        { id: 'emergency', local: 'C\'est une urgence', phonetic: 'set ewn oor-zhahns' },
        { id: 'embassy', local: 'Où est l\'ambassade ?', phonetic: 'oo eh lahm-bah-sahd' },
      ]
    }
  ],
  ES: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hola', phonetic: 'oh-lah' },
        { id: 'goodbye', local: 'Adiós', phonetic: 'ah-dyohs' },
        { id: 'please', local: 'Por favor', phonetic: 'por fah-vor' },
        { id: 'thank_you', local: 'Gracias', phonetic: 'grah-syahs' },
        { id: 'yes', local: 'Sí', phonetic: 'see' },
        { id: 'no', local: 'No', phonetic: 'noh' },
        { id: 'excuse_me', local: 'Disculpe', phonetic: 'dees-kool-peh' },
        { id: 'do_you_speak_english', local: '¿Habla inglés?', phonetic: 'ah-blah een-glehs' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: '¿Cuánto cuesta esto?', phonetic: 'kwahn-toh kwes-tah es-toh' },
        { id: 'credit_cards', local: '¿Aceptan tarjetas de crédito?', phonetic: 'ah-sep-tahn tar-heh-tahs deh kreh-dee-toh' },
        { id: 'buy_this', local: 'Me gustaría comprar esto', phonetic: 'meh goos-tah-ree-ah kom-prar es-toh' },
        { id: 'too_expensive', local: 'Demasiado caro', phonetic: 'deh-mah-syah-doh kah-roh' },
        { id: 'can_you_help', local: '¿Puede ayudarme?', phonetic: 'pweh-deh ah-yoo-dar-meh' },
        { id: 'fitting_room', local: '¿Dónde están los probadores?', phonetic: 'dohn-deh es-tahn lohs proh-bah-doh-rehs' },
        { id: 'just_looking', local: 'Sólo estoy mirando, gracias', phonetic: 'soh-loh es-toy mee-rahn-doh grah-syahs' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: '¿Puedo ver el menú?', phonetic: 'pweh-doh ver el meh-noo' },
        { id: 'table_for_two', local: 'Una mesa para dos, por favor', phonetic: 'oo-nah meh-sah pah-rah dohs por fah-vor' },
        { id: 'bill', local: 'La cuenta, por favor', phonetic: 'lah kwen-tah por fah-vor' },
        { id: 'water', local: 'Agua, por favor', phonetic: 'ah-gwah por fah-vor' },
        { id: 'reservation', local: 'Tengo una reserva', phonetic: 'ten-goh oo-nah reh-ser-vah' },
        { id: 'delicious', local: 'Delicioso', phonetic: 'deh-lee-syoh-soh' },
        { id: 'bathroom', local: '¿Dónde está el baño?', phonetic: 'dohn-deh es-tah el bah-nyoh' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: '¡Ayuda!', phonetic: 'ah-yoo-dah' },
        { id: 'need_doctor', local: 'Necesito un médico', phonetic: 'neh-seh-see-toh oon meh-dee-koh' },
        { id: 'call_police', local: 'Llame a la policía', phonetic: 'yah-meh ah lah poh-lee-see-ah' },
        { id: 'hospital', local: '¿Dónde está el hospital?', phonetic: 'dohn-deh es-tah el os-pee-tahl' },
        { id: 'lost_passport', local: 'He perdido mi pasaporte', phonetic: 'eh per-dee-doh mee pah-sah-por-teh' },
        { id: 'emergency', local: 'Es una emergencia', phonetic: 'es oo-nah eh-mer-hen-syah' },
        { id: 'embassy', local: '¿Dónde está la embajada?', phonetic: 'dohn-deh es-tah lah em-bah-hah-dah' },
      ]
    }
  ],
  IT: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Ciao', phonetic: 'chow' },
        { id: 'goodbye', local: 'Arrivederci', phonetic: 'ah-ree-veh-dair-chee' },
        { id: 'please', local: 'Per favore', phonetic: 'pair fah-voh-reh' },
        { id: 'thank_you', local: 'Grazie', phonetic: 'graht-see-eh' },
        { id: 'yes', local: 'Sì', phonetic: 'see' },
        { id: 'no', local: 'No', phonetic: 'noh' },
        { id: 'excuse_me', local: 'Mi scusi', phonetic: 'mee skoo-zee' },
        { id: 'do_you_speak_english', local: 'Parla inglese?', phonetic: 'par-lah een-gleh-zeh' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Quanto costa questo?', phonetic: 'kwahn-toh koh-stah kwes-toh' },
        { id: 'credit_cards', local: 'Accettate carte di credito?', phonetic: 'ah-chet-tah-teh car-teh dee kreh-dee-toh' },
        { id: 'buy_this', local: 'Vorrei comprare questo', phonetic: 'vor-ray kohm-prah-reh kwes-toh' },
        { id: 'too_expensive', local: 'Troppo caro', phonetic: 'trop-poh kah-roh' },
        { id: 'can_you_help', local: 'Può aiutarmi?', phonetic: 'pwoh ah-yoo-tar-mee' },
        { id: 'fitting_room', local: 'Dov\'è il camerino?', phonetic: 'doh-veh eel kah-meh-ree-noh' },
        { id: 'just_looking', local: 'Sto solo guardando, grazie', phonetic: 'stoh soh-loh gwar-dahn-doh graht-see-eh' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Posso vedere il menù?', phonetic: 'pos-soh veh-deh-reh eel meh-noo' },
        { id: 'table_for_two', local: 'Un tavolo per due, per favore', phonetic: 'oon tah-voh-loh pair doo-eh pair fah-voh-reh' },
        { id: 'bill', local: 'Il conto, per favore', phonetic: 'eel kohn-toh pair fah-voh-reh' },
        { id: 'water', local: 'Acqua, per favore', phonetic: 'ahk-kwah pair fah-voh-reh' },
        { id: 'reservation', local: 'Ho una prenotazione', phonetic: 'oh oo-nah preh-noh-tah-tsee-oh-neh' },
        { id: 'delicious', local: 'Delizioso', phonetic: 'deh-lee-tsee-oh-zoh' },
        { id: 'bathroom', local: 'Dov\'è il bagno?', phonetic: 'doh-veh eel bah-nyoh' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Aiuto!', phonetic: 'ah-yoo-toh' },
        { id: 'need_doctor', local: 'Ho bisogno di un medico', phonetic: 'oh bee-zoh-nyoh dee oon meh-dee-koh' },
        { id: 'call_police', local: 'Chiami la polizia', phonetic: 'kyah-mee lah poh-lee-tsee-ah' },
        { id: 'hospital', local: 'Dov\'è l\'ospedale?', phonetic: 'doh-veh los-peh-dah-leh' },
        { id: 'lost_passport', local: 'Ho perso il passaporto', phonetic: 'oh pair-soh eel pahs-sah-por-toh' },
        { id: 'emergency', local: 'È un\'emergenza', phonetic: 'eh oon eh-mair-jen-tsah' },
        { id: 'embassy', local: 'Dov\'è l\'ambasciata?', phonetic: 'doh-veh lahm-bah-shah-tah' },
      ]
    }
  ],
  DE: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hallo', phonetic: 'hah-loh' },
        { id: 'goodbye', local: 'Auf Wiedersehen', phonetic: 'owf vee-der-zayn' },
        { id: 'please', local: 'Bitte', phonetic: 'bih-tuh' },
        { id: 'thank_you', local: 'Danke', phonetic: 'dahn-kuh' },
        { id: 'yes', local: 'Ja', phonetic: 'yah' },
        { id: 'no', local: 'Nein', phonetic: 'nine' },
        { id: 'excuse_me', local: 'Entschuldigung', phonetic: 'ent-shool-dee-goong' },
        { id: 'do_you_speak_english', local: 'Sprechen Sie Englisch?', phonetic: 'shpreh-khen zee eng-lish' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Wie viel kostet das?', phonetic: 'vee feel kaws-tet dahs' },
        { id: 'credit_cards', local: 'Akzeptieren Sie Kreditkarten?', phonetic: 'ahk-tsep-tee-ren zee kreh-deet-kar-ten' },
        { id: 'buy_this', local: 'Ich würde das gerne kaufen', phonetic: 'ikh voor-duh dahs gair-nuh kow-fen' },
        { id: 'too_expensive', local: 'Zu teuer', phonetic: 'tsoo toy-er' },
        { id: 'can_you_help', local: 'Können Sie mir helfen?', phonetic: 'kur-nen zee meer hel-fen' },
        { id: 'fitting_room', local: 'Wo ist die Umkleidekabine?', phonetic: 'voh ist dee oom-kly-duh-kah-bee-nuh' },
        { id: 'just_looking', local: 'Ich schaue nur, danke', phonetic: 'ikh show-uh noor dahn-kuh' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Kann ich die Speisekarte sehen?', phonetic: 'kahn ikh dee shpy-zuh-kar-tuh zayn' },
        { id: 'table_for_two', local: 'Einen Tisch für zwei, bitte', phonetic: 'eye-nen tish foor tsvy bih-tuh' },
        { id: 'bill', local: 'Die Rechnung, bitte', phonetic: 'dee rekh-noong bih-tuh' },
        { id: 'water', local: 'Wasser, bitte', phonetic: 'vah-ser bih-tuh' },
        { id: 'reservation', local: 'Ich habe eine Reservierung', phonetic: 'ikh hah-buh eye-nuh reh-zer-vee-roong' },
        { id: 'delicious', local: 'Lecker', phonetic: 'leh-ker' },
        { id: 'bathroom', local: 'Wo ist die Toilette?', phonetic: 'voh ist dee twah-leh-tuh' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Hilfe!', phonetic: 'hil-fuh' },
        { id: 'need_doctor', local: 'Ich brauche einen Arzt', phonetic: 'ikh brow-khuh eye-nen ahrtst' },
        { id: 'call_police', local: 'Rufen Sie die Polizei', phonetic: 'roo-fen zee dee poh-lee-tsy' },
        { id: 'hospital', local: 'Wo ist das Krankenhaus?', phonetic: 'voh ist dahs krahn-ken-hows' },
        { id: 'lost_passport', local: 'Ich habe meinen Reisepass verloren', phonetic: 'ikh hah-buh my-nen ry-zuh-pahs fer-loh-ren' },
        { id: 'emergency', local: 'Es ist ein Notfall', phonetic: 'es ist eye-n noht-fahl' },
        { id: 'embassy', local: 'Wo ist die Botschaft?', phonetic: 'voh ist dee boht-shahft' },
      ]
    }
  ],
  JA: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'こんにちは (Konnichiwa)', phonetic: 'kohn-nee-chee-wah' },
        { id: 'goodbye', local: 'さようなら (Sayounara)', phonetic: 'sah-yoh-nah-rah' },
        { id: 'please', local: 'お願いします (Onegaishimasu)', phonetic: 'oh-neh-guy-shee-mahs' },
        { id: 'thank_you', local: 'ありがとうございます (Arigatou gozaimasu)', phonetic: 'ah-ree-gah-toh goh-zy-mahs' },
        { id: 'yes', local: 'はい (Hai)', phonetic: 'hai' },
        { id: 'no', local: 'いいえ (Iie)', phonetic: 'ee-eh' },
        { id: 'excuse_me', local: 'すみません (Sumimasen)', phonetic: 'soo-mee-mah-sen' },
        { id: 'do_you_speak_english', local: '英語を話せますか？ (Eigo o hanasemasu ka?)', phonetic: 'ay-goh oh hah-nah-seh-mahs kah' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'これはいくらですか？ (Kore wa ikura desu ka?)', phonetic: 'koh-reh wah ee-koo-rah des kah' },
        { id: 'credit_cards', local: 'クレジットカードは使えますか？ (Kurejitto kaado wa tsukaemasu ka?)', phonetic: 'koo-reh-jit-toh kah-doh wah tsoo-kah-eh-mahs kah' },
        { id: 'buy_this', local: 'これを買いたいです (Kore o kaitai desu)', phonetic: 'koh-reh oh ky-ty des' },
        { id: 'too_expensive', local: '高すぎます (Takasugimasu)', phonetic: 'tah-kah-soo-gee-mahs' },
        { id: 'can_you_help', local: '手伝ってくれますか？ (Tetsudatte kuremasu ka?)', phonetic: 'teh-tsoo-daht-teh koo-reh-mahs kah' },
        { id: 'fitting_room', local: '試着室はどこですか？ (Shichakushitsu wa doko desu ka?)', phonetic: 'shee-chah-koo-sheets-soo wah doh-koh des kah' },
        { id: 'just_looking', local: '見ているだけです、ありがとう (Miteiru dake desu, arigatou)', phonetic: 'mee-teh-ee-roo dah-keh des, ah-ree-gah-toh' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'メニューを見せてください (Menyuu o misete kudasai)', phonetic: 'meh-nyoo oh mee-seh-teh koo-dah-sy' },
        { id: 'table_for_two', local: '2人用の席をお願いします (Futari-you no seki o onegaishimasu)', phonetic: 'foo-tah-ree-yoh noh seh-kee oh oh-neh-guy-shee-mahs' },
        { id: 'bill', local: 'お会計をお願いします (Okaikei o onegaishimasu)', phonetic: 'oh-ky-kay oh oh-neh-guy-shee-mahs' },
        { id: 'water', local: 'お水をお願いします (Omizu o onegaishimasu)', phonetic: 'oh-mee-zoo oh oh-neh-guy-shee-mahs' },
        { id: 'reservation', local: '予約しています (Yoyaku shite imasu)', phonetic: 'yoh-yah-koo shee-teh ee-mahs' },
        { id: 'delicious', local: '美味しい (Oishii)', phonetic: 'oh-ee-shee' },
        { id: 'bathroom', local: 'トイレはどこですか？ (Toire wa doko desu ka?)', phonetic: 'toy-reh wah doh-koh des kah' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: '助けて！ (Tasukete!)', phonetic: 'tahs-keh-teh' },
        { id: 'need_doctor', local: '医者が必要です (Isha ga hitsuyou desu)', phonetic: 'ee-shah gah hee-tsoo-yoh des' },
        { id: 'call_police', local: '警察を呼んでください (Keisatsu o yonde kudasai)', phonetic: 'kay-saht-soo oh yohn-deh koo-dah-sy' },
        { id: 'hospital', local: '病院はどこですか？ (Byouin wa doko desu ka?)', phonetic: 'byoh-een wah doh-koh des kah' },
        { id: 'lost_passport', local: 'パスポートをなくしました (Pasupooto o nakushimashita)', phonetic: 'pahs-poh-toh oh nah-koo-shee-mah-shee-tah' },
        { id: 'emergency', local: '緊急事態です (Kinkyuu jitai desu)', phonetic: 'keen-kyoo jee-ty des' },
        { id: 'embassy', local: '大使館はどこですか？ (Taishikan wa doko desu ka?)', phonetic: 'ty-shee-kahn wah doh-koh des kah' },
      ]
    }
  ],
  PT: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Olá', phonetic: 'oh-lah' },
        { id: 'goodbye', local: 'Adeus', phonetic: 'ah-deus' },
        { id: 'please', local: 'Por favor', phonetic: 'por fah-vor' },
        { id: 'thank_you', local: 'Obrigado', phonetic: 'oh-bree-gah-doo' },
        { id: 'yes', local: 'Sim', phonetic: 'seem' },
        { id: 'no', local: 'Não', phonetic: 'nown' },
        { id: 'excuse_me', local: 'Com licença', phonetic: 'kom lee-sen-sah' },
        { id: 'do_you_speak_english', local: 'Você fala inglês?', phonetic: 'vo-seh fah-lah een-gles' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Quanto custa isso?', phonetic: 'kwahn-too koos-tah ee-soo' },
        { id: 'credit_cards', local: 'Aceitam cartões de crédito?', phonetic: 'ah-say-tão kar-tõis de kre-dee-too' },
        { id: 'buy_this', local: 'Eu gostaria de comprar isso', phonetic: 'eyo goos-tah-ree-ah de kom-prar ee-soo' },
        { id: 'too_expensive', local: 'Muito caro', phonetic: 'mwee-too kah-roo' },
        { id: 'can_you_help', local: 'Pode me ajudar?', phonetic: 'poh-de me ah-joo-dar' },
        { id: 'fitting_room', local: 'Onde fica o provador?', phonetic: 'ohn-de fee-kah o pro-vah-dor' },
        { id: 'just_looking', local: 'Só estou olhando, obrigado', phonetic: 'so es-toh o-lyan-doo, oh-bree-gah-doo' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Posso ver o cardápio?', phonetic: 'pos-soo ver o kar-dah-pee-oo' },
        { id: 'table_for_two', local: 'Uma mesa para dois, por favor', phonetic: 'oo-mah me-zah pah-rah doys, por fah-vor' },
        { id: 'bill', local: 'A conta, por favor', phonetic: 'ah kon-tah, por fah-vor' },
        { id: 'water', local: 'Água, por favor', phonetic: 'ah-gwah, por fah-vor' },
        { id: 'reservation', local: 'Eu tenho uma reserva', phonetic: 'eyo te-nyo oo-mah re-zer-vah' },
        { id: 'delicious', local: 'Delicioso', phonetic: 'de-lee-see-oh-zoo' },
        { id: 'bathroom', local: 'Onde fica o banheiro?', phonetic: 'ohn-de fee-kah o bah-nyei-roo' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Socorro!', phonetic: 'so-koh-roo' },
        { id: 'need_doctor', local: 'Preciso de um médico', phonetic: 'pre-see-zoo de oom me-dee-koo' },
        { id: 'call_police', local: 'Ligue para a polícia', phonetic: 'lee-ge pah-rah a po-lee-see-ah' },
        { id: 'hospital', local: 'Onde fica o hospital?', phonetic: 'ohn-de fee-kah o os-pee-tal' },
        { id: 'lost_passport', local: 'Perdi meu passaporte', phonetic: 'per-dee meo pas-sah-por-te' },
        { id: 'emergency', local: 'É uma emergência', phonetic: 'eh oo-mah e-mer-jen-see-ah' },
        { id: 'embassy', local: 'Onde fica a embaixada?', phonetic: 'ohn-de fee-kah a em-by-shah-dah' },
      ]
    }
  ],
  TR: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Merhaba', phonetic: 'mer-hah-bah' },
        { id: 'goodbye', local: 'Hoşça kal', phonetic: 'hosh-chah kahl' },
        { id: 'please', local: 'Lütfen', phonetic: 'loot-fen' },
        { id: 'thank_you', local: 'Teşekkür ederim', phonetic: 'te-shek-koor e-de-reem' },
        { id: 'yes', local: 'Evet', phonetic: 'e-vet' },
        { id: 'no', local: 'Hayır', phonetic: 'hah-yur' },
        { id: 'excuse_me', local: 'Afedersiniz', phonetic: 'ah-fe-der-si-niz' },
        { id: 'do_you_speak_english', local: 'İngilizce biliyor musunuz?', phonetic: 'een-gee-leez-je bee-lee-yor moo-soo-nooz' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Bu ne kadar?', phonetic: 'boo ne kah-dar' },
        { id: 'credit_cards', local: 'Kredi kartı kabul ediyor musunuz?', phonetic: 'kre-dee kar-tuh kah-bool e-dee-yor moo-soo-nooz' },
        { id: 'buy_this', local: 'Bunu almak istiyorum', phonetic: 'boo-noo ahl-mak ees-tee-yo-room' },
        { id: 'too_expensive', local: 'Çok pahalı', phonetic: 'chok pah-hah-luh' },
        { id: 'can_you_help', local: 'Bana yardım edebilir misiniz?', phonetic: 'bah-nah yar-dum e-de-bee-leer mee-see-neez' },
        { id: 'fitting_room', local: 'Deneme kabini nerede?', phonetic: 'de-ne-me kah-bee-nee ne-re-de' },
        { id: 'just_looking', local: 'Sadece bakıyorum, teşekkürler', phonetic: 'sah-de-je bah-kuh-yo-room, te-shek-koor-ler' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Menüyü görebilir miyim?', phonetic: 'me-noo-yoo gur-e-bee-leer mee-yeem' },
        { id: 'table_for_two', local: 'İki kişilik bir masa lütfen', phonetic: 'ee-kee kee-shee-leek beer mah-sah loot-fen' },
        { id: 'bill', local: 'Hesap lütfen', phonetic: 'he-sahp loot-fen' },
        { id: 'water', local: 'Su lütfen', phonetic: 'soo loot-fen' },
        { id: 'reservation', local: 'Rezervasyonum var', phonetic: 're-zer-vahs-yo-noom var' },
        { id: 'delicious', local: 'Lezzetli', phonetic: 'lez-zet-lee' },
        { id: 'bathroom', local: 'Tuvalet nerede?', phonetic: 'too-vah-let ne-re-de' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'İmdat!', phonetic: 'eem-daht' },
        { id: 'need_doctor', local: 'Doktora ihtiyacım var', phonetic: 'dok-to-rah eeh-tee-yah-jum var' },
        { id: 'call_police', local: 'Polisi arayın', phonetic: 'po-lee-see ah-rah-yun' },
        { id: 'hospital', local: 'Hastane nerede?', phonetic: 'hahs-tah-ne ne-re-de' },
        { id: 'lost_passport', local: 'Pasaportumu kaybettim', phonetic: 'pah-sah-por-too-moo ky-bet-teem' },
        { id: 'emergency', local: 'Bu bir acil durum', phonetic: 'boo beer ah-jeel doo-room' },
        { id: 'embassy', local: 'Büyükelçilik nerede?', phonetic: 'boo-yook-el-chee-leek ne-re-de' },
      ]
    }
  ],
  EL: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Γειά σου (Yia sou)', phonetic: 'yah soo' },
        { id: 'goodbye', local: 'Αντίο (Antio)', phonetic: 'ahn-dee-oh' },
        { id: 'please', local: 'Παρακαλώ (Parakalo)', phonetic: 'pah-rah-kah-loh' },
        { id: 'thank_you', local: 'Ευχαριστώ (Efcharisto)', phonetic: 'ef-hah-rees-toh' },
        { id: 'yes', local: 'Ναι (Ne)', phonetic: 'neh' },
        { id: 'no', local: 'Όχι (Ohi)', phonetic: 'oh-hee' },
        { id: 'excuse_me', local: 'Συγγνώμη (Signomi)', phonetic: 'seeg-noh-mee' },
        { id: 'do_you_speak_english', local: 'Μιλάτε αγγλικά; (Milate agglika?)', phonetic: 'mee-lah-teh ah-glee-kah' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Πόσο κοστίζει αυτό; (Poso kostizei afto?)', phonetic: 'poh-soh koh-stee-zee af-toh' },
        { id: 'credit_cards', local: 'Δέχεστε πιστωτικές κάρτες; (Decheste pistotikes kartes?)', phonetic: 'deh-hes-teh pees-toh-tee-kes kar-tes' },
        { id: 'buy_this', local: 'Θα ήθελα να το αγοράσω (Tha ithela na to agoraso)', phonetic: 'thah ee-the-lah nah toh ah-goh-rah-soh' },
        { id: 'too_expensive', local: 'Πολύ ακριβό (Poly akrivo)', phonetic: 'poh-lee ah-kree-voh' },
        { id: 'can_you_help', local: 'Μπορείτε να με βοηθήσετε; (Boreite na me voithisete?)', phonetic: 'boh-ree-teh nah meh voy-thee-seh-teh' },
        { id: 'fitting_room', local: 'Πού είναι το δοκιμαστήριο; (Pou einai to dokimastirio?)', phonetic: 'poo ee-neh toh doh-kee-mah-stee-ryoh' },
        { id: 'just_looking', local: 'Απλά κοιτάζω, ευχαριστώ (Apla koitazo, efcharisto)', phonetic: 'ah-plah kee-tah-zoh, ef-hah-rees-toh' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Μπορώ να δω το μενού; (Boro na do to menou?)', phonetic: 'boh-roh nah doh toh meh-noo' },
        { id: 'table_for_two', local: 'Ένα τραπέζι για δύο, παρακαλώ (Ena trapezi gia dyo, parakalo)', phonetic: 'eh-nah trah-peh-zee yah dee-oh, pah-rah-kah-loh' },
        { id: 'bill', local: 'Το λογαριασμό, παρακαλώ (To logariasmo, parakalo)', phonetic: 'toh loh-gah-ryahs-moh, pah-rah-kah-loh' },
        { id: 'water', local: 'Νερό, παρακαλώ (Nero, parakalo)', phonetic: 'neh-roh, pah-rah-kah-loh' },
        { id: 'reservation', local: 'Έχω κάνει κράτηση (Echo kanei kratisi)', phonetic: 'eh-ho kah-nee krah-tee-see' },
        { id: 'delicious', local: 'Νόστιμο (Nostimo)', phonetic: 'noh-stee-moh' },
        { id: 'bathroom', local: 'Πού είναι η τουαλέτα; (Pou einai i toualeta?)', phonetic: 'poo ee-neh ee twah-leh-tah' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Βοήθεια! (Voitheia!)', phonetic: 'voy-thee-ah' },
        { id: 'need_doctor', local: 'Χρειάζομαι γιατρό (Chreiazomai giatro)', phonetic: 'hree-ah-zoh-meh yah-troh' },
        { id: 'call_police', local: 'Καλέστε την αστυνομία (Kaleste tin astynomia)', phonetic: 'kah-les-teh teen ah-stee-noh-mee-ah' },
        { id: 'hospital', local: 'Πού είναι το νοσοκομείο; (Pou einai to nosokomeio?)', phonetic: 'poo ee-neh toh noh-soh-koh-mee-oh' },
        { id: 'lost_passport', local: 'Έχασα το διαβατήριό μου (Echasa to diavatirio mou)', phonetic: 'eh-hah-sah toh dyah-vah-tee-ryoh moo' },
        { id: 'emergency', local: 'Είναι επείγον (Einai epeigon)', phonetic: 'ee-neh eh-pee-gon' },
        { id: 'embassy', local: 'Πού είναι η πρεσβεία; (Pou einai i presveia?)', phonetic: 'poo ee-neh ee pres-vee-ah' },
      ]
    }
  ],
  NL: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hallo', phonetic: 'hah-loh' },
        { id: 'goodbye', local: 'Tot ziens', phonetic: 'tot zeens' },
        { id: 'please', local: 'Alstublieft', phonetic: 'ahl-stoo-bleeft' },
        { id: 'thank_you', local: 'Dank u', phonetic: 'dahnk oo' },
        { id: 'yes', local: 'Ja', phonetic: 'yah' },
        { id: 'no', local: 'Nee', phonetic: 'nay' },
        { id: 'excuse_me', local: 'Pardon', phonetic: 'par-don' },
        { id: 'do_you_speak_english', local: 'Spreekt u Engels?', phonetic: 'spraykt oo eng-els' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Hoeveel kost dit?', phonetic: 'hoo-veyl kost dit' },
        { id: 'credit_cards', local: 'Accepteert u creditcards?', phonetic: 'ak-sep-tayrt oo kre-dit-karts' },
        { id: 'buy_this', local: 'Ik wil dit graag kopen', phonetic: 'ik wil dit hrah ko-pen' },
        { id: 'too_expensive', local: 'Te duur', phonetic: 'tuh door' },
        { id: 'can_you_help', local: 'Kunt u mij helpen?', phonetic: 'koont oo may hel-pen' },
        { id: 'fitting_room', local: 'Waar is het pashokje?', phonetic: 'vahr is het pas-hok-yuh' },
        { id: 'just_looking', local: 'Ik kijk alleen maar, bedankt', phonetic: 'ik kyk ah-layn mahr, buh-dahnkt' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Mag ik het menu zien?', phonetic: 'mahg ik het meh-noo zeen' },
        { id: 'table_for_two', local: 'Een tafel voor twee, alstublieft', phonetic: 'eyn tah-fel fohr tvay, ahl-stoo-bleeft' },
        { id: 'bill', local: 'De rekening, alstublieft', phonetic: 'duh ray-kuh-ning, ahl-stoo-bleeft' },
        { id: 'water', local: 'Water, alstublieft', phonetic: 'vah-ter, ahl-stoo-bleeft' },
        { id: 'reservation', local: 'Ik heb een reservering', phonetic: 'ik heb eyn ray-zer-vay-ring' },
        { id: 'delicious', local: 'Heerlijk', phonetic: 'hayr-lik' },
        { id: 'bathroom', local: 'Waar is het toilet?', phonetic: 'vahr is het twah-let' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Help!', phonetic: 'help' },
        { id: 'need_doctor', local: 'Ik heb een dokter nodig', phonetic: 'ik heb eyn dok-ter no-dih' },
        { id: 'call_police', local: 'Bel de politie', phonetic: 'bel duh po-lee-tsee' },
        { id: 'hospital', local: 'Waar is het ziekenhuis?', phonetic: 'vahr is het zee-ken-hows' },
        { id: 'lost_passport', local: 'Ik ben mijn paspoort kwijt', phonetic: 'ik ben mayn pas-pohrt kwayt' },
        { id: 'emergency', local: 'Het is een noodgeval', phonetic: 'het is eyn nohd-huh-vahl' },
        { id: 'embassy', local: 'Waar is de ambassade?', phonetic: 'vahr is duh ahm-bah-sah-duh' },
      ]
    }
  ],
  PL: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Dzień dobry', phonetic: 'jen dob-ri' },
        { id: 'goodbye', local: 'Do widzenia', phonetic: 'do vee-dzen-ya' },
        { id: 'please', local: 'Proszę', phonetic: 'pro-sheh' },
        { id: 'thank_you', local: 'Dziękuję', phonetic: 'jen-koo-yeh' },
        { id: 'yes', local: 'Tak', phonetic: 'tahk' },
        { id: 'no', local: 'Nie', phonetic: 'nyeh' },
        { id: 'excuse_me', local: 'Przepraszam', phonetic: 'pshe-prah-sham' },
        { id: 'do_you_speak_english', local: 'Czy mówi pan/pani po angielsku?', phonetic: 'chi moo-vee pan/pah-nee po an-gyel-skoo' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Ile to kosztuje?', phonetic: 'ee-leh to kosh-too-yeh' },
        { id: 'credit_cards', local: 'Czy można płacić kartą?', phonetic: 'chi mozh-nah pwah-cheech kar-tom' },
        { id: 'buy_this', local: 'Chciałbym/Chciałabym to kupić', phonetic: 'hchow-bim/hchow-ah-bim to koo-peech' },
        { id: 'too_expensive', local: 'Za drogo', phonetic: 'za dro-go' },
        { id: 'can_you_help', local: 'Czy może mi pan/pani pomóc?', phonetic: 'chi mo-zhe mee pan/pah-nee po-moots' },
        { id: 'fitting_room', local: 'Gdzie jest przymierzalnia?', phonetic: 'g-jeh yest pshi-myeh-zhal-nya' },
        { id: 'just_looking', local: 'Tylko oglądam, dziękuję', phonetic: 'til-ko o-glon-dam, jen-koo-yeh' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Czy mogę prosić o menu?', phonetic: 'chi mo-geh pro-seech o me-noo' },
        { id: 'table_for_two', local: 'Stolik dla dwóch osób, proszę', phonetic: 'sto-leek dla dvooh o-soop, pro-sheh' },
        { id: 'bill', local: 'Rachunek, proszę', phonetic: 'ra-hoo-nek, pro-sheh' },
        { id: 'water', local: 'Wodę, proszę', phonetic: 'vo-deh, pro-sheh' },
        { id: 'reservation', local: 'Mam rezerwację', phonetic: 'mam re-zer-vats-yeh' },
        { id: 'delicious', local: 'Pyszne', phonetic: 'pish-neh' },
        { id: 'bathroom', local: 'Gdzie jest toaleta?', phonetic: 'g-jeh yest to-a-le-ta' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Pomocy!', phonetic: 'po-mo-tsi' },
        { id: 'need_doctor', local: 'Potrzebuję lekarza', phonetic: 'po-tshe-boo-yeh le-ka-zha' },
        { id: 'call_police', local: 'Proszę wezwać policję', phonetic: 'pro-sheh vez-vach po-leets-yeh' },
        { id: 'hospital', local: 'Gdzie jest szpital?', phonetic: 'g-jeh yest shpee-tal' },
        { id: 'lost_passport', local: 'Zgubiłem/Zgubiłam paszport', phonetic: 'zgoo-bee-wem/zgoo-bee-wam pash-port' },
        { id: 'emergency', local: 'To nagły wypadek', phonetic: 'to nag-wi vi-pa-dek' },
        { id: 'embassy', local: 'Gdzie jest ambasada?', phonetic: 'g-jeh yest am-ba-sa-da' },
      ]
    }
  ],
  HR: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Dobar dan', phonetic: 'doh-bar dahn' },
        { id: 'goodbye', local: 'Doviđenja', phonetic: 'doh-vee-jen-ya' },
        { id: 'please', local: 'Molim', phonetic: 'moh-leem' },
        { id: 'thank_you', local: 'Hvala', phonetic: 'hvah-lah' },
        { id: 'yes', local: 'Da', phonetic: 'dah' },
        { id: 'no', local: 'Ne', phonetic: 'neh' },
        { id: 'excuse_me', local: 'Oprostite', phonetic: 'oh-pros-tee-teh' },
        { id: 'do_you_speak_english', local: 'Govorite li engleski?', phonetic: 'goh-voh-ree-teh lee en-gles-kee' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Koliko ovo košta?', phonetic: 'koh-lee-koh oh-voh kosh-tah' },
        { id: 'credit_cards', local: 'Primate li kreditne kartice?', phonetic: 'pree-mah-teh lee kre-dit-neh kar-tee-tseh' },
        { id: 'buy_this', local: 'Želio/Željela bih ovo kupiti', phonetic: 'zheh-lee-oh/zheh-lyeh-lah beeh oh-voh koo-pee-tee' },
        { id: 'too_expensive', local: 'Preskupo', phonetic: 'pres-koo-poh' },
        { id: 'can_you_help', local: 'Možete li mi pomoći?', phonetic: 'moh-zhe-teh lee mee poh-moh-chee' },
        { id: 'fitting_room', local: 'Gdje je kabina?', phonetic: 'gdyeh yeh kah-bee-nah' },
        { id: 'just_looking', local: 'Samo gledam, hvala', phonetic: 'sah-moh gle-dahm, hvah-lah' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Mogu li vidjeti jelovnik?', phonetic: 'moh-goo lee vee-dye-tee ye-lov-neek' },
        { id: 'table_for_two', local: 'Stol za dvoje, molim', phonetic: 'stohl zah dvo-yeh, moh-leem' },
        { id: 'bill', local: 'Račun, molim', phonetic: 'rah-choon, moh-leem' },
        { id: 'water', local: 'Vodu, molim', phonetic: 'voh-doo, moh-leem' },
        { id: 'reservation', local: 'Imam rezervaciju', phonetic: 'ee-mahm re-zer-vah-tsee-yoo' },
        { id: 'delicious', local: 'Ukusno', phonetic: 'oo-koos-noh' },
        { id: 'bathroom', local: 'Gdje je WC?', phonetic: 'gdyeh yeh ve-tse' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Upomoć!', phonetic: 'oo-poh-moch' },
        { id: 'need_doctor', local: 'Trebam doktora', phonetic: 'tre-bahm dok-toh-rah' },
        { id: 'call_police', local: 'Zovite policiju', phonetic: 'zoh-vee-teh poh-lee-tsee-yoo' },
        { id: 'hospital', local: 'Gdje je bolnica?', phonetic: 'gdyeh yeh bol-nee-tsah' },
        { id: 'lost_passport', local: 'Izgubio/Izgubila sam putovnicu', phonetic: 'eez-goo-bee-oh/eez-goo-bee-lah sahm poo-tov-nee-tsoo' },
        { id: 'emergency', local: 'Hitan slučaj', phonetic: 'hee-tahn sloo-chy' },
        { id: 'embassy', local: 'Gdje je ambasada?', phonetic: 'gdyeh yeh ahm-bah-sah-dah' },
      ]
    }
  ],
  CS: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Dobrý den', phonetic: 'doh-bree den' },
        { id: 'goodbye', local: 'Na shledanou', phonetic: 'nah skhle-dah-noh' },
        { id: 'please', local: 'Prosím', phonetic: 'pro-seem' },
        { id: 'thank_you', local: 'Děkuji', phonetic: 'dye-koo-yee' },
        { id: 'yes', local: 'Ano', phonetic: 'ah-noh' },
        { id: 'no', local: 'Ne', phonetic: 'neh' },
        { id: 'excuse_me', local: 'Promiňte', phonetic: 'pro-meen-teh' },
        { id: 'do_you_speak_english', local: 'Mluvíte anglicky?', phonetic: 'mloo-vee-teh ahn-gleets-kee' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Kolik to stojí?', phonetic: 'koh-leek toh stoh-yee' },
        { id: 'credit_cards', local: 'Berete kreditní karty?', phonetic: 'be-re-te kre-deet-nee kar-tih' },
        { id: 'buy_this', local: 'Rád(a) bych si to koupil(a)', phonetic: 'rahd(-ah) bikh see toh kow-peel(-ah)' },
        { id: 'too_expensive', local: 'Příliš drahé', phonetic: 'pshee-leesh drah-heh' },
        { id: 'can_you_help', local: 'Můžete mi pomoci?', phonetic: 'moo-zhe-te mee po-mo-tsee' },
        { id: 'fitting_room', local: 'Kde je zkušební kabinka?', phonetic: 'gde ye zkoo-sheb-nee kah-been-kah' },
        { id: 'just_looking', local: 'Jen se dívám, děkuji', phonetic: 'yen se dee-vahm, dye-koo-yee' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Mohu vidět jídelní lístek?', phonetic: 'mo-hoo vee-dyet yee-del-nee lees-tek' },
        { id: 'table_for_two', local: 'Stůl pro dva, prosím', phonetic: 'stool pro dvah, pro-seem' },
        { id: 'bill', local: 'Účet, prosím', phonetic: 'oo-chet, pro-seem' },
        { id: 'water', local: 'Vodu, prosím', phonetic: 'vo-doo, pro-seem' },
        { id: 'reservation', local: 'Mám rezervaci', phonetic: 'mahm re-zer-vah-tsee' },
        { id: 'delicious', local: 'Vynikající', phonetic: 'vee-nee-kah-yee-tsee' },
        { id: 'bathroom', local: 'Kde je toaleta?', phonetic: 'gde ye toh-ah-le-tah' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Pomoc!', phonetic: 'po-mots' },
        { id: 'need_doctor', local: 'Potřebuji doktora', phonetic: 'po-tshe-boo-yee dok-to-rah' },
        { id: 'call_police', local: 'Zavolejte policii', phonetic: 'zah-vo-ley-te po-lee-tsee-yee' },
        { id: 'hospital', local: 'Kde je nemocnice?', phonetic: 'gde ye ne-mots-nee-tse' },
        { id: 'lost_passport', local: 'Ztratil(a) jsem pas', phonetic: 'ztrah-teel(-ah) sem pas' },
        { id: 'emergency', local: 'Je to nouzová situace', phonetic: 'ye toh noh-zo-vah see-too-ah-tse' },
        { id: 'embassy', local: 'Kde je velvyslanectví?', phonetic: 'gde ye vel-vis-lah-nets-tvee' },
      ]
    }
  ],
  DA: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hej', phonetic: 'hi' },
        { id: 'goodbye', local: 'Farvel', phonetic: 'far-vel' },
        { id: 'please', local: 'Vær venlig', phonetic: 'ver ven-lee' },
        { id: 'thank_you', local: 'Tak', phonetic: 'tahk' },
        { id: 'yes', local: 'Ja', phonetic: 'yah' },
        { id: 'no', local: 'Nej', phonetic: 'nigh' },
        { id: 'excuse_me', local: 'Undskyld', phonetic: 'oon-skil' },
        { id: 'do_you_speak_english', local: 'Taler du engelsk?', phonetic: 'ta-ler doo eng-elsk' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Hvor meget koster det?', phonetic: 'vor ma-et kaws-ter de' },
        { id: 'credit_cards', local: 'Tager I kreditkort?', phonetic: 'ta-er ee kre-dit-kort' },
        { id: 'buy_this', local: 'Jeg vil gerne købe dette', phonetic: 'yigh vil ger-ne ku-be de-te' },
        { id: 'too_expensive', local: 'For dyrt', phonetic: 'for deert' },
        { id: 'can_you_help', local: 'Kan du hjælpe mig?', phonetic: 'kan doo yel-pe migh' },
        { id: 'fitting_room', local: 'Hvor er prøverummet?', phonetic: 'vor er pru-ve-rum-met' },
        { id: 'just_looking', local: 'Kigger bare, tak', phonetic: 'kee-ger bah-re, tahk' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Må jeg se menuen?', phonetic: 'mo yigh se me-ny-en' },
        { id: 'table_for_two', local: 'Et bord til to, tak', phonetic: 'et boor til to, tahk' },
        { id: 'bill', local: 'Regningen, tak', phonetic: 'rye-ning-en, tahk' },
        { id: 'water', local: 'Vand, tak', phonetic: 'van, tahk' },
        { id: 'reservation', local: 'Jeg har en reservation', phonetic: 'yigh har en re-ser-va-syon' },
        { id: 'delicious', local: 'Lækkert', phonetic: 'le-gert' },
        { id: 'bathroom', local: 'Hvor er toilettet?', phonetic: 'vor er twa-let-et' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Hjælp!', phonetic: 'yelp' },
        { id: 'need_doctor', local: 'Jeg har brug for en læge', phonetic: 'yigh har broog for en le-ye' },
        { id: 'call_police', local: 'Ring til politiet', phonetic: 'ring til po-li-tee-et' },
        { id: 'hospital', local: 'Hvor er hospitalet?', phonetic: 'vor er hos-pi-ta-let' },
        { id: 'lost_passport', local: 'Jeg har mistet mit pas', phonetic: 'yigh har mees-tet meet pas' },
        { id: 'emergency', local: 'Det er et nødstilfælde', phonetic: 'de er et nud-stil-fel-de' },
        { id: 'embassy', local: 'Hvor er ambassaden?', phonetic: 'vor er am-ba-sa-den' },
      ]
    }
  ],
  HU: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Szia', phonetic: 'see-ah' },
        { id: 'goodbye', local: 'Viszlát', phonetic: 'vees-laht' },
        { id: 'please', local: 'Kérem', phonetic: 'kay-rem' },
        { id: 'thank_you', local: 'Köszönöm', phonetic: 'kuh-suh-nuhm' },
        { id: 'yes', local: 'Igen', phonetic: 'ee-gen' },
        { id: 'no', local: 'Nem', phonetic: 'nem' },
        { id: 'excuse_me', local: 'Elnézést', phonetic: 'el-nay-zaysht' },
        { id: 'do_you_speak_english', local: 'Beszél angolul?', phonetic: 'be-sayl ahn-goh-lool' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Mennyibe kerül?', phonetic: 'men-yee-be ke-rool' },
        { id: 'credit_cards', local: 'Elfogadnak hitelkártyát?', phonetic: 'el-fo-gahd-nak hee-tel-kahr-tyaht' },
        { id: 'buy_this', local: 'Szeretném ezt megvenni', phonetic: 'se-ret-naym ezt meg-ven-nee' },
        { id: 'too_expensive', local: 'Túl drága', phonetic: 'tool drah-gah' },
        { id: 'can_you_help', local: 'Tud segíteni?', phonetic: 'tood she-gee-te-nee' },
        { id: 'fitting_room', local: 'Hol van a próbafülke?', phonetic: 'hol van ah pro-bah-fool-ke' },
        { id: 'just_looking', local: 'Csak nézelődöm, köszönöm', phonetic: 'chahk nay-ze-luh-duhm, kuh-suh-nuhm' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Láthatnám az étlapot?', phonetic: 'laht-hat-nahm ahz ayt-lah-pot' },
        { id: 'table_for_two', local: 'Egy asztalt két főre, kérem', phonetic: 'edj ahs-tahlt kayt fuh-re, kay-rem' },
        { id: 'bill', local: 'A számlát, kérem', phonetic: 'ah sahm-laht, kay-rem' },
        { id: 'water', local: 'Vizet, kérem', phonetic: 'vee-zet, kay-rem' },
        { id: 'reservation', local: 'Van foglalásom', phonetic: 'vahn fog-lah-lah-shom' },
        { id: 'delicious', local: 'Finom', phonetic: 'fee-nom' },
        { id: 'bathroom', local: 'Hol van a mosdó?', phonetic: 'hol van ah mosh-doh' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Segítség!', phonetic: 'she-geet-shayg' },
        { id: 'need_doctor', local: 'Orvosra van szükségem', phonetic: 'or-vosh-rah van sook-shay-gem' },
        { id: 'call_police', local: 'Hívja a rendőrséget', phonetic: 'heev-yah ah ren-dur-shay-get' },
        { id: 'hospital', local: 'Hol van a kórház?', phonetic: 'hol van ah kohr-hahz' },
        { id: 'lost_passport', local: 'Elvesztettem az útlevelemet', phonetic: 'el-ves-tet-tem ahz oot-le-ve-le-met' },
        { id: 'emergency', local: 'Ez vészhelyzet', phonetic: 'ez vays-hey-zet' },
        { id: 'embassy', local: 'Hol van a nagykövetség?', phonetic: 'hol van ah nahdj-kuh-vet-shayg' },
      ]
    }
  ],
  SV: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hej', phonetic: 'hey' },
        { id: 'goodbye', local: 'Hej då', phonetic: 'hey doh' },
        { id: 'please', local: 'Snälla', phonetic: 'snel-lah' },
        { id: 'thank_you', local: 'Tack', phonetic: 'tahk' },
        { id: 'yes', local: 'Ja', phonetic: 'yah' },
        { id: 'no', local: 'Nej', phonetic: 'ney' },
        { id: 'excuse_me', local: 'Ursäkta mig', phonetic: 'oor-sek-tah mee' },
        { id: 'do_you_speak_english', local: 'Pratar du engelska?', phonetic: 'prah-tar doo eng-els-kah' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Hur mycket kostar det?', phonetic: 'hoor mi-ket kos-tar de' },
        { id: 'credit_cards', local: 'Tar ni kreditkort?', phonetic: 'tar nee kre-deet-koort' },
        { id: 'buy_this', local: 'Jag skulle vilja köpa den här', phonetic: 'yah skool-le vil-ya chur-pah den her' },
        { id: 'too_expensive', local: 'För dyrt', phonetic: 'fur deert' },
        { id: 'can_you_help', local: 'Kan du hjälpa mig?', phonetic: 'kan doo yel-pah mee' },
        { id: 'fitting_room', local: 'Var är provhytten?', phonetic: 'var er proov-hit-ten' },
        { id: 'just_looking', local: 'Tittar bara, tack', phonetic: 'tit-tar ba-rah, tahk' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Kan jag få se menyn?', phonetic: 'kan yah foh se me-neen' },
        { id: 'table_for_two', local: 'Ett bord för två, tack', phonetic: 'et boord fur tvoh, tahk' },
        { id: 'bill', local: 'Notan, tack', phonetic: 'noo-tan, tahk' },
        { id: 'water', local: 'Vatten, tack', phonetic: 'vat-ten, tahk' },
        { id: 'reservation', local: 'Jag har en bokning', phonetic: 'yah har en boo-kning' },
        { id: 'delicious', local: 'Utsökt', phonetic: 'oot-surkt' },
        { id: 'bathroom', local: 'Var är toaletten?', phonetic: 'var er twa-let-ten' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Hjälp!', phonetic: 'yelp' },
        { id: 'need_doctor', local: 'Jag behöver en läkare', phonetic: 'yah be-hur-ver en le-kah-reh' },
        { id: 'call_police', local: 'Ring polisen', phonetic: 'ring po-lee-sen' },
        { id: 'hospital', local: 'Var ligger sjukhuset?', phonetic: 'var lig-ger shook-hoo-set' },
        { id: 'lost_passport', local: 'Jag har tappat mitt pass', phonetic: 'yah har tap-pat mit pas' },
        { id: 'emergency', local: 'Det är en nödsituation', phonetic: 'de er en nud-si-twa-shoon' },
        { id: 'embassy', local: 'Var ligger ambassaden?', phonetic: 'var lig-ger am-ba-sa-den' },
      ]
    }
  ],
  NO: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Hallo', phonetic: 'hal-loo' },
        { id: 'goodbye', local: 'Ha det', phonetic: 'hah de' },
        { id: 'please', local: 'Vær så snill', phonetic: 'var so snil' },
        { id: 'thank_you', local: 'Takk', phonetic: 'tahk' },
        { id: 'yes', local: 'Ja', phonetic: 'yah' },
        { id: 'no', local: 'Nei', phonetic: 'nay' },
        { id: 'excuse_me', local: 'Unnskyld', phonetic: 'oon-shil' },
        { id: 'do_you_speak_english', local: 'Snakker du engelsk?', phonetic: 'snak-ker doo eng-elsk' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Hvor mye koster dette?', phonetic: 'vor mee-uh kos-ter de-teh' },
        { id: 'credit_cards', local: 'Tar dere kredittkort?', phonetic: 'tar de-re kre-dit-kort' },
        { id: 'buy_this', local: 'Jeg vil gjerne kjøpe denne', phonetic: 'yey vil yer-ne chur-pe den-ne' },
        { id: 'too_expensive', local: 'For dyrt', phonetic: 'for deert' },
        { id: 'can_you_help', local: 'Kan du hjelpe meg?', phonetic: 'kan doo yel-pe mey' },
        { id: 'fitting_room', local: 'Hvor er prøverommet?', phonetic: 'vor er pru-ve-rom-met' },
        { id: 'just_looking', local: 'Ser bare, takk', phonetic: 'ser ba-re, tahk' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Kan jeg få se menyen?', phonetic: 'kan yey fo se me-nee-en' },
        { id: 'table_for_two', local: 'Et bord for to, takk', phonetic: 'et boor for to, tahk' },
        { id: 'bill', local: 'Regningen, takk', phonetic: 'rey-ning-en, tahk' },
        { id: 'water', local: 'Vann, takk', phonetic: 'van, tahk' },
        { id: 'reservation', local: 'Jeg har en reservasjon', phonetic: 'yey har en re-ser-va-shoon' },
        { id: 'delicious', local: 'Nydelig', phonetic: 'nee-de-lee' },
        { id: 'bathroom', local: 'Hvor er toalettet?', phonetic: 'vor er twa-let-tet' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Hjelp!', phonetic: 'yelp' },
        { id: 'need_doctor', local: 'Jeg trenger en lege', phonetic: 'yey treng-er en le-ge' },
        { id: 'call_police', local: 'Ring politiet', phonetic: 'ring po-li-tee-et' },
        { id: 'hospital', local: 'Hvor er sykehuset?', phonetic: 'vor er see-ke-hoo-set' },
        { id: 'lost_passport', local: 'Jeg har mistet passet mitt', phonetic: 'yey har mis-tet pas-set mit' },
        { id: 'emergency', local: 'Det er et nødstilfelle', phonetic: 'de er et nuds-til-fel-le' },
        { id: 'embassy', local: 'Hvor er ambassaden?', phonetic: 'vor er am-ba-sa-den' },
      ]
    }
  ],
  ZH: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: '你好 (Nǐ hǎo)', phonetic: 'nee how' },
        { id: 'goodbye', local: '再见 (Zàijiàn)', phonetic: 'dzy jyen' },
        { id: 'please', local: '请 (Qǐng)', phonetic: 'cheeng' },
        { id: 'thank_you', local: '谢谢 (Xièxiè)', phonetic: 'shyeh shyeh' },
        { id: 'yes', local: '是 (Shì)', phonetic: 'shur' },
        { id: 'no', local: '不 (Bù)', phonetic: 'boo' },
        { id: 'excuse_me', local: '打扰一下 (Dǎrǎo yíxià)', phonetic: 'dah row ee shyah' },
        { id: 'do_you_speak_english', local: '你会说英语吗？ (Nǐ huì shuō yīngyǔ ma?)', phonetic: 'nee hway shwo ying yoo mah' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: '这个多少钱？ (Zhège duōshǎo qián?)', phonetic: 'jay guh dwo show chyen' },
        { id: 'credit_cards', local: '你们接受信用卡吗？ (Nǐmen jiēshòu xìnyòngkǎ ma?)', phonetic: 'nee men jyeh show shin yong kah mah' },
        { id: 'buy_this', local: '我想买这个 (Wǒ xiǎng mǎi zhège)', phonetic: 'wo shyang my jay guh' },
        { id: 'too_expensive', local: '太贵了 (Tài guì le)', phonetic: 'ty gway luh' },
        { id: 'can_you_help', local: '你能帮我吗？ (Nǐ néng bāng wǒ ma?)', phonetic: 'nee nung bahng wo mah' },
        { id: 'fitting_room', local: '试衣间在哪里？ (Shìyījiān zài nǎlǐ?)', phonetic: 'shur yee jyen zy nah lee' },
        { id: 'just_looking', local: '我只是看看，谢谢 (Wǒ zhǐshì kànkàn, xièxiè)', phonetic: 'wo jur shur kahn kahn, shyeh shyeh' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: '我可以看菜单吗？ (Wǒ kěyǐ kàn càidān ma?)', phonetic: 'wo kuh yee kahn tsy dahn mah' },
        { id: 'table_for_two', local: '两人的桌子，谢谢 (Liǎng rén de zhuōzi, xièxiè)', phonetic: 'lyang run duh jwo zuh, shyeh shyeh' },
        { id: 'bill', local: '买单 (Mǎidān)', phonetic: 'my dahn' },
        { id: 'water', local: '请给我水 (Qǐng gěi wǒ shuǐ)', phonetic: 'cheeng gay wo shway' },
        { id: 'reservation', local: '我有预订 (Wǒ yǒu yùdìng)', phonetic: 'wo yo yoo ding' },
        { id: 'delicious', local: '好吃 (Hǎochī)', phonetic: 'how chur' },
        { id: 'bathroom', local: '洗手间在哪里？ (Xǐshǒujiān zài nǎlǐ?)', phonetic: 'she show jyen zy nah lee' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: '救命！ (Jiùmìng!)', phonetic: 'jyo ming' },
        { id: 'need_doctor', local: '我需要医生 (Wǒ xūyào yīshēng)', phonetic: 'wo shoo yow yee shung' },
        { id: 'call_police', local: '报警 (Bàojǐng)', phonetic: 'bow jing' },
        { id: 'hospital', local: '医院在哪里？ (Yīyuàn zài nǎlǐ?)', phonetic: 'yee ywen zy nah lee' },
        { id: 'lost_passport', local: '我护照丢了 (Wǒ hùzhào diū le)', phonetic: 'wo hoo jow dyo luh' },
        { id: 'emergency', local: '这是紧急情况 (Zhè shì jǐnjí qíngkuàng)', phonetic: 'jay shur jin jee ching kwang' },
        { id: 'embassy', local: '大使馆在哪里？ (Dàshǐguǎn zài nǎlǐ?)', phonetic: 'dah shur gwan zy nah lee' },
      ]
    }
  ],
  TH: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'สวัสดี (Sawatdee)', phonetic: 'sah-waht-dee' },
        { id: 'goodbye', local: 'ลาก่อน (Laa gon)', phonetic: 'lah-gon' },
        { id: 'please', local: 'กรุณา (Garunaa)', phonetic: 'gah-roo-nah' },
        { id: 'thank_you', local: 'ขอบคุณ (Khop khun)', phonetic: 'kop koon' },
        { id: 'yes', local: 'ใช่ (Chai)', phonetic: 'chy' },
        { id: 'no', local: 'ไม่ (Mai)', phonetic: 'my' },
        { id: 'excuse_me', local: 'ขอโทษ (Khor thot)', phonetic: 'kor toht' },
        { id: 'do_you_speak_english', local: 'คุณพูดภาษาอังกฤษได้ไหม (Khun phut phasa ang-krit dai mai)', phonetic: 'koon poot pah-sah ahng-greet dy my' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'อันนี้ราคาเท่าไหร่ (An nee ra-kha thao rai)', phonetic: 'ahn nee rah-kah tow ry' },
        { id: 'credit_cards', local: 'รับบัตรเครดิตไหม (Rap bat kre-dit mai)', phonetic: 'rahp baht kray-deet my' },
        { id: 'buy_this', local: 'ฉันอยากซื้ออันนี้ (Chan yak seuh an nee)', phonetic: 'chahn yahk soo ahn nee' },
        { id: 'too_expensive', local: 'แพงเกินไป (Phaeng gern pai)', phonetic: 'pang gern py' },
        { id: 'can_you_help', local: 'ช่วยฉันหน่อยได้ไหม (Chuai chan noi dai mai)', phonetic: 'choo-ay chahn noy dy my' },
        { id: 'fitting_room', local: 'ห้องลองเสื้ออยู่ที่ไหน (Hong long seua yu thi nai)', phonetic: 'hong long soo-ah yoo tee ny' },
        { id: 'just_looking', local: 'ขอดูเฉยๆ ขอบคุณ (Khor du choei choei, khop khun)', phonetic: 'kor doo chay chay, kop koon' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'ขอดูเมนูหน่อย (Khor du me-nu noi)', phonetic: 'kor doo may-noo noy' },
        { id: 'table_for_two', local: 'ขอโต๊ะสำหรับสองคน (Khor to sam-rap song khon)', phonetic: 'kor toh sahm-rahp song kon' },
        { id: 'bill', local: 'เก็บเงินด้วย (Gep ngen duai)', phonetic: 'gep ngun doo-ay' },
        { id: 'water', local: 'ขอน้ำเปล่า (Khor nam plao)', phonetic: 'kor nahm plow' },
        { id: 'reservation', local: 'ฉันจองไว้แล้ว (Chan jong wai laew)', phonetic: 'chahn jong wy laew' },
        { id: 'delicious', local: 'อร่อย (A-roi)', phonetic: 'ah-roy' },
        { id: 'bathroom', local: 'ห้องน้ำอยู่ที่ไหน (Hong nam yu thi nai)', phonetic: 'hong nahm yoo tee ny' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'ช่วยด้วย! (Chuai duai!)', phonetic: 'choo-ay doo-ay' },
        { id: 'need_doctor', local: 'ฉันต้องการหมอ (Chan tong kan mor)', phonetic: 'chahn tong kahn mor' },
        { id: 'call_police', local: 'โทรเรียกตำรวจ (Tho riak tam-ruat)', phonetic: 'toh ree-ahk tahm-roo-aht' },
        { id: 'hospital', local: 'โรงพยาบาลอยู่ที่ไหน (Rong pha-ya-ban yu thi nai)', phonetic: 'rong pah-yah-bahn yoo tee ny' },
        { id: 'lost_passport', local: 'พาสปอร์ตของฉันหาย (Pas-pot khong chan hai)', phonetic: 'pahs-pot kong chahn hy' },
        { id: 'emergency', local: 'นี่เป็นเรื่องฉุกเฉิน (Nee pen rueang chuk-choen)', phonetic: 'nee pen roo-ahng chook choen' },
        { id: 'embassy', local: 'สถานทูตอยู่ที่ไหน (Sa-than-thut yu thi nai)', phonetic: 'sah-tahn-toot yoo tee ny' },
      ]
    }
  ],
  VI: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'Xin chào', phonetic: 'sin chow' },
        { id: 'goodbye', local: 'Tạm biệt', phonetic: 'tahm byet' },
        { id: 'please', local: 'Làm ơn', phonetic: 'lahm un' },
        { id: 'thank_you', local: 'Cảm ơn', phonetic: 'kahm un' },
        { id: 'yes', local: 'Vâng', phonetic: 'vung' },
        { id: 'no', local: 'Không', phonetic: 'khong' },
        { id: 'excuse_me', local: 'Xin lỗi', phonetic: 'sin loy' },
        { id: 'do_you_speak_english', local: 'Bạn có nói tiếng Anh không?', phonetic: 'ban caw noy tyeng ang khong' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'Cái này bao nhiêu tiền?', phonetic: 'ky nay bow nyew tyen' },
        { id: 'credit_cards', local: 'Bạn có nhận thẻ tín dụng không?', phonetic: 'ban caw nyun the teen zoong khong' },
        { id: 'buy_this', local: 'Tôi muốn mua cái này', phonetic: 'toy mwun mwuh ky nay' },
        { id: 'too_expensive', local: 'Đắt quá', phonetic: 'daht qwa' },
        { id: 'can_you_help', local: 'Bạn có thể giúp tôi không?', phonetic: 'ban caw the zup toy khong' },
        { id: 'fitting_room', local: 'Phòng thử đồ ở đâu?', phonetic: 'fong thoo doh uh dow' },
        { id: 'just_looking', local: 'Tôi chỉ xem thôi, cảm ơn', phonetic: 'toy chee sem thoy, kahm un' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'Cho tôi xem thực đơn', phonetic: 'chaw toy sem thuk dun' },
        { id: 'table_for_two', local: 'Một bàn cho hai người', phonetic: 'mot bahn chaw hy ngwy' },
        { id: 'bill', local: 'Tính tiền, làm ơn', phonetic: 'teen tyen, lahm un' },
        { id: 'water', local: 'Cho tôi nước', phonetic: 'chaw toy nu-oc' },
        { id: 'reservation', local: 'Tôi đã đặt chỗ', phonetic: 'toy da dat cho' },
        { id: 'delicious', local: 'Ngon', phonetic: 'ngawn' },
        { id: 'bathroom', local: 'Nhà vệ sinh ở đâu?', phonetic: 'nyah ve seeng uh dow' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'Cứu tôi!', phonetic: 'kew toy' },
        { id: 'need_doctor', local: 'Tôi cần bác sĩ', phonetic: 'toy kun bahc see' },
        { id: 'call_police', local: 'Gọi cảnh sát', phonetic: 'goy kang sat' },
        { id: 'hospital', local: 'Bệnh viện ở đâu?', phonetic: 'beng vyen uh dow' },
        { id: 'lost_passport', local: 'Tôi làm mất hộ chiếu', phonetic: 'toy lahm mut ho chyew' },
        { id: 'emergency', local: 'Đây là trường hợp khẩn cấp', phonetic: 'day lah chwung hup khun cup' },
        { id: 'embassy', local: 'Đại sứ quán ở đâu?', phonetic: 'dy soo kwahn uh dow' },
      ]
    }
  ],
  KO: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: '안녕하세요 (Annyeonghaseyo)', phonetic: 'ahn-nyung-hah-se-yo' },
        { id: 'goodbye', local: '안녕히 가세요 (Annyeonghi gaseyo)', phonetic: 'ahn-nyung-hee gah-se-yo' },
        { id: 'please', local: '부탁합니다 (Butakhamnida)', phonetic: 'boo-tah-kahm-nee-dah' },
        { id: 'thank_you', local: '감사합니다 (Gamsahamnida)', phonetic: 'gahm-sah-hahm-nee-dah' },
        { id: 'yes', local: '네 (Ne)', phonetic: 'neh' },
        { id: 'no', local: '아니요 (Aniyo)', phonetic: 'ah-nee-yo' },
        { id: 'excuse_me', local: '실례합니다 (Sillyehamnida)', phonetic: 'shil-lyeh-hahm-nee-dah' },
        { id: 'do_you_speak_english', local: '영어를 하실 수 있나요? (Yeongeoreul hasil su innayo?)', phonetic: 'yung-uh-reul hah-shil soo een-nah-yo' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: '얼마인가요? (Eolmaingayo?)', phonetic: 'ul-mah-een-gah-yo' },
        { id: 'credit_cards', local: '신용카드 받나요? (Sinyongkadeu bannayo?)', phonetic: 'sheen-yong-kah-deu bahn-nah-yo' },
        { id: 'buy_this', local: '이것을 사고 싶어요 (Igeoseul sago sipeoyo)', phonetic: 'ee-guh-seul sah-go shee-puh-yo' },
        { id: 'too_expensive', local: '너무 비싸요 (Neomu bissayo)', phonetic: 'nuh-moo bees-sah-yo' },
        { id: 'can_you_help', local: '도와주실 수 있나요? (Dowajusil su innayo?)', phonetic: 'doh-wah-joo-shil soo een-nah-yo' },
        { id: 'fitting_room', local: '피팅룸은 어디인가요? (Pitingrumeun eodiingayo?)', phonetic: 'pee-teeng-roo-meun uh-dee-een-gah-yo' },
        { id: 'just_looking', local: '구경만 할게요, 감사합니다 (Gugyeongman halgeyo, gamsahamnida)', phonetic: 'goo-gyung-mahn hahl-geh-yo, gahm-sah-hahm-nee-dah' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: '메뉴판을 볼 수 있을까요? (Menyupaneul bol su isseulkkayo?)', phonetic: 'meh-nyoo-pah-neul bohl soo ees-seul-kkah-yo' },
        { id: 'table_for_two', local: '두 명 자리 부탁합니다 (Du myeong jari butakhamnida)', phonetic: 'doo myung jah-ree boo-tah-kahm-nee-dah' },
        { id: 'bill', local: '계산서 주세요 (Gyesanseo juseyo)', phonetic: 'gyeh-sahn-suh joo-seh-yo' },
        { id: 'water', local: '물 좀 주세요 (Mul jom juseyo)', phonetic: 'mool johm joo-seh-yo' },
        { id: 'reservation', local: '예약했습니다 (Yeyakhaetseumnida)', phonetic: 'yeh-yahk-haess-seum-nee-dah' },
        { id: 'delicious', local: '맛있어요 (Masisseoyo)', phonetic: 'mah-shees-suh-yo' },
        { id: 'bathroom', local: '화장실은 어디인가요? (Hwajangsireun eodiingayo?)', phonetic: 'hwa-jahng-shee-reun uh-dee-een-gah-yo' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: '도와주세요! (Dowajuseyo!)', phonetic: 'doh-wah-joo-seh-yo' },
        { id: 'need_doctor', local: '의사가 필요해요 (Uisaga piryohaeyo)', phonetic: 'eui-sah-gah pee-ryo-heh-yo' },
        { id: 'call_police', local: '경찰을 불러주세요 (Gyeongchareul bulleojuseyo)', phonetic: 'gyung-chah-reul bool-luh-joo-seh-yo' },
        { id: 'hospital', local: '병원은 어디인가요? (Byeongwoneun eodiingayo?)', phonetic: 'byung-wo-neun uh-dee-een-gah-yo' },
        { id: 'lost_passport', local: '여권을 잃어버렸어요 (Yeogwoneul ileobeoryeosseoyo)', phonetic: 'yuh-gwo-neul ee-luh-buh-ryuhs-suh-yo' },
        { id: 'emergency', local: '응급 상황입니다 (Eunggeup sanghwangimnida)', phonetic: 'eung-geup sahng-hwahng-eem-nee-dah' },
        { id: 'embassy', local: '대사관은 어디인가요? (Daesagwaneun eodiingayo?)', phonetic: 'deh-sah-gwa-neun uh-dee-een-gah-yo' },
      ]
    }
  ],
  HI: [
    {
      category: 'Basics',
      phrases: [
        { id: 'hello', local: 'नमस्ते (Namaste)', phonetic: 'nah-mahs-tay' },
        { id: 'goodbye', local: 'अलविदा (Alvida)', phonetic: 'ahl-vee-dah' },
        { id: 'please', local: 'कृपया (Kripya)', phonetic: 'krip-yah' },
        { id: 'thank_you', local: 'धन्यवाद (Dhanyavad)', phonetic: 'dhan-yah-vahd' },
        { id: 'yes', local: 'हाँ (Haan)', phonetic: 'haan' },
        { id: 'no', local: 'नहीं (Nahin)', phonetic: 'nah-heen' },
        { id: 'excuse_me', local: 'माफ़ कीजिए (Maaf kijiye)', phonetic: 'mahf kee-jee-yeh' },
        { id: 'do_you_speak_english', local: 'क्या आप अंग्रेज़ी बोलते हैं? (Kya aap angrezi bolte hain?)', phonetic: 'kyah ahp ang-reh-zee bol-teh hehn' },
      ]
    },
    {
      category: 'Shopping',
      phrases: [
        { id: 'how_much', local: 'यह कितने का है? (Yeh kitne ka hai?)', phonetic: 'yeh kit-neh kah heh' },
        { id: 'credit_cards', local: 'क्या आप क्रेडिट कार्ड लेते हैं? (Kya aap credit card lete hain?)', phonetic: 'kyah ahp kre-dit kahrd leh-teh hehn' },
        { id: 'buy_this', local: 'मैं यह खरीदना चाहूँगा/चाहूँगी (Main yeh kharidna chahunga/chahungi)', phonetic: 'mehn yeh kha-reed-nah chah-hoon-gah/chah-hoon-gee' },
        { id: 'too_expensive', local: 'बहुत महँगा है (Bahut mehanga hai)', phonetic: 'bah-hoot mehn-gah heh' },
        { id: 'can_you_help', local: 'क्या आप मेरी मदद कर सकते हैं? (Kya aap meri madad kar sakte hain?)', phonetic: 'kyah ahp meh-ree mah-dad kar sahk-teh hehn' },
        { id: 'fitting_room', local: 'फिटिंग रूम कहाँ है? (Fitting room kahan hai?)', phonetic: 'fee-ting room kah-haan heh' },
        { id: 'just_looking', local: 'बस देख रहा/रही हूँ, धन्यवाद (Bas dekh raha/rahi hoon, dhanyavad)', phonetic: 'bahs dekh rah-hah/rah-hee hoon, dhan-yah-vahd' },
      ]
    },
    {
      category: 'Hotel & Dining',
      phrases: [
        { id: 'menu', local: 'क्या मैं मेन्यू देख सकता/सकती हूँ? (Kya main menu dekh sakta/sakti hoon?)', phonetic: 'kyah mehn me-nyoo dekh sahk-tah/sahk-tee hoon' },
        { id: 'table_for_two', local: 'दो लोगों के लिए एक मेज़, कृपया (Do logon ke liye ek mez, kripya)', phonetic: 'doh lo-gon keh lee-yeh ehk mehz, krip-yah' },
        { id: 'bill', local: 'बिल ले आइए (Bill le aaiye)', phonetic: 'beel leh ah-ee-yeh' },
        { id: 'water', local: 'पानी, कृपया (Paani, kripya)', phonetic: 'pah-nee, krip-yah' },
        { id: 'reservation', local: 'मेरी बुकिंग है (Meri booking hai)', phonetic: 'meh-ree boo-king heh' },
        { id: 'delicious', local: 'स्वादिष्ट (Swadisht)', phonetic: 'swah-disht' },
        { id: 'bathroom', local: 'शौचालय कहाँ है? (Shauchalay kahan hai?)', phonetic: 'show-chah-lay kah-haan heh' },
      ]
    },
    {
      category: 'Emergencies',
      phrases: [
        { id: 'help', local: 'बचाओ! (Bachao!)', phonetic: 'bah-chow' },
        { id: 'need_doctor', local: 'मुझे डॉक्टर की ज़रूरत है (Mujhe doctor ki zaroorat hai)', phonetic: 'moo-jheh dok-tar kee zah-roo-rat heh' },
        { id: 'call_police', local: 'पुलिस को बुलाओ (Police ko bulao)', phonetic: 'poo-lis koh boo-low' },
        { id: 'hospital', local: 'अस्पताल कहाँ है? (Aspataal kahan hai?)', phonetic: 'ahs-pah-tahl kah-haan heh' },
        { id: 'lost_passport', local: 'मेरा पासपोर्ट खो गया है (Mera passport kho gaya hai)', phonetic: 'meh-rah pahs-pohrt kho gah-yah heh' },
        { id: 'emergency', local: 'यह एक आपात स्थिति है (Yeh ek aapaat sthiti hai)', phonetic: 'yeh ehk ah-paht sthee-tee heh' },
        { id: 'embassy', local: 'दूतावास कहाँ है? (Dootaavaas kahan hai?)', phonetic: 'doo-tah-vahs kah-haan heh' },
      ]
    }
  ]
};
