import Footer from "./components/Footer";
import { Header } from "./components/Header";

<style>
    @import url('https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&display=swap');
</style>
import "./page.css"

export default function Home() {
    return (
        <main>
            <Header />
            <section className="tudo">

                <section className="tela1" id="inicio">
                    <section className="esquerdaTela1">

                        <section className="titulos1Tela1">
                            <b>Irrigação <span className="palavraAzul">eficiente</span></b>
                        </section>
                        <section className="titulos2Tela1">
                            <b>Colheita <span className="palavraAzul">garantida</span></b>
                        </section>

                        <a href="inicio" className="button">Acesse o site</a>

                    </section>
                    <section className="direitaTela1">
                        <section className="imagemLogo"><img src="../logoAqua.png" alt="" /></section>
                    </section>
                </section>





                <section className="tela2">
                    <section className="sombra">

                        <section className="quadrados" id="app">

                            <section className="quad1">
                                <section className="imgQuad"><img src="../temperatura.png" alt="" /></section>
                                <section className="textoQuad">
                                    <h1><b>Sensor de Temperatura</b></h1>
                                    <p>Monitore a temperatura ideal para sua cultura com sensores, prevenindo estresse hídrico e garantindo a saúde das plantas.</p>
                                </section>
                            </section>


                            <section className="quad2">
                                <section className="imgQuad"><img src="../umidade.png" alt="" /></section>
                                <section className="textoQuad">
                                    <h1><b>Sensor de Umidade</b></h1>
                                    <p>Ajuste a irrigação com exatidão. O sensor detecta a umidade do solo, garantindo que suas plantas recebam a quantidade exata de água, sem desperdício.</p>
                                </section>
                            </section>


                            <section className="quad3">
                                <section className="imgQuad"><img src="../economia.png" alt="" /></section>
                                <section className="textoQuad">
                                    <h1><b>Economia Circular</b></h1>
                                    <p>Reduza o descarte e reutilize recursos. Promovemos práticas que integram o uso eficiente da água e nutrientes, fechando o ciclo produtivo.</p>
                                </section>
                            </section>


                            <section className="quad4">
                                <section className="imgQuad"><img src="../plantOtimi.png" alt="" /></section>
                                <section className="textoQuad">
                                    <h1><b>Plantação Otimizada</b></h1>
                                    <p>Com dados precisos e monitoramento constante, transformamos sua plantação em um sistema de alta eficiência, aumentando a produtividade e a qualidade.</p>
                                </section>
                            </section>

                        </section>

                    </section>
                </section>








                <section className="app">

                    <section className="computador1">

                        <section className="frasePromo">
                            <h1 className="frasePt2"><span className="palavraAzul">Conecte</span> sua fazenda ao <span className="palavraAzul">Futuro</span></h1>
                        </section>

                        <section className="textoEPc1">
                            <section className="textoPc">
                                Sua produção merece a precisão do amanhã. Não perca mais água e produtividade com irrigações desnecessárias. Baixe o "AquaBalance" e assuma o controle total, monitorando as condições ideais do solo em tempo real e garantindo que cada gota contribua para o crescimento. Com a tecnologia que promove o uso inteligente dos recursos, você corta custos, cultiva sustentavelmente e eleva sua colheita a um novo patamar de excelência. Transforme seu dispositivo na central de comando da sua fazenda e colha o sucesso!
                            </section>
                            <section className="imagemPc1">
                                <img src="../pc1.png" alt="" />
                            </section>
                        </section>

                    </section>

                    <section className="caixona">
                        <section className="frasePromo2">
                            <h1 className="frasePt1">"Navegue, descubra e <span className="palavraAzul">aproveite ao máximo</span></h1>
                        </section>

                        <section className="grandePcs">

                            <section className="caixaFrasePc1">
                                <section className="imagemPc2">
                                    <img src="../pc2.png" alt="" />
                                </section>
                                <section className="textoPc2">
                                    <h1 className="frasePt1">Cadastre todas as propriedades que precisar, <span className="palavraAzul">de forma simples e rápida</span></h1>
                                </section>
                            </section>

                            <section className="caixaFrasePc2">
                                <section className="textoPc3">
                                    <h1 className="frasePt1">Seu plantio, suas regras: ajuste as prioridades <span className="palavraAzul">como quiser</span></h1>
                                </section>
                                <section className="imagemPc3">
                                    <img src="../pc3.png" alt="" />
                                </section>
                            </section>

                            <section className="caixaFrasePc3">
                                <section className="imagemPc4">
                                    <img src="../pc4.png" alt="" />
                                </section>
                                <section className="textoPc4">
                                    <h1 className="frasePt1">Com o nosso app, você tem controle total <span className="palavraAzul">sobre o seu plantio</span></h1>
                                </section>
                            </section>

                            <section className="caixaFrasePc3"> </section>

                        </section>

                    </section>

                </section>
               
                <main>
                    <Footer />
                </main>

            </section>
           
        </main>

    );
}