interface IHomeProps {
  count: number;
}

export default function Home({ count }: IHomeProps) {
  return <h1>{count}</h1>;
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count');

  const data = await response.json();

  return {
    props: {
      count: data.count,
    },
  };
};
