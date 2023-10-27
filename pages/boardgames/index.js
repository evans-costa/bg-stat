import data from '../../_data/boardgames.json';
import useUser from '../../interface/hooks/useUser.js';
import Layout from '../../interface/components/layout';
import TableRow from '../../interface/components/TableRow';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Boardgames({ allBoardgameData }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (router && !user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <Layout>
      <div className="w-full flex items-center justify-center mt-12">
        <table className="table-auto min-w-4/5 text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                Imagem (BGG Link)
              </th>
              <th scope="col" className="px-6 py-4">
                Nome do Jogo
              </th>
              <th scope="col" className="px-6 py-4">
                Preço de aquisição
              </th>
            </tr>
          </thead>
          <tbody>
            <TableRow rowsData={allBoardgameData} />
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allBoardgameData = data.boardgames;

  return {
    props: {
      allBoardgameData,
    },
  };
}
