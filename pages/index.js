import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/alurakutCommons';
import { ProfileRelationsBox } from '../src/components/ProfileRelations';
import { ProfileSidebar } from '../src/components/ProfileSidebar';

export default function Home() {
  const usuarioAleatorio = 'maxsueldev';
  const [comunidades, setComunidades] = React.useState([{
    id: '523544353425',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  // const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    { title: 'juunegreiros', image: `https://github.com/juunegreiros.png`},
    { title: 'omariosouto', image: `https://github.com/omariosouto.png`},
    { title: 'peas', image: `https://github.com/peas.png`},
    { title: 'rafaballerini', image: `https://github.com/rafaballerini.png`},
    { title: 'marcobrunodev', image: `https://github.com/marcobrunodev.png`},
    { title: 'felipefialho', image: `https://github.com/felipefialho.png`}
  ];

  const [githubFollowers, setguthubFollowers] = React.useState([]);

  React.useEffect(function() {
    fetch('https://api.github.com/users/maxsueldev/followers')
    .then(serverResponse => serverResponse.json())
    .then(completeResponse => {
      setguthubFollowers(completeResponse);
    }) 
  }, []);    

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComundade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input 
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="Coloque uma url para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma url para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box> 
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" item={githubFollowers} />
          <ProfileRelationsBox title="Comunidades" item={comunidades} />
          <ProfileRelationsBox title="Pessoas da comunidade" item={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  );
}
