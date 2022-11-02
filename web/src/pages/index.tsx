import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <main>
        <Image src="/assets/logo.svg" alt="NLW COPA" width={213} height={41} quality={100} />

        <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div>
          <Image
            src="/assets/users-avatar-example.png"
            alt="Imagem de algumas pessoas que já usam o NLW Copa"
            width={158}
            height={57}
            quality={100}
          />

          <strong>
            <span>+12.592</span> pessoas já estão usando.
          </strong>
        </div>

        <form>
          <input type="text" required placeholder="Qual nome do seu bolão?" />

          <button type="submit">Criar meu bolão</button>
        </form>

        <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div>
          <Image src="/assets/icon-check.svg" alt="Icone de check" width={40} height={40} quality={100} />
          <div>
            <span>+2.034</span>
            <span>Bolões criados</span>
          </div>
        </div>
        <div>
          <Image src="/assets/icon-check.svg" alt="Icone de check" width={40} height={40} quality={100} />
          <div>
            <span>+192.847</span>
            <span>Palpites enviados</span>
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
