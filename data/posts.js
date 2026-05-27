const posts = [
  {
    id: 1,
    title: "Ciambellone",
    content:
      "Sarà che una volta le cose erano più semplici, ma erano anche molto buone. Come le crostate, i biscotti o il ciambellone che la nonna preparava anche all'ultimo sapendo che sareste passati per la merenda: uova, zucchero e farina. Niente di più basic ma che tra le sue mani, mescolando e infornando, diventava una delle prelibatezze per accompagnare il succo di frutta al pomeriggio o il latte e caffè al mattino. Ecco la nostra ricetta del ciambellone a quale atmosfera si ispira, quella di casa e genuinità: con una manciata di scorze di limone o di arancia e una spolverata di zucchero a velo renderete questa soffice delizia profumata e invitante. E per una volta sarà la nonna a farvi i complimenti per aver preparato un morbido ciambellone, così buono che non passa mai di moda!",
    image: "/imgs/posts/ciambellone.jpeg",
    tags: ["Dolci", "Torte", "Ricette vegetariane", "Ricette al forno"],
    slug: "ciambellone",
    published: true,
    prep_time: 20,
    created_at: "2024-01-15T09:00:00.000Z",
  },
  {
    id: 2,
    title: "Cracker alla barbabietola",
    content: `I cracker alla barbabietola sono uno snack stuzzicante e originale da preparare in casa utilizzando ingredienti semplici e genuini. Queste sfogliette dal colore brillante non passeranno inosservate nel vostro cestino del pane e arricchiranno la tavola con il loro gusto unico e accattivante. I cracker fatti a mano sono anche un gustoso snack spezza fame, da portare in ufficio o a scuola. Venite a scoprire il nostro mix di semi e cereali per realizzare l'impasto e divertitevi a sperimentare nuove ricette di cracker variando i semi, le farine e le spezie per gusti sempre nuovi, ecco qualche idea:
              Cracker di farro
              Cracker di lupini
              Cracker allo zafferano
              Cracker ai semi`,
    image: "/imgs/posts/cracker_barbabietola.jpeg",
    tags: ["Antipasti", "Ricette vegetariane", "Ricette al forno"],
    slug: "cracker-alla-barbabietola",
    published: true,
    prep_time: 40,
    created_at: "2024-02-03T10:30:00.000Z",
  },
  {
    id: 3,
    title: "Pasta barbabietola e gorgonzola",
    content: `La nostra ricetta della pasta barbabietola e gorgonzola vuole ricreare in questo primo piatto un abbinamento appetitoso, già proposto con la torta salata alla barbabietola! Per un pranzo veloce ma gustoso, per chi ama giocare con consistenze e colori naturali in cucina, questa pasta è perfetta! La dolcezza della barbabietola smorza il gusto deciso che caratterizza questo formaggio erborinato molto amato, un'abbinata vincente e molto gustosa. Provate un nuovo condimento per la vostra pasta e sperimentate altre sfiziose varianti:
            Pasta con barbabietola e pecorino
            Gnocchi di barbabietola
            Tagliatelle alla barbabietola con asparagi`,
    image: "/imgs/posts/pasta_barbabietola.jpeg",
    tags: ["Primi piatti", "Ricette vegetariane"],
    slug: "pasta-barbabietola-e-gorgonzola",
    published: true,
    prep_time: 25,
    created_at: "2024-03-20T14:15:00.000Z",
  },
  {
    id: 4,
    title: "Pane fritto dolce",
    content: `Il pane fritto dolce è la versione più antica dell'odierno french toast! Una deliziosa ricetta antispreco che le nonne preparavano ai bambini per merenda, utilizzando gli ingredienti che si avevano sempre a disposizione in casa: pane raffermo, uova, latte e zucchero, che noi abbiamo deciso di aromatizzare con un pizzico di cannella. Facile e veloce da realizzare, il pane fritto dolce vi riporterà con la mente ai sapori dell'infanzia… gustatelo da solo o accompagnatelo con frutta fresca e yogurt per uno spuntino tanto goloso quanto genuino!`,
    image: "/imgs/posts/pane_fritto_dolce.jpeg",
    tags: ["Dolci", "Dolci veloci", "Ricette veloci", "Ricette vegetariane"],
    slug: "pane-fritto-dolce",
    published: false,
    prep_time: 15,
    created_at: "2024-04-08T08:45:00.000Z",
  },
  {
    id: 5,
    title: "Torta paesana",
    content: `La torta paesana è un dolce di origine lombarda e precisamente della Brianza, la zona compresa tra la provincia a nord di Milano e il lago di Lecco-Como. E' un dolce di origine contadina, dalle infinite varianti, ma realizzata principalmente con pane raffermo bagnato nel latte. E' infatti conosciuta anche come torta di pane o, in dialetto locale, “michelacc” ovvero mica e lac (pane e latte). A seconda dei gusti e delle disponibilità del momento, al pane ammollato ogni famiglia univa ingredienti diversi, chi l'uvetta o chi i pinoli ad esempio. Noi vi presentiamo la nostra versione con l'aggiunta di cacao e amaretti: perfetta da gustare per una merenda dal sapore rustico, la torta paesana è un perfetto dolce di recupero quando si ha del pane avanzato… ed è ancora più buona il giorno dopo!`,
    image: "/imgs/posts/torta_paesana.jpeg",
    tags: ["Dolci", "Dolci al cioccolato", "Torte", "Ricette vegetariane", "Ricette al forno"],
    slug: "torta-paesana",
    published: false,
    prep_time: 60,
    created_at: "2024-05-22T11:00:00.000Z",
  },
];

const templatePostToBeCreated = {
  title: "",
  content: "",
  image: "",
  tags: [],
  published: false,
  prep_time: 0
}

function createPostSlug(post) {
  if (!post) {
    return null;
  }

  const { title } = post;
  const slug = title.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, "-");

  let increment = 0;
  let foundDuplicateSlug;
  let slugFinal = slug;

  do {

    if (increment < 10) {
      slugFinal = slug + (increment === 0 ? "" : `-${increment}`);
    }
    else {
      slugFinal = slug + crypto.randomUUID();
    }

    foundDuplicateSlug = posts.find(post => post.slug === slugFinal);

    increment++;

  } while (foundDuplicateSlug)

  return slugFinal;
}

function getCreationTime() {
  const currentTime = new Date();
  const created_atString = `${currentTime.toISOString()}`;
  return created_atString;
}

function doPostsHaveSameKeys(...postObjects) { // devo ricordarmi di dare sempre il post di template 
  // per quando voglio fare create o put (per il patch non si usa questa)
  const allKeys = postObjects.reduce((keys, post) => {
    const currentKeys = Object.keys(post);
    return keys.concat(currentKeys);
  }, []); // Alla fine di tutto questo, avrò un array con dentro tutte le chiavi di tutti i post ricevuti in ingresso
  // Adesso devo eliminare tutti i duplicati da questo array:
  const deDuplicatedKeys = new Set(allKeys);
  // A questo punto, mi basta controllare che la lunghezza del mio set sia uguale alla lunghezza dell'array di chiavi di OGNI oggetto.
  return postObjects.every(postObject => deDuplicatedKeys.size === Object.keys(postObject).length);
}

function validatePostAndPut(post) {
  if (!post) {
    return null;
  }

  if (!doPostsHaveSameKeys(post, templatePostToBeCreated)) {
    return null;
  }

  let result = true;

  for (const property of Object.entries(post)) {
    const [key, value] = property;

    result = switchValidator(key, value);

    if (!result) {
      return null;
    }
  }

  return post;
}

function switchValidator(key, value) {
  switch (key) {
    case "title":
      if (
        typeof value !== "string" ||
        value.trim().length === 0
      ) {
        return false;
      }
      break;
    case "content":
      if (
        typeof value !== "string" ||
        value.trim().length === 0
      ) {
        return false;
      }
      break;
    case "image":
      if (typeof value !== "string") {
        return false;
      }
      break;
    case "tags":
      if (!Array.isArray(value)) {
        return false;
      }
      for (let i = 0; i < value.length; i++) {
        const current = value[i];
        if (typeof current !== "string") {
          return false;
        }
      }
      break;
    case "published":
      if (typeof value !== "boolean") {
        return false;
      }
      break;
    case "prep_time":
      if (typeof value !== "number") {
        return false;
      }
      break;
    default:
      break;
  }
  return true;
}

function validatePatch(modification) {
  if(!modification){
    return null;
  }
  const updateKeys = Object.keys(modification);
  for (let i = 0; i < updateKeys; i++) {
    const currentKey = updateKeys[i];
    if (!templatePostToBeCreated.hasOwnProperty(currentKey)) {
      return null;
    }
  }

  let result = true;

  for (let i = 0; i < updateKeys; i++) {
    const key = updateKeys[i];
    const value = modification[key];

    result = switchValidator(key, value);
    if (!result) {
      return null;
    }
  }

  return modification;
}

function filterPosts(query) {
  const { title, tags, slug, prep_time, published } = query || {};

  const filteredPosts = posts.filter(post => {
    if (typeof published === "boolean" && !published) {
      return false;
    }
    if (title) {
      const postTitle = post.title.toLowerCase();
      const searchTitle = title.toLowerCase();
      if (!postTitle.startsWith(searchTitle)) {
        return false;
      }
    }
    if (slug) {
      const postSlug = post.slug.toLowerCase();
      const searchSlug = slug.toLowerCase();
      if (!postSlug.startsWith(searchSlug)) {
        return false;
      }
    }
    if (prep_time) {
      const postPrepTime = post.prep_time;
      if (prep_time > postPrepTime) {
        return false;
      }
    }
    if (tags) {
      const fixedPostTagArray = post.tags.map(tag => tag.toLowerCase());
      const tagArray = tags.split(" ");
      for (let i = 0; i < tagArray.length; i++) {
        const currentSearchTag = tagArray[i].toLowerCase();
        if (!fixedPostTagArray.includes(currentSearchTag)) {
          return false;
        }
      }
    }
    return true;
  });

  return filteredPosts;
}

export {
  posts,
  validatePostAndPut,
  validatePatch,
  filterPosts,
  createPostSlug,
  getCreationTime
}