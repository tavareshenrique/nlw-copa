import Image from 'next/image';

export default function Home() {
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src="/assets/logo.svg" alt="NLW COPA" width={213} height={41} quality={100} />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src="/assets/users-avatar-example.png"
            alt="Imagem de algumas pessoas que já usam o NLW Copa"
            width={158}
            height={57}
            quality={100}
          />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+12.592</span> pessoas já estão usando.
          </strong>
        </div>

        <form className="mt-10 flex gap-2">
          <input
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm"
          />

          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src="/assets/icon-check.svg" alt="Icone de check" width={40} height={40} quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src="/assets/icon-check.svg" alt="Icone de check" width={40} height={40} quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src="/assets/app-nlw-copa-preview.png"
        alt="Dois celulares exibindo uma prévia da aplicção móvel do NLW Copa"
        width={518}
        height={605}
        quality={100}
      />
    </div>
  );
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
