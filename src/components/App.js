import React, { Component } from 'react';
import Table from './Table';
import Hero from './Hero';
import '../App.css';

const API = 'http://api.icndb.com/jokes/random';

/* 
  Generalement c'est pas mal de centraliser la buisness logic dans un endroit qui est le container / smart component / statefull component (juste differentes manieres de l'appeler) qui hold le state et prepare les props 
  pour ses children components qui eux s'occupent juste de render ce qu'ils recoivent. Ici App est le container et tous les autres sont des functional / stateless components.
*/

class App extends Component {
  /* 
  une tres bonne technique de store management est la "normalisation". Voir le cours gratos egghead building applications with idiomatic redux. Il est long mais tu le fait
  serieusement tu vas apprendre plein de trucs (fait par le createur de redux). L'idée c'est de normaliser (homogeneiser) la data que tu recoit de ton api. L'api pourrait te retourner une array dans certains cas
  (un array de jokes), ou un objet dans d'autres etc. Meme si c'est peut etre pas le cas avec cette api la, c'est un bonne habitude a prendre. Parce que une fois que la forme de la data est
  homogeneisée on n'a plus a s'en soucier, on sait quelle va etre sa forme et donc on sait comment la traiter dans nos reducers redux ou dans notre state react. Autrement il faudrait tout le temps
  checker ce qu'on a recu, et appliquer une logique differente (si dans un cas tu recoi un object alors que tu t'attendais a une array, n'importe quelle .map / .filter que tu as dans ta logique
  casserait le programme, donc il faudrait mettre un check pour voir si c'est une array ou un objet etc.). Dans le cas de cette app ca peut parraitre un peu overkill parce qu'on fait qu'un seul call api,
  mais c'est quand meme une bonne habitude a prendre, et ca nous aidera au niveau du traitement de la data dans le Table component.

  Il y a un package qui fait ca pour toi, il faut configurer deux trois trucs, c'est normalize. Mais on peu le faire nous meme.

  Pour le moment tu sauvegardes la data dans ton state sous la forme d'une array, en rajoutant une prop good/bad a chaque joke
  pour pouvoir les filter plus tard dans ton Table component. Ca serait bien d'avoir deux array, une likedJokes et une dislikedJokes. Comme ca t'eviterait de devoir filter dans ton Table component. Tu aura juste a choper la dislikedJokes array, et render ce qu'il y a dedans avec map. 
  Aussi, ca serait bien d'avoir l'ensemble des jokes dans un seul endroit, imagine si on veut acceder a une joke particuliere a un moment donné (genre si on rajoute la fonctionnalité de pouvoir cliquer sur une joke, pour ouvrir la "jokePage", qui montre le rating de la joke, l'auteur, un fil de commentaires etc),
  on veut pas avoir a loop sur likedJokes et/ou dislikedJokes pour la trouver. On veut pas non plus avoir a loop sur une array allJokes pour touver la blague en question parce que c'est pas performant (imagine si un utilisateur a liké / disliké 10000 jokes,
  ca ferait une grosse loop si la joke qu'on cherche est a la fin de l'array). Du coup ca serait mieux de garder toutes les jokes dans un object sous la forme: 
  {
    [id]: joke   
  }
  par example: 
  {
    1: {
      id: 1,
      joke: 'une joke marante', 
    }
    345: {
      id: 345,
      joke: 'une joke pas marante', 
    }
  }

  Comme ca, acceder a une joke necessite au max une seul operation: allJokes[id].
  Et comme on veut pas dupliquer les endroits ou on garde la meme joke on va pas mettre l'ensemble de la joke dans les likedJokes et dislikedJokes arrays, on va juste mettre l'id de la joke. Ce qui donne un state qui a la shape suivante: 

  state = {
    byId: {
      1: {
        id: 1,
        joke: 'une joke marante', 
      },
      345: {
        id: 345,
        joke: 'une joke pas marante', 
      }
    },
    likedJokesIds: [1],
    dislikedJokesIds: [345],
  }

  On va aussi rajouter comme tu as fais une propriete au state qui maintien la joke actuelle avant qu'elle soit votée.
  */

  state = {
    currentJoke: {},
    byId: {},
    likedJokesIds: [],
    dislikedJokesIds: [],
  };

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote = () => {
    fetch(API, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(this.setCurrentJoke)
      // TODO:
      // creer un error state: si le fetch fail, montrer un message pour avertir l'utilisateur et retry
      // il faudra rajouter une prop error (initialement false) au state. Et la set true dans le catch. Puis reagir a cette prop dans le jsx.
      .catch(error => console.log(error));
  };

  setCurrentJoke = data => this.setState({ currentJoke: data.value });

  handleVote = (liked = true) => {
    const { currentJoke } = this.state;
    const { id } = currentJoke;
    const targetArray = liked ? 'likedJokesIds' : 'dislikedJokesIds';
    // au lieu de faire ca on pourrait appeler une fonction pour les likedJokes et une autre pour les dislikedJokes: e.g
    // if (liked) this.setLikedJoke(id);
    // else this.setdislikedJoke(id);
    this.setState(
      {
        byId: {
          ...this.state.byId,
          // si t'est pas tout frais sur les ..., je crois que wes bos avait une partie pas mal la dessus dans son cours sur es6
          [id]: {
            ...currentJoke,
            liked,
            // on rajoute la prop 'liked' nous meme, comme tu le faisais. Dans une vraie app on enverrait l'info au back end et on recevrait la joke updatée avec
            // la preference de l'utilisateur. On utilisera la 'liked' pour savoir quelle array filtrer au moment de deleter une joke.
          },
        },
        [targetArray]: [id, ...this.state[targetArray]],
        // je rajoute la nouvelle id au debut de l'array pour que la nouvelle joke apparaisse au top du Table component et que le user la voit direct.
      },
      this.fetchQuote,
    );
    /* 
      this.setState prend une fonction en deuxieme argument, c'est un callback qui est appeler apres que le nouveau state soit set.
      et dans notre cas on peu utiliser pour fetch a nouveau. C'est un peu plus safe que d'appeler this.fetchQuote apres d'appeler this.setState
      pack this.setState est asynchronous. Donc en appeleant this.fetchQuote dans le callback de this.setState on est sur que le nouveau state est
      set avant d'appeler this.fetchQuote est on evite une race condition ou un bug chelou comme ca.
    */
  };

  removeQuote = id => {
    const { byId } = this.state;
    const jokeToRemove = byId[id];
    const targetArray = jokeToRemove.liked ? 'likedJokesIds' : 'dislikedJokesIds';
    const updatedJokesArray = this.state[targetArray].filter(key => key !== id);
    const newById = { ...byId };
    delete newById[id];
    this.setState({
      byId: newById,
      [targetArray]: updatedJokesArray,
    });
    /*
      ici a chaque fois qu'on delete une joke on doit l'enlever de l'array et aussi de l'objet 'byId' (c'est pas necessaire je pense mais
      ca make sense vu que pour le moment on aura plus besoin des jokes supprimées dans l'app).
      Pour deleter la joke de l'objet je fais une copie de l'objet puis je delete la joke de la copie,
      pas de l'objet initial. C'est parce que react check les references des objects pour savoir si ils ont changé et si il faut re-render, il check pas si le
      le contenu de l'objet lui meme a changé (par ce que ca serait pas du tout perfomant, il faudrait loop sur toutes les prop de l'array/objet et voir si au moins une d'entre elle a changé).
      Donc si on deletait la joke de l'objet qui est dans le state, comme c'est une 'mutating operation' (qui mutate l'objet en question), on ne fait que modifier le meme objet et react
      voit que la reference de l'objet et la meme et donc ne re-render pas. C'est pour ca qu'il faut toujour creer des nouvelles copie des array/objet, nouvelle copie === nouvelle reference en memoire === re-render.
      apres ici, comme de toute facon on filter une des array, et qui filter retourne une nouvelle array avec donc une nouvelle reference, react re-renderera. Mais c'est quand meme important de
      prendre l'habitude de ne jamais mutate dans redux/react, et de toujours créer de nouvelles copies.
    */
  };

  render() {
    console.log(this.state); // check comment le state evolue quand tu ajoutes ou enleve les jokes
    const { currentJoke, byId, likedJokesIds, dislikedJokesIds } = this.state;
    const likedJokes = likedJokesIds.map(id => byId[id]);
    const dislikedJokes = dislikedJokesIds.map(id => byId[id]);
    // TODO:
    // Memoize ces maps: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    const allJokes = [...likedJokes, ...dislikedJokes];
    /* 
      j'avais commencer par utiliser Object.keys pour transformer l'objet byId en array:
      const allJokes = Object.keys(byId).map(id => byId[id]);
      pour ensuite l'utilisée pour <Table data={allJokes} />
      mais ca veut dire que les jokes sont pas ordonnées dans leur ordre d'arrivée. Donc j'ai décidé de merge les deux array en une nouvelle array en ordonnant la nouvelle array
      avec les liked jokes on top.
    */
    // TODO:
    // Rajouter un loading state: on voit undefined tres rapidement quand on load, il faudrait que ca dise 'loading...'. Pareil quand
    // quand on fetch une nouvelle blague (meme si on le verra que si la fetch met du temps). Pour ca il faut:
    // - rajouter une propriété 'loading' au state et la set true / false aux bons moments
    // - dans le jsx render "loading..." si this.state.loading est true

    return (
      <div className="app">
        <Hero
          title={currentJoke.joke}
          heroActions
          heroActionsTitle={'Select a Category'}
          onHeroActionClick={this.handleVote}
        />
        <div className="tablecontainer">
          <Table data={likedJokes} removeQuote={this.removeQuote} />
          <Table data={dislikedJokes} removeQuote={this.removeQuote} />
          <Table data={allJokes} removeQuote={this.removeQuote} />
        </div>
      </div>
    );
  }
}

export default App;
