const languages = [
  'Abkhazian',
  'Afar',
  'Afrikaans',
  'Akan',
  'Albanian',
  'Amharic',
  'Arabic',
  'Aragonese',
  'Armenian',
  'Assamese',
  'Avaric',
  'Avestan',
  'Aymara',
  'Azerbaijani',
  'Bambara',
  'Bashkir',
  'Basque',
  'Belarusian',
  'Bengali',
  'Bihari languages',
  'Bislama',
  'Bosnian',
  'Breton',
  'Bulgarian',
  'Burmese',
  'Catalan, Valencian',
  'Central Khmer',
  'Chamorro',
  'Chechen',
  'Chichewa, Chewa, Nyanja',
  'Chinese',
  'Church Slavonic, Old Bulgarian, Old Church Slavonic',
  'Chuvash',
  'Cornish',
  'Corsican',
  'Cree',
  'Croatian',
  'Czech',
  'Danish',
  'Divehi, Dhivehi, Maldivian',
  'Dutch, Flemish',
  'Dzongkha',
  'English',
  'Esperanto',
  'Estonian',
  'Ewe',
  'Faroese',
  'Fijian',
  'Finnish',
  'French',
  'Fulah',
  'Gaelic, Scottish Gaelic',
  'Galician',
  'Ganda',
  'Georgian',
  'German',
  'Gikuyu, Kikuyu',
  'Greek (Modern)',
  'Greenlandic, Kalaallisut',
  'Guarani',
  'Gujarati',
  'Haitian, Haitian Creole',
  'Hausa',
  'Hebrew',
  'Herero',
  'Hindi',
  'Hiri Motu',
  'Hungarian',
  'Icelandic',
  'Ido',
  'Igbo',
  'Indonesian',
  'Interlingua (International Auxiliary Language Association)',
  'Interlingue',
  'Inuktitut',
  'Inupiaq',
  'Irish',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kanuri',
  'Kashmiri',
  'Kazakh',
  'Kinyarwanda',
  'Komi',
  'Kongo',
  'Korean',
  'Kwanyama, Kuanyama',
  'Kurdish',
  'Kyrgyz',
  'Lao',
  'Latin',
  'Latvian',
  'Letzeburgesch, Luxembourgish',
  'Limburgish, Limburgan, Limburger',
  'Lingala',
  'Lithuanian',
  'Luba-Katanga',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Manx',
  'Maori',
  'Marathi',
  'Marshallese',
  'Moldovan, Moldavian, Romanian',
  'Mongolian',
  'Nauru',
  'Navajo, Navaho',
  'Northern Ndebele',
  'Ndonga',
  'Nepali',
  'Northern Sami',
  'Norwegian',
  'Norwegian Bokmål',
  'Norwegian Nynorsk',
  'Nuosu, Sichuan Yi',
  'Occitan (post 1500)',
  'Ojibwa',
  'Oriya',
  'Oromo',
  'Ossetian, Ossetic',
  'Pali',
  'Panjabi, Punjabi',
  'Pashto, Pushto',
  'Persian',
  'Polish',
  'Portuguese',
  'Quechua',
  'Romansh',
  'Rundi',
  'Russian',
  'Samoan',
  'Sango',
  'Sanskrit',
  'Sardinian',
  'Serbian',
  'Shona',
  'Sindhi',
  'Sinhala, Sinhalese',
  'Slovak',
  'Slovenian',
  'Somali',
  'Sotho, Southern',
  'South Ndebele',
  'Spanish, Castilian',
  'Sundanese',
  'Swahili',
  'Swati',
  'Swedish',
  'Tagalog',
  'Tahitian',
  'Tajik',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Tibetan',
  'Tigrinya',
  'Tonga (Tonga Islands)',
  'Tsonga',
  'Tswana',
  'Turkish',
  'Turkmen',
  'Twi',
  'Uighur, Uyghur',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Venda',
  'Vietnamese',
  'Volap_k',
  'Walloon',
  'Welsh',
  'Western Frisian',
  'Wolof',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zhuang, Chuang',
  'Zulu'
];

const provisions = [
    'Food', 'Legal Aid', 'Language Practice', 'Transportation', 'Administrative Aid'
]

const defaultState = {
  userType: "",
  currentUser: "",
  languages: languages,
  listings: [],
  cases: [],
  loading: false,
  allListings: [],
  provisions: provisions,
  placements: [],
  allCases: [],
  currentDate: new Date(),
  currentCase: null,
  currentConversation: null,
  conversations: [],
  unreadMessages: 0
}

function reducer(prevState=defaultState, action){
  switch(action.type){
    case "LOAD_LISTINGS":
      return {...prevState, allListings: action.payload}
    case "LOAD_CASES":
      return {...prevState, allCases: action.payload}
    case "TOGGLE_LOAD":
      return {...prevState, loading: !prevState.loading}
    case "SET_USER":

      let latestConversation = []
      if (action.payload.conversations.length > 0) {
        latestConversation = action.payload.conversations[0]
      }

      let unreadConversations = []

      for (let i = 0; i < action.payload.conversations.length; i ++) {
        let conversation = action.payload.conversations[i]
        for (let j = 0; j < conversation.messages.length; j ++) {

          if (conversation.messages[j].read === false && conversation.messages[j].user_id !==action.payload.id){
            unreadConversations.push(conversation.id)
          }
        }
      }

      const unreadCount = [...new Set(unreadConversations)].length

      return {...prevState, currentUser: action.payload, userType: action.payload.user_type, listings: action.payload.listings, cases: action.payload.cases, placements: action.payload.placements, loading: false, conversations: action.payload.conversations, currentConversation: latestConversation, unreadMessages: unreadCount}
    case "UPDATE_READ_MESSAGES":
      const newConversations = prevState.conversations.map(conversation => {
        if (conversation.id === action.payload.id){
          return action.payload
        } else {
          return conversation
        }
      })

      let newUnread = []

      for (let i = 0; i < newConversations.length; i ++) {
        let newConversation = newConversations[i]
        for (let j = 0; j < newConversation.messages.length; j ++) {
          if (newConversation.messages[j].read === false && newConversation.messages[j].user_id !== prevState.currentUser.id){
            newUnread.push(newConversation.id)
          }
        }
      }



      const newUnreadCount = [...new Set(newUnread)].length

      return {...prevState, conversations: newConversations, unreadMessages: newUnreadCount}


    case "SET_CASE":
      return {...prevState, currentCase: action.payload}
    case "RESET_CASE":
      return {...prevState, currentCase: null}
    case "ADD_LISTING":
      return {...prevState, listings: [...prevState.listings, action.payload]}
    case "ADD_TO_ALL_LISTINGS":
      return {...prevState, allListings: [...prevState.allListings, action.payload]}
    case "ADD_CASE":
        return {...prevState, cases: [...prevState.cases, action.payload], allCases: [...prevState.allCases, action.payload]}
    case "EDIT_LISTING":
      let newListings = prevState.listings.map(listing => {
        if (listing.id === action.payload.id) {
          return action.payload
        } else {
          return listing
        }
      })
      let newAllListings = prevState.allListings.map(listing => {
        if (listing.id === action.payload.id) {
          return action.payload
        } else {
          return listing
        }
      })

      return {...prevState, listings: newListings, allListings: newAllListings}
      case "EDIT_CASE":
        let newCases = prevState.cases.map(caseObj => {
          if (caseObj.id === action.payload.id) {
            return action.payload
          } else {
            return caseObj
          }
        })

        return {...prevState, cases: newCases}
    case "DELETE_LISTING":
      let updatedListings = prevState.listings.filter(listing => {
        return listing.id !== action.payload.id
      })

      return {...prevState, listings: updatedListings}
    case "DELETE_CASE":
      let updatedCases = prevState.cases.filter(caseObj => {
        return caseObj.id !== action.payload.id
      })

      return {...prevState, cases: updatedCases}
    case "APPROVE_OR_CANCEL_PLACEMENT":
      let copyPlacements = [...prevState.placements]
      let updatedPlacements = copyPlacements.map(placement => {
        if (placement.id === action.payload.id){
          return action.payload
        } else {
          return placement
        }
      })

      const foundCaseObj = prevState.allCases.find(caseObj => {
        return caseObj.id === action.payload.case_id
      })


      const newPlacements = foundCaseObj.placements.map(placement => {
        if (placement.id === action.payload.id) {
          return action.payload
        } else {
          return placement
        }
      })

      let newCaseInstance = {...foundCaseObj, placements: newPlacements}

      const newCaseObjs = prevState.allCases.map(caseObj => {
        if (caseObj.id === foundCaseObj.id) {
          return newCaseInstance
        } else {
          return caseObj
        }
      })

      
      return {...prevState, placements: updatedPlacements, allCases: newCaseObjs}
    case "UPDATE_PLACEMENT":
      let foundCase = prevState.cases.find(caseObj => caseObj.id === action.payload.case_id)
      let newCase = {...foundCase, placements: [...foundCase.placements, action.payload]}

      const updatedCaseObjs = prevState.cases.map(caseObj => {
        if (caseObj.id === newCase.id) {
          return newCase
        } else {
          return caseObj
        }
      })
      return {...prevState, cases: updatedCaseObjs, placements: [...prevState.placements, action.payload]}
    case "LOGOUT":
      return {...prevState, userType: "", currentUser: "", listings: [], cases: [], placements: []}
    case "CHECK_PLACEMENT":
      const newArr = prevState.placements.map(placement => {
        if (placement.id === action.payload.id) {
          return action.payload
        } else {
          return placement
        }
      })
      return {...prevState, placements: newArr}
    case "SET_CONVERSATION":
      return {...prevState, currentConversation: action.payload}
    case "NEW_MESSAGE":

      const updatedConversations = prevState.conversations.map(conversation => {
        if (conversation.id === prevState.currentConversation.id){
          let newConvo = {...conversation}
          newConvo.messages = [...newConvo.messages]
          newConvo.messages.push(action.payload)
          return newConvo
        } else {
          return conversation
        }
      })

      const newMessages = [...prevState.currentConversation.messages, action.payload]



      return {...prevState, conversations: [...updatedConversations], currentConversation: {...prevState.currentConversation, messages: newMessages}}
    default:
      return prevState
  }
}

export default reducer
