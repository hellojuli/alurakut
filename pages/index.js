import React, { useEffect, useState } from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import FriendsList from "../src/components/FriendsList";
import GitHubService from "../pages/api/github";

function ProfileSidebar(props) {
  console.log(props)
  return(
    <Box as ="aside">
      <img src={`https://github.com/${props.username}.png`} style={{ borderRadius: '8px'}}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.username}`}>
          @{props.username}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}
export default function Home() {
  const [username, setUsername] = useState([]);
  const [communities, setCommunities] = React.useState([]);
  //const communities = communities[0];
  //const setCommunities = communities[1];
  const favPeoples = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho' 
  ]

  useEffect(() => {
    GitHubService.getUsername().then((userName) => setUsername(userName));
  }, []);

  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o array de dados do github 
  React.useEffect(function() {
    fetch('https://api.github.com/users/hellojuli/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })


    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '83f02786813b2785747680cec14152',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setCommunities(comunidadesVindasDoDato)
    })
    // .then(function (response) {
    //   return response.json()
    // })

  }, [])

  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar username={username.login} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vinda, Juliana</h1>
            <h2 className="smallTitle">Sorte de hoje: O melhor profeta do futuro é o passado</h2>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleSubmit(e){
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));

                const comunidade = {
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: {username},
                }

                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setCommunities(comunidadesAtualizadas)
                })
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  tupe="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
           <h2 className="subTitle">Comunidades <span className="boxLink">({communities.length})</span></h2>

            <ul>
              {communities.map((itemAtual) => {
                return(
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl}/>
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <h2 className="linkTitle">Ver todos</h2>
         </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
            <h2 className="subTitle">Pessoas da comunidade <span className="boxLink">({favPeoples.length})</span></h2>
            <ul>
              {favPeoples.map((itemAtual) => {
                return(
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <h2 className="linkTitle">Ver todos</h2>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
            <FriendsList quantidade={6} randomico={true}/>
          </ProfileRelationsBoxWrapper>
        </div>      
      </MainGrid>
    </>
  )
}
