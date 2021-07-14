import React, { useState } from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  console.log(props)
  return(
    <Box as ="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
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
  const githubUser = 'hellojuli';
  const [communities, setCommunities] = React.useState([{
    id: '4855453456',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    title: 'Bom dia grupo',
    image: 'https://picsum.photos/200/300',
  }]);
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
  }, [])

  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a), Juliana</h1>
            <h2 className="smallTitle">Sorte de hoje: O melhor profeta do futuro é o passado</h2>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleSubmit(e) {
              e.preventDefault();
              const dataForm = new FormData(e.target);

              const communitie = {
                id: new Date().toISOString(),
                title: dataForm.get('title'),
                image: dataForm.get('image'),
              }
              //communities.push('Alura Stars')
              const newCommunities = [...communities, communitie];
              setCommunities(newCommunities)
              console.log(communities)
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
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>
         <ProfileRelationsBoxWrapper>
           <h2 className="smallTitlle">Comunidades ({communities.length})</h2>

            <ul>
              {communities.map((itemAtual) => {
                return(
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image}/>
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

         </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitlle">Pessoas da comunidade ({favPeoples.length})</h2>

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

          </ProfileRelationsBoxWrapper>
        </div>      
      </MainGrid>
    </>
  )
}
